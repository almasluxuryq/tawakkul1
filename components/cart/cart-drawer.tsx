'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { useCart, PRODUCT } from '@/lib/cart/context'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'

export function CartDrawer() {
  const { t } = useI18n()
  const router = useRouter()
  const isMobile = useIsMobile()
  const {
    items,
    updateQuantity,
    removeItem,
    totalItems,
    totalPriceKZT,
    totalPriceUSD,
    totalPriceRUB,
    isCartOpen,
    setIsCartOpen,
  } = useCart()

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    router.push('/checkout')
  }

  const handleContinueShopping = () => {
    setIsCartOpen(false)
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer/Sheet */}
          {isMobile ? (
            // Mobile: Bottom Sheet
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 z-50 max-h-[85vh] overflow-hidden flex flex-col rounded-t-2xl"
            >
              {/* Handle */}
              <div className="flex justify-center py-2">
                <div className="w-12 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <h2 className="text-lg font-medium">
                  {t.cart.title} ({totalItems})
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <ShoppingBag className="h-12 w-12 text-white/20 mb-4" />
                    <p className="text-white/50">{t.cart.empty}</p>
                    <p className="text-sm text-white/30 mt-1">
                      {t.cart.emptyDescription}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.size}
                        className="flex gap-4 p-3 bg-white/5 rounded-lg"
                      >
                        <div className="w-20 h-24 relative flex-shrink-0 overflow-hidden">
                          <Image
                            src="/photos/photo11.png"
                            alt={PRODUCT.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium truncate">
                            {PRODUCT.name}
                          </h3>
                          <p className="text-xs text-white/50 mt-1">
                            {t.cart.size}: {item.size}
                          </p>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.size, item.quantity - 1)
                              }
                              aria-label={t.cart.decreaseQty}
                              className="w-7 h-7 border border-white/20 flex items-center justify-center rounded hover:border-white/40"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.size, item.quantity + 1)
                              }
                              aria-label={t.cart.increaseQty}
                              className="w-7 h-7 border border-white/20 flex items-center justify-center rounded hover:border-white/40"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Price and remove */}
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeItem(item.size)}
                            className="text-white/30 hover:text-white/70"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <span className="text-sm">
                            {formatPrice(
                              item.quantity * PRODUCT.priceKZT,
                              t.common.price.kzt
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/70">{t.cart.subtotal}</span>
                    <div className="text-right">
                      <span className="text-lg font-medium">
                        {formatPrice(totalPriceKZT, t.common.price.kzt)}
                      </span>
                      <p className="text-xs text-white/40">
                        ({formatPrice(totalPriceUSD, t.common.price.usd)} /{' '}
                        {formatPrice(totalPriceRUB, t.common.price.rub)})
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-white text-black hover:bg-white/90 py-6"
                  >
                    {t.cart.checkout}
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            // Desktop: Side Drawer
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-black border-l border-white/10 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-medium">
                  {t.cart.title} ({totalItems})
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="h-16 w-16 text-white/20 mb-6" />
                    <p className="text-lg text-white/50">{t.cart.empty}</p>
                    <p className="text-sm text-white/30 mt-2">
                      {t.cart.emptyDescription}
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleContinueShopping}
                      className="mt-6 border-white/30 text-white hover:bg-white hover:text-black"
                    >
                      {t.cart.continueShopping}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div
                        key={item.size}
                        className="flex gap-4 p-4 bg-white/5 rounded-lg"
                      >
                        <div className="w-24 h-28 relative flex-shrink-0 overflow-hidden">
                          <Image
                            src="/photos/photo11.png"
                            alt={PRODUCT.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium">{PRODUCT.name}</h3>
                          <p className="text-sm text-white/50 mt-1">
                            {t.cart.size}: {item.size}
                          </p>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-3 mt-4">
                            <button
                              onClick={() =>
                                updateQuantity(item.size, item.quantity - 1)
                              }
                              aria-label={t.cart.decreaseQty}
                              className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.size, item.quantity + 1)
                              }
                              aria-label={t.cart.increaseQty}
                              className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Price and remove */}
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeItem(item.size)}
                            className="text-white/30 hover:text-white/70 transition-colors"
                            aria-label={t.cart.remove}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                          <span className="font-medium">
                            {formatPrice(
                              item.quantity * PRODUCT.priceKZT,
                              t.common.price.kzt
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg text-white/70">
                      {t.cart.subtotal}
                    </span>
                    <div className="text-right">
                      <span className="text-xl font-medium">
                        {formatPrice(totalPriceKZT, t.common.price.kzt)}
                      </span>
                      <p className="text-sm text-white/40">
                        ({formatPrice(totalPriceUSD, t.common.price.usd)} /{' '}
                        {formatPrice(totalPriceRUB, t.common.price.rub)})
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-white text-black hover:bg-white/90 py-6 text-base font-medium"
                  >
                    {t.cart.checkout}
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
