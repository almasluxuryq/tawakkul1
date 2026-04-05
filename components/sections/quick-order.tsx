'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n/context'
import { useCart, Size, PRODUCT } from '@/lib/cart/context'
import { Button } from '@/components/ui/button'
import { SizeChartModal } from '@/components/modals/size-chart-modal'

const sizes: Size[] = ['S', 'M', 'L', 'XL']

export function QuickOrderSection() {
  const { t } = useI18n()
  const { addItem, setIsCartOpen } = useCart()
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const [selectedSize, setSelectedSize] = useState<Size>('M')
  const [quantity, setQuantity] = useState(1)
  const [showSizeChart, setShowSizeChart] = useState(false)

  const handleAddToCart = () => {
    addItem(selectedSize, quantity)
    setIsCartOpen(true)
  }

  const handleBuyNow = () => {
    addItem(selectedSize, quantity)
    router.push('/checkout')
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency
  }

  return (
    <>
      <section id="order" ref={ref} className="section-dark py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/photos/photo11.png"
                  alt="ONE UMMAH ZIP HOODIE"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Order Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-white/40 block mb-3">
                  {t.quickOrder.label}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">
                  {t.quickOrder.heading}
                </h2>
              </div>

              {/* Price */}
              <div>
                <span className="text-3xl lg:text-4xl font-light">
                  {formatPrice(PRODUCT.priceKZT, t.common.price.kzt)}
                </span>
                <p className="text-sm text-white/40 mt-1">
                  ({formatPrice(PRODUCT.priceUSD, t.common.price.usd)} /{' '}
                  {formatPrice(PRODUCT.priceRUB, t.common.price.rub)})
                </p>
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">
                    {t.sizeChart.size}
                  </span>
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="text-xs text-white/40 underline underline-offset-4 hover:text-white transition-colors duration-300"
                  >
                    {t.quickOrder.sizeChart}
                  </button>
                </div>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 text-sm font-medium transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-white text-black'
                          : 'border border-white/20 text-white hover:border-white/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <span className="text-sm text-white/60">{t.cart.quantity}</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label={t.cart.decreaseQty}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors duration-300"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label={t.cart.increaseQty}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors duration-300"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-white text-black hover:bg-white/90 py-6 text-sm font-medium transition-all duration-300"
                >
                  {t.quickOrder.addToCart}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white hover:text-black py-6 text-sm transition-all duration-300"
                >
                  {t.quickOrder.buyNow}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 p-4 z-40 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-light">
              {formatPrice(PRODUCT.priceKZT, t.common.price.kzt)}
            </p>
            <p className="text-xs text-white/40">
              {selectedSize} · {quantity} {t.cart.pieces}
            </p>
          </div>
          <Button
            onClick={handleAddToCart}
            className="bg-white text-black hover:bg-white/90 px-8"
          >
            {t.quickOrder.addToCart}
          </Button>
        </div>
      </div>

      <SizeChartModal open={showSizeChart} onOpenChange={setShowSizeChart} />
    </>
  )
}
