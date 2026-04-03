'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, MessageCircle } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { PRODUCT } from '@/lib/cart/context'
import { Button } from '@/components/ui/button'

interface OrderData {
  orderNumber: string
  items: Array<{ size: string; quantity: number }>
  totalPriceKZT: number
  name: string
  phone: string
  city: string
  paymentMethod: string
}

export default function CheckoutSuccessPage() {
  const { t } = useI18n()
  const [order, setOrder] = useState<OrderData | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('lastOrder')
    if (stored) {
      setOrder(JSON.parse(stored))
    }
  }, [])

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center py-12"
      >
        {/* Checkmark Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/10 flex items-center justify-center"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Check className="h-10 w-10 text-white" strokeWidth={2} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl sm:text-3xl font-light mb-4"
        >
          {t.success.title}
        </motion.h1>

        {/* Order Number */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-sm text-white/50 mb-1">{t.success.orderNumber}</p>
            <p className="text-xl font-mono tracking-wider">{order.orderNumber}</p>
          </motion.div>
        )}

        {/* Order Details */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/5 rounded-lg p-6 mb-8 text-left"
          >
            <h3 className="text-sm text-white/50 mb-4">{t.success.details}</h3>
            <div className="space-y-3 text-sm">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {PRODUCT.name} ({item.size}) x{item.quantity}
                  </span>
                  <span>
                    {formatPrice(
                      item.quantity * PRODUCT.priceKZT,
                      t.common.price.kzt
                    )}
                  </span>
                </div>
              ))}
              <div className="border-t border-white/10 pt-3 flex justify-between font-medium">
                <span>{t.checkout.summary.total}</span>
                <span>
                  {formatPrice(order.totalPriceKZT, t.common.price.kzt)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-4"
        >
          <Link href="/track" className="block">
            <Button
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white hover:text-black py-6"
            >
              {t.success.trackOrder}
            </Button>
          </Link>

          <a
            href="https://wa.me/77009570233"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="ghost"
              className="w-full text-white/70 hover:text-white hover:bg-white/10 py-6 gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              {t.success.whatsapp}
            </Button>
          </a>
        </motion.div>

        {/* Confirmation note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-xs text-white/40 mt-8"
        >
          {t.success.confirmation}
        </motion.p>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4"
          >
            twkkl
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
