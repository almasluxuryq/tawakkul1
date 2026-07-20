'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CreditCard, MessageCircle, ExternalLink, Send, Package, Copy, Check } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { PAY_T, colorLabel } from '@/lib/i18n/pay'
import { PRODUCTS, ProductId, Color } from '@/lib/cart/context'
import { Button } from '@/components/ui/button'

interface OrderData {
  orderNumber: string
  items: Array<{ productId: ProductId; size: string; quantity: number; color?: Color }>
  totalPriceKZT: number
  totalPriceUSD: number
  totalPriceRUB: number
  deliveryFeeKZT: number
  country: 'RU' | 'KZ' | 'WORLD'
  name: string
  phone: string
  city: string
  paymentMethod: string
}

const WA = '77009570233'
const TG = 'tawakkulgpt'
const KASPI_LINK = 'https://pay.kaspi.kz/pay/anpwu3nf'
const VTB_CARD = '2204 3602 0037 0326'
const KASPI_CARD = '4400 4302 4689 2928'
const CARD_HOLDER = 'ALMAS NURBEKULY'

const fmt = (price: number, currency: string) =>
  new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency

function CopyRow({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(value.replace(/\s/g, ''))
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="w-full flex items-center justify-between gap-2 bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/25 transition-colors"
    >
      <span className="text-xl sm:text-2xl font-mono tracking-wider">{value}</span>
      {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5 text-white/40" />}
    </button>
  )
}

export default function CheckoutSuccessPage() {
  const { t, language } = useI18n()
  const p = PAY_T[language]
  const [order, setOrder] = useState<OrderData | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('lastOrder')
    if (stored) setOrder(JSON.parse(stored))
  }, [])

  const country = order?.country ?? 'RU'
  const payAmount =
    country === 'KZ'
      ? fmt((order?.totalPriceKZT ?? 0) + (order?.deliveryFeeKZT ?? 0), t.common.price.kzt)
      : country === 'WORLD'
      ? fmt(order?.totalPriceUSD ?? 0, t.common.price.usd)
      : fmt(order?.totalPriceRUB ?? 0, t.common.price.rub)

  const waText = order ? `${p.orderNumber}: ${order.orderNumber}` : ''
  const waHref = `https://wa.me/${WA}?text=${encodeURIComponent(waText)}`
  const tgHref = `https://t.me/${TG}`

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full py-12"
      >
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/10 flex items-center justify-center">
          <CreditCard className="h-8 w-8 text-white" strokeWidth={1.5} />
        </div>

        <div className="text-center mb-7">
          <h1 className="text-2xl sm:text-3xl font-light mb-2">{p.orderPlaced}</h1>
          <p className="text-sm text-white/50">{p.orderPlacedSub}</p>
        </div>

        {order && (
          <div className="text-center mb-6">
            <p className="text-xs text-white/40 mb-1">{p.orderNumber}</p>
            <p className="text-lg font-mono tracking-wider">{order.orderNumber}</p>
          </div>
        )}

        {order && (
          <div className="bg-white/5 rounded-xl p-6 mb-5 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs px-2 py-0.5 rounded text-white" style={{ backgroundColor: country === 'RU' ? '#009FDF' : '#F14635' }}>
                {country === 'RU' ? 'ВТБ (МИР)' : 'Kaspi'}
              </span>
              <span className="text-base font-semibold">{payAmount}</span>
            </div>

            {country === 'KZ' && (
              <>
                <p className="text-sm text-white/60 mb-3">{p.payKzHint}</p>
                <a href={KASPI_LINK} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-white text-black hover:bg-white/90 py-6 text-base font-medium gap-2">
                    <ExternalLink className="h-5 w-5" /> {p.payKaspiBtn}
                  </Button>
                </a>
              </>
            )}

            {country === 'RU' && (
              <>
                <p className="text-sm text-white/60 mb-3">{p.payRuHint}</p>
                <CopyRow value={VTB_CARD} />
                <p className="text-sm text-white/70 mt-2">{CARD_HOLDER}</p>
              </>
            )}

            {country === 'WORLD' && (
              <>
                <p className="text-sm text-white/60 mb-3">{p.payWorldHint}</p>
                <CopyRow value={KASPI_CARD} />
                <p className="text-sm text-white/70 mt-2">{CARD_HOLDER}</p>
                <p className="text-xs text-white/40 mt-2">{p.worldDelivNote}</p>
              </>
            )}

            <div className="border-t border-white/10 mt-5 pt-5">
              <p className="text-sm text-white/50 mb-3">{p.sendCheck}</p>
              <div className="flex gap-3">
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full py-4 gap-2 text-white" style={{ backgroundColor: '#25D366' }}>
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </Button>
                </a>
                <a href={tgHref} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full py-4 gap-2 text-white" style={{ backgroundColor: '#229ED9' }}>
                    <Send className="h-4 w-4" /> Telegram
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}

        {order && (
          <div className="bg-white/5 rounded-lg p-5 mb-6 text-left">
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-4 w-4 text-white/40" />
              <h3 className="text-sm text-white/50">{p.orderComposition}</h3>
            </div>
            <div className="space-y-2 text-sm">
              {order.items.map((item, index) => {
                const product = PRODUCTS[item.productId]
                return (
                  <div key={index} className="flex justify-between gap-2">
                    <span className="text-white/70">
                      {product.name} ({item.size}{item.color ? `, ${colorLabel(language, item.color)}` : ''}) ×{item.quantity}
                    </span>
                    <span className="whitespace-nowrap">{fmt(item.quantity * product.priceRUB, t.common.price.rub)}</span>
                  </div>
                )
              })}
              <div className="border-t border-white/10 pt-2 flex justify-between font-medium">
                <span>{p.total}</span>
                <span>{payAmount}</span>
              </div>
            </div>
          </div>
        )}

        <Link href="/track" className="block mb-3">
          <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white hover:text-black py-5">
            {p.trackOrder}
          </Button>
        </Link>
        <div className="text-center">
          <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4">
            TAWAKKUL
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
