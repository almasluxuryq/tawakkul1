'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Check, Loader2, Circle, Package, ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const STATUS_STEPS = ['RECEIVED', 'PAID', 'SHIPPED', 'TRANSIT', 'DELIVERED'] as const

interface OrderData {
  orderNumber: string
  date: string
  status: string
  trackingNumber: string | null
  items: Array<{ productName?: string; size: string; quantity: number }>
  address: string
}

const STATUS_COLORS: Record<string, string> = {
  RECEIVED: 'bg-yellow-500/20 text-yellow-400',
  PAID: 'bg-blue-500/20 text-blue-400',
  SHIPPED: 'bg-purple-500/20 text-purple-400',
  TRANSIT: 'bg-orange-500/20 text-orange-400',
  DELIVERED: 'bg-green-500/20 text-green-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
}

const STATUS_LABELS: Record<string, string> = {
  RECEIVED: 'Принят',
  PAID: 'Оплачен',
  SHIPPED: 'Отправлен',
  TRANSIT: 'В пути',
  DELIVERED: 'Доставлен',
  CANCELLED: 'Отменён',
}

export default function TrackOrderPage() {
  const { t } = useI18n()
  const [searchInput, setSearchInput] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [myOrders, setMyOrders] = useState<OrderData[]>([])
  const [loadingMyOrders, setLoadingMyOrders] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const fetchOrder = useCallback(async (orderNum: string): Promise<OrderData | null> => {
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderNum)}`)
      if (!res.ok) return null
      const data = await res.json()
      return {
        orderNumber: data.orderNumber,
        date: new Date(data.date).toLocaleDateString('ru-RU'),
        status: data.status,
        trackingNumber: data.trackingNumber,
        items: data.items,
        address: data.address,
      }
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    async function loadMyOrders() {
      const saved = JSON.parse(localStorage.getItem('myOrders') || '[]') as string[]
      if (saved.length === 0) {
        setLoadingMyOrders(false)
        return
      }

      const results = await Promise.all(saved.map(fetchOrder))
      setMyOrders(results.filter((o): o is OrderData => o !== null))
      setLoadingMyOrders(false)
    }
    loadMyOrders()
  }, [fetchOrder])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchInput.trim()) return

    setIsSearching(true)
    setNotFound(false)
    setSelectedOrder(null)

    const order = await fetchOrder(searchInput.trim())
    if (order) {
      setSelectedOrder(order)
      setExpandedOrder(null)
    } else {
      setNotFound(true)
    }

    setIsSearching(false)
  }

  const steps = [
    { key: 'received', label: t.track.status.received },
    { key: 'paid', label: t.track.status.paid },
    { key: 'shipped', label: t.track.status.shipped },
    { key: 'transit', label: t.track.status.transit },
    { key: 'delivered', label: t.track.status.delivered },
  ]

  function StatusTimeline({ order }: { order: OrderData }) {
    const currentStepIndex = STATUS_STEPS.indexOf(order.status as typeof STATUS_STEPS[number])

    return (
      <div className="relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex
          const isCurrent = index === currentStepIndex
          const isPending = index > currentStepIndex

          return (
            <div key={step.key} className="flex gap-4 pb-6 last:pb-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-white text-black'
                      : isCurrent
                        ? 'bg-white/20 text-white border-2 border-white'
                        : 'bg-white/5 text-white/30'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : isCurrent ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Circle className="h-3 w-3" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-0.5 flex-1 mt-2 ${
                      isCompleted ? 'bg-white' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
              <div className="pt-1">
                <p className={`font-medium ${isPending ? 'text-white/30' : 'text-white'}`}>
                  {step.label}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  function OrderDetails({ order }: { order: OrderData }) {
    return (
      <div className="space-y-6">
        <StatusTimeline order={order} />

        {order.trackingNumber && (
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-white/50 mb-1">{t.track.trackingNumber}</p>
            <p className="font-mono">{order.trackingNumber}</p>
          </div>
        )}

        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-white/50 mb-3">{t.success.details}</p>
          {order.items.map((item, index) => (
            <p key={index}>
              {item.productName ?? 'ONE UMMAH ZIP HOODIE'} — {t.cart.size}: {item.size}, {t.cart.quantity}: {item.quantity}
            </p>
          ))}
        </div>

        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-white/50 mb-1">{t.track.deliveryAddress}</p>
          <p>{order.address}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">TAWAKKUL</span>
            </Link>
            <h1 className="text-lg font-medium">{t.track.title}</h1>
            <div className="w-16" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Search */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSearch}
          className="mb-10"
        >
          <div className="flex gap-3">
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t.track.placeholder}
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 py-6"
            />
            <Button
              type="submit"
              disabled={isSearching}
              className="bg-white text-black hover:bg-white/90 px-6"
            >
              {isSearching ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </div>
        </motion.form>

        {notFound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Package className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">{t.track.notFound}</p>
          </motion.div>
        )}

        {/* Search result */}
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-white/50">{t.success.orderNumber}</p>
                <p className="text-xl font-mono tracking-wider mt-1">{selectedOrder.orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40">{selectedOrder.date}</p>
              </div>
            </div>
            <OrderDetails order={selectedOrder} />
          </motion.div>
        )}

        {/* My Orders */}
        {!selectedOrder && !notFound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-lg font-medium mb-6">{t.track.myOrders}</h2>

            {loadingMyOrders && (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 text-white/30 mx-auto animate-spin" />
              </div>
            )}

            {!loadingMyOrders && myOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/50">{t.track.noOrders}</p>
              </div>
            )}

            {!loadingMyOrders && myOrders.length > 0 && (
              <div className="space-y-3">
                {myOrders.map((order) => {
                  const isExpanded = expandedOrder === order.orderNumber
                  return (
                    <div
                      key={order.orderNumber}
                      className="border border-white/10 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.orderNumber)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
                      >
                        <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[order.status] || 'bg-white/10 text-white/50'}`}>
                          {STATUS_LABELS[order.status] || order.status}
                        </span>
                        <span className="font-mono text-sm truncate">{order.orderNumber}</span>
                        <span className="text-white/40 text-xs ml-auto flex-shrink-0">{order.date}</span>
                        <ChevronDown className={`h-4 w-4 text-white/30 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {isExpanded && (
                        <div className="border-t border-white/10 p-4 bg-white/[0.02]">
                          <OrderDetails order={order} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  )
}
