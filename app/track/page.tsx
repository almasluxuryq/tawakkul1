'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Check, Loader2, Circle, Package } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { PRODUCT } from '@/lib/cart/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface OrderStatus {
  orderNumber: string
  date: string
  currentStep: number
  trackingNumber: string
  items: Array<{ size: string; quantity: number }>
  address: string
}

// Mock data for demonstration
const mockOrders: Record<string, OrderStatus> = {
  'OU-20250401-DEMO': {
    orderNumber: 'OU-20250401-DEMO',
    date: '01.04.2025',
    currentStep: 2,
    trackingNumber: 'CDEK-123456789',
    items: [{ size: 'M', quantity: 1 }],
    address: 'г. Алматы, ул. ****** д. ** кв. **',
  },
}

export default function TrackOrderPage() {
  const { t } = useI18n()
  const [orderNumber, setOrderNumber] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [order, setOrder] = useState<OrderStatus | null>(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim()) return

    setIsSearching(true)
    setNotFound(false)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundOrder = mockOrders[orderNumber.toUpperCase()]
    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      setOrder(null)
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">twkkl</span>
            </Link>
            <h1 className="text-lg font-medium">{t.track.title}</h1>
            <div className="w-16" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Search Form */}
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
          <p className="text-xs text-white/40 mt-3">
            Demo: OU-20250401-DEMO
          </p>
        </motion.form>

        {/* Not Found */}
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

        {/* Order Result */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Order Header */}
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

            {/* Status Timeline */}
            <div className="relative">
              {steps.map((step, index) => {
                const isCompleted = index < order.currentStep
                const isCurrent = index === order.currentStep
                const isPending = index > order.currentStep

                return (
                  <div key={step.key} className="flex gap-4 pb-8 last:pb-0">
                    {/* Line and Icon */}
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

                    {/* Content */}
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

            {/* Tracking Number */}
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-white/50 mb-1">{t.track.trackingNumber}</p>
              <p className="font-mono">{order.trackingNumber}</p>
            </div>

            {/* Order Items */}
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-white/50 mb-3">{t.success.details}</p>
              {order.items.map((item, index) => (
                <p key={index}>
                  {PRODUCT.name} — {t.cart.size}: {item.size}, {t.cart.quantity}:{' '}
                  {item.quantity}
                </p>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-white/50 mb-1">
                {t.track.deliveryAddress}
              </p>
              <p>{order.address}</p>
            </div>

            {/* WhatsApp Contact */}
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
