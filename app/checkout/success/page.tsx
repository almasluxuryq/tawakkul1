'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CreditCard, MessageCircle, ExternalLink, Send, Package } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { PRODUCTS, ProductId } from '@/lib/cart/context'
import { Button } from '@/components/ui/button'

interface OrderData {
  orderNumber: string
  items: Array<{ productId: ProductId; size: string; quantity: number }>
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
        className="max-w-lg w-full py-12"
      >
        {/* Payment Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center"
        >
          <CreditCard className="h-10 w-10 text-white" strokeWidth={1.5} />
        </motion.div>

        {/* Payment Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-light mb-2">
            {t.success.paymentTitle}
          </h1>
          <p className="text-sm text-white/50">
            {t.success.paymentDescription}
          </p>
        </motion.div>

        {/* Order Number */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-center mb-6"
          >
            <p className="text-xs text-white/40 mb-1">{t.success.orderNumber}</p>
            <p className="text-lg font-mono tracking-wider">{order.orderNumber}</p>
          </motion.div>
        )}

        {/* Payment Block — main focus */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 rounded-xl p-6 mb-6 border border-white/20"
          >
            {order.paymentMethod === 'kaspi' ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 bg-[#F14635] text-white rounded">Kaspi</span>
                  <span className="text-sm text-white/50">
                    {formatPrice(order.totalPriceKZT, t.common.price.kzt)}
                  </span>
                </div>
                <a
                  href="https://pay.kaspi.kz/pay/anpwu3nf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-white text-black hover:bg-white/90 py-6 text-base font-medium gap-2">
                    <ExternalLink className="h-5 w-5" />
                    {t.success.payNow}
                  </Button>
                </a>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 bg-[#009FDF] text-white rounded">VTB</span>
                  <span className="text-sm text-white/50">
                    {formatPrice(order.totalPriceKZT, t.common.price.kzt)}
                  </span>
                </div>
                <p className="text-sm text-white/60 mb-3">{t.success.vtbTransfer}</p>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-2xl font-mono tracking-wider mb-2">2204 3601 0035 7829</p>
                  <p className="text-sm text-white/70">ALMAS NURBEKULY</p>
                </div>
              </>
            )}

            {/* Send receipt */}
            <div className="border-t border-white/10 mt-5 pt-5">
              <p className="text-sm text-white/50 mb-3">{t.success.sendReceipt}</p>
              <div className="flex gap-3">
                <a
                  href="https://t.me/tawakkulgpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 py-4 gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Telegram
                  </Button>
                </a>
                <a
                  href="https://wa.me/77009570233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 py-4 gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Order Details — secondary */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/5 rounded-lg p-5 mb-6 text-left"
          >
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-4 w-4 text-white/40" />
              <h3 className="text-sm text-white/50">{t.success.details}</h3>
            </div>
            <div className="space-y-2 text-sm">
              {order.items.map((item, index) => {
                const product = PRODUCTS[item.productId]
                return (
                <div key={index} className="flex justify-between">
                  <span className="text-white/70">
                    {product.name} ({item.size}) x{item.quantity}
                  </span>
                  <span>
                    {formatPrice(item.quantity * product.priceKZT, t.common.price.kzt)}
                  </span>
                </div>
                )
              })}
              <div className="border-t border-white/10 pt-2 flex justify-between font-medium">
                <span>{t.checkout.summary.total}</span>
                <span>{formatPrice(order.totalPriceKZT, t.common.price.kzt)}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Track order */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/track" className="block">
            <Button
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white hover:text-black py-5"
            >
              {t.success.trackOrder}
            </Button>
          </Link>
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Link
            href="/"
            className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4"
          >
            TAWAKKUL
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
