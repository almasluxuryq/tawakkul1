'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Check, Loader2, Circle, Package } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { PRODUCT } from '@/lib/cart/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const STATUS_STEPS = ['RECEIVED', 'PAID', 'SHIPPED', 'TRANSIT', 'DELIVERED'] as const

interface OrderData {
  orderNumber: string
  date: string
  status: string
  trackingNumber: string | null
  items: Array<{ size: string; quantity: number }>
  address: string
}

export default function TrackOrderPage() {
  const { t } = useI18n()
  const [orderNumber, setOrderNumber] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [order, setOrder] = useState<OrderData | null>(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim()) return

    setIsSearching(true)
    setNotFound(false)
    setOrder(null)

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderNumber.trim())}`)

      if (res.status === 404) {
        setNotFound(true)
      } else if (res.ok) {
        const data = await res.json()
        setOrder({
          orderNumber: data.orderNumber,
          date: new Date(data.date).toLocaleDateString('ru-RU'),
          status: data.status,
          trackingNumber: data.trackingNumber,
          items: data.items,
          address: data.address,
        })
      } else {
        setNotFound(true)
      }
    } catch {
      setNotFound(true)
    }

    setIsSearching(false)
  }

  const currentStepIndex = order ? STATUS_STEPS.indexOf(order.status as typeof STATUS_STEPS[number]) : -1

  const steps = [
    { key: 'received', label: t.track.status.received },
    { key: 'paid', label: t.track.status.paid },
    { key: 'shipped', label: t.track.status.shipped },
    { key: 'transit', label: t.track.status.transit },
    { key: 'delivered', label: t.track.status.delivered },
  ]

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
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSearch}
          className="mb-12"
        >
          <div className="flex gap-3">
            <Input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
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

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <p className="text-sm text-white/50">{t.success.orderNumber}</p>
                <p className="text-xl font-mono tracking-wider mt-1">
                  {order.orderNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/50">Дата</p>
                <p className="mt-1">{order.date}</p>
              </div>
            </div>

            <div className="relative">
              {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex
                const isCurrent = index === currentStepIndex
                const isPending = index > currentStepIndex

                return (
                  <div key={step.key} className="flex gap-4 pb-8 last:pb-0">
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
                      <p
                        className={`font-medium ${
                          isPending ? 'text-white/30' : 'text-white'
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

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
                  {PRODUCT.name} — {t.cart.size}: {item.size}, {t.cart.quantity}:{' '}
                  {item.quantity}
                </p>
              ))}
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-white/50 mb-1">
                {t.track.deliveryAddress}
              </p>
              <p>{order.address}</p>
            </div>

            <div className="text-center pt-4">
              <a
                href="https://wa.me/77009570233"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4"
              >
                {t.success.whatsapp}
              </a>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
