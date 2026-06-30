'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Bell, Minus, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n/context'
import { useCart, COLOR_LABEL_RU } from '@/lib/cart/context'
import { Product, Size, Color, SHORTS_COLOR_IMAGE } from '@/lib/cart/products'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SizeChartModal } from '@/components/modals/size-chart-modal'
import { CountdownTimer } from '@/components/product/countdown-timer'

const TELEGRAM_CHANNEL = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || 'tawakkulbrand'
const NOTIFY_HREF = `https://t.me/${TELEGRAM_CHANNEL}`
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77009570233'
const TG_BOT = process.env.NEXT_PUBLIC_TELEGRAM_BOT || 'tawakkulgpt'

const COLOR_HEX: Record<Color, string> = {
  BLACK: '#111111',
  NAVY: '#1e2d50',
  GREY: '#5a6272',
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

export interface StoryBlock {
  label: string
  heading: string
  subtitle?: string
  description: string
  image: string
}

export interface ProductPageProps {
  product: Product
  tagline: string
  blocks: StoryBlock[]
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency
}

function StorySection({ block, index }: { block: StoryBlock; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const imageLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center py-12 lg:py-20"
    >
      <motion.div
        initial={{ opacity: 0, x: imageLeft ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden bg-neutral-900 ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ aspectRatio: '3/4' }}
      >
        <Image
          src={block.image}
          alt={block.heading}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`space-y-5 ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-neutral-400">
          {block.label}
        </span>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight">
          {block.heading}
        </h3>
        {block.subtitle && (
          <p className="text-base font-serif italic text-neutral-500">
            {block.subtitle}
          </p>
        )}
        <p className="text-base text-neutral-500 leading-relaxed max-w-md">
          {block.description}
        </p>
      </motion.div>
    </div>
  )
}

export function ProductPage({ product, tagline, blocks }: ProductPageProps) {
  const { t } = useI18n()
  const { addItem, setIsCartOpen } = useCart()
  const router = useRouter()

  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[1] ?? product.sizes[0])
  const [selectedColor, setSelectedColor] = useState<Color | null>(product.colors?.[0] ?? null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [showSizeChart, setShowSizeChart] = useState(false)

  // Swipe gesture state
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const isComingSoon = product.status === 'coming_soon'
  const isSoldOut = product.status === 'sold_out'
  const isPreorder = product.status === 'preorder'
  const isPreorderViaDm = isPreorder && !!product.colors
  const isPurchasable = product.status === 'available' || (isPreorder && !product.colors)

  const preorderMsg = `Хочу оформить предзаказ AWRAH SHORTS\nЦвет: ${selectedColor ?? ''}\nРазмер: ${selectedSize}`
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(preorderMsg)}`
  const tgHref = `https://t.me/${TG_BOT}`

  const galleryLength = product.gallery.length

  const handleSwipeStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleSwipeEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) setActiveImage((p) => (p + 1) % galleryLength)
      else setActiveImage((p) => (p - 1 + galleryLength) % galleryLength)
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  const handleSelectColor = (color: Color) => {
    setSelectedColor(color)
    const idx = product.gallery.indexOf(SHORTS_COLOR_IMAGE[color])
    if (idx >= 0) setActiveImage(idx)
  }

  const handleAddToCart = () => {
    addItem(product.id, selectedSize, quantity, selectedColor ?? undefined)
    setIsCartOpen(true)
  }

  const handleBuyNow = () => {
    addItem(product.id, selectedSize, quantity, selectedColor ?? undefined)
    router.push('/checkout')
  }

  const displayPrice = isPreorderViaDm && product.preorderPriceKZT
    ? product.preorderPriceKZT
    : product.priceKZT

  const sizeGuideText = !product.hasSizeChart
    ? selectedSize === 'M' ? t.shorts.sizeGuide.m
      : selectedSize === 'L' ? t.shorts.sizeGuide.l
      : selectedSize === 'XL' ? t.shorts.sizeGuide.xl
      : null
    : null

  return (
    <>
      <Header />
      <main className="pb-28 lg:pb-0">

        {/* ──────────── PRODUCT SECTION ──────────── */}
        <section className="pt-20 lg:pt-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.storefront.backToShop}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16">

              {/* ── GALLERY ── */}
              <div className="space-y-3">
                {/* Main image — swipeable */}
                <div
                  className="relative w-full overflow-hidden bg-[#0d0d0d] select-none"
                  style={{ aspectRatio: '3/4' }}
                  onTouchStart={handleSwipeStart}
                  onTouchEnd={handleSwipeEnd}
                >
                  {product.gallery.map((img, i) => (
                    <div
                      key={img}
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{ opacity: i === activeImage ? 1 : 0, pointerEvents: i === activeImage ? 'auto' : 'none' }}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        priority={i === 0}
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ))}

                  {/* Preorder badge */}
                  {isPreorder && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 text-[9px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5">
                        {t.status.preorder}
                      </span>
                    </div>
                  )}

                  {/* Navigation arrows (desktop only) */}
                  {galleryLength > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImage((p) => (p - 1 + galleryLength) % galleryLength)}
                        className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-black/40 hover:bg-black/70 text-white transition-all z-10"
                        aria-label="Previous"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      <button
                        onClick={() => setActiveImage((p) => (p + 1) % galleryLength)}
                        className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-black/40 hover:bg-black/70 text-white transition-all z-10"
                        aria-label="Next"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Dot indicators + thumbnails */}
                {galleryLength > 1 && (
                  <div className="flex items-center gap-4">
                    {/* Thumbnails */}
                    <div className="flex gap-2 flex-1">
                      {product.gallery.map((img, i) => (
                        <button
                          key={img}
                          onClick={() => setActiveImage(i)}
                          className={`relative flex-1 overflow-hidden bg-neutral-900 transition-all duration-300 ${
                            i === activeImage
                              ? 'ring-1 ring-white ring-offset-1 ring-offset-black'
                              : 'opacity-45 hover:opacity-70'
                          }`}
                          style={{ aspectRatio: '3/4' }}
                          aria-label={`${product.name} ${i + 1}`}
                        >
                          <Image src={img} alt="" fill className="object-contain" sizes="120px" />
                        </button>
                      ))}
                    </div>
                    {/* Dot indicators */}
                    <div className="flex gap-1.5 pr-1">
                      {product.gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`rounded-full transition-all duration-300 ${
                            i === activeImage ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'
                          }`}
                          aria-label={`Photo ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ── BUY BOX ── */}
              <div className="space-y-6 mt-8 lg:mt-0 lg:pt-2">

                {/* Title block */}
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/35 block mb-2">
                    {tagline}
                  </span>
                  <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                    {product.name}
                  </h1>
                </div>

                {/* ── COMING SOON ── */}
                {isComingSoon && (
                  <div className="space-y-6">
                    <div>
                      <span className="font-display text-3xl font-light tabular-nums">
                        {formatPrice(product.priceKZT, t.common.price.kzt)}
                      </span>
                      <p className="text-sm text-white/40 mt-1">
                        {formatPrice(product.priceUSD, t.common.price.usd)} · {formatPrice(product.priceRUB, t.common.price.rub)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs tracking-[0.2em] uppercase text-white/40 block mb-3">
                        {t.status.dropsIn} · {t.status.dropDate}
                      </span>
                      {product.preorderDate && (
                        <CountdownTimer date={product.preorderDate} labels={t.status.countdown} />
                      )}
                    </div>
                    <div className="border-t border-white/10 pt-6 space-y-4">
                      <p className="text-sm text-white/50">{t.status.notifyBody}</p>
                      <a
                        href={NOTIFY_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2.5 bg-white text-black hover:bg-white/90 py-4 text-sm font-medium uppercase tracking-[0.08em] transition-colors"
                      >
                        <Bell className="h-4 w-4" />
                        {t.status.notifyCta}
                      </a>
                    </div>
                  </div>
                )}

                {/* ── PREORDER VIA DM (AWRAH SHORTS) ── */}
                {isPreorderViaDm && (
                  <div className="space-y-7">

                    {/* Pricing */}
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/35">
                        {t.shorts.preorderPrice}
                      </p>
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-4xl font-light tabular-nums">
                          {formatPrice(product.preorderPriceKZT!, t.common.price.kzt)}
                        </span>
                        <span className="text-lg text-white/40 tabular-nums font-light">
                          {formatPrice(product.preorderPriceRUB!, t.common.price.rub)}
                        </span>
                      </div>
                      <p className="text-xs text-white/25 pt-0.5">
                        {t.shorts.regularPrice}: {formatPrice(product.priceKZT, t.common.price.kzt)} / {formatPrice(product.priceRUB, t.common.price.rub)} — {t.status.dropDate}
                      </p>
                    </div>

                    {/* Color picker */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-[0.15em] uppercase text-white/50">{t.shorts.color}</span>
                        {selectedColor && (
                          <span className="text-xs text-white/40">{selectedColor}</span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2.5">
                        {product.colors!.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`relative flex flex-col items-center gap-2 py-3.5 transition-all duration-200 ${
                              selectedColor === color
                                ? 'ring-1 ring-white bg-white/5'
                                : 'border border-white/10 hover:border-white/30'
                            }`}
                          >
                            <span
                              className="w-8 h-8 rounded-full border-2 border-white/10 flex-shrink-0"
                              style={{ backgroundColor: COLOR_HEX[color] }}
                            />
                            <span className={`text-[10px] font-medium tracking-[0.1em] uppercase transition-colors ${
                              selectedColor === color ? 'text-white' : 'text-white/40'
                            }`}>
                              {color}
                            </span>
                            {selectedColor === color && (
                              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size picker */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-[0.15em] uppercase text-white/50">{t.sizeChart.size}</span>
                        {sizeGuideText && (
                          <span className="text-[10px] text-white/35">{sizeGuideText}</span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2.5">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`h-14 text-sm font-medium tracking-wider transition-all duration-200 ${
                              selectedSize === size
                                ? 'bg-white text-black'
                                : 'border border-white/15 text-white/70 hover:border-white/40 hover:text-white'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Primary CTAs */}
                    <div className="space-y-2.5 pt-1">
                      <p className="text-xs text-white/40 text-center pb-1">{t.shorts.preorderDm.body}</p>

                      {/* WhatsApp — primary action */}
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-3 py-4 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-200 active:scale-[0.98]"
                        style={{ backgroundColor: '#25D366', color: '#fff' }}
                      >
                        <WhatsAppIcon className="h-5 w-5" />
                        {t.shorts.preorderDm.wa}
                      </a>

                      {/* Telegram */}
                      <a
                        href={tgHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-3 py-4 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-200 active:scale-[0.98]"
                        style={{ backgroundColor: '#229ED9', color: '#fff' }}
                      >
                        <TelegramIcon className="h-5 w-5" />
                        {t.shorts.preorderDm.tg}
                      </a>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 py-1">
                      <div className="h-px flex-1 bg-white/8" />
                      <span className="text-xs text-white/20 tracking-widest uppercase">или</span>
                      <div className="h-px flex-1 bg-white/8" />
                    </div>

                    {/* Notify CTA */}
                    <div className="space-y-2.5">
                      <div>
                        <p className="text-sm font-light text-white/80">{t.shorts.notifyDm.heading}</p>
                        <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{t.shorts.notifyDm.body}</p>
                      </div>
                      <a
                        href={NOTIFY_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 border border-white/12 text-white/45 hover:border-white/25 hover:text-white/70 py-3.5 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-200"
                      >
                        <Bell className="h-3.5 w-3.5" />
                        {t.shorts.notifyDm.cta}
                      </a>
                    </div>

                    {/* Specs strip */}
                    <div className="flex items-center gap-2 pt-2 pb-1 flex-wrap">
                      {[t.shorts.fabric, t.shorts.worldwide].map((s, i) => (
                        <span key={i} className="text-[10px] text-white/25 tracking-[0.08em]">
                          {s}{i < 1 && <span className="ml-2 text-white/15">·</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── STANDARD BUY ── */}
                {!isComingSoon && !isPreorderViaDm && (
                  <>
                    <div>
                      <span className="font-display text-3xl font-light tabular-nums">
                        {formatPrice(product.priceRUB, t.common.price.rub)}
                      </span>
                      <p className="text-sm text-white/40 mt-1">
                        {formatPrice(product.priceKZT, t.common.price.kzt)} · {formatPrice(product.priceUSD, t.common.price.usd)}
                      </p>
                    </div>

                    {product.colors && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs tracking-[0.15em] uppercase text-white/50">{t.shorts.color}</span>
                          {selectedColor && (
                            <span className="text-xs text-white/40">{COLOR_LABEL_RU[selectedColor]}</span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-2.5">
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => handleSelectColor(color)}
                              className={`relative flex flex-col items-center gap-2 py-3.5 transition-all duration-200 ${
                                selectedColor === color
                                  ? 'ring-1 ring-white bg-white/5'
                                  : 'border border-white/10 hover:border-white/30'
                              }`}
                            >
                              <span
                                className="w-8 h-8 rounded-full border-2 border-white/10"
                                style={{ backgroundColor: COLOR_HEX[color] }}
                              />
                              <span className={`text-[10px] font-medium tracking-[0.1em] uppercase ${
                                selectedColor === color ? 'text-white' : 'text-white/40'
                              }`}>
                                {COLOR_LABEL_RU[color]}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-[0.15em] uppercase text-white/50">{t.sizeChart.size}</span>
                        {product.hasSizeChart && (
                          <button
                            onClick={() => setShowSizeChart(true)}
                            className="text-xs text-white/35 underline underline-offset-4 hover:text-white transition-colors"
                          >
                            {t.quickOrder.sizeChart}
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`h-14 text-sm font-medium transition-all duration-200 ${
                              selectedSize === size
                                ? 'bg-white text-black'
                                : 'border border-white/15 text-white/70 hover:border-white/40 hover:text-white'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {isPurchasable && (
                      <div className="space-y-3">
                        <span className="text-xs tracking-[0.15em] uppercase text-white/50">{t.cart.quantity}</span>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            aria-label={t.cart.decreaseQty}
                            className="w-11 h-11 border border-white/15 flex items-center justify-center hover:border-white/40 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-lg tabular-nums">{quantity}</span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            aria-label={t.cart.increaseQty}
                            className="w-11 h-11 border border-white/15 flex items-center justify-center hover:border-white/40 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2.5 pt-1">
                      {isSoldOut ? (
                        <Button disabled className="w-full bg-white/8 text-white/35 py-6 text-sm cursor-not-allowed">
                          {t.status.soldOut}
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={handleBuyNow}
                            className="w-full bg-white text-black hover:bg-white/90 py-6 text-sm font-medium transition-colors"
                          >
                            {t.quickOrder.buyNow}
                          </Button>
                          <Button
                            onClick={handleAddToCart}
                            variant="outline"
                            className="w-full border-white/15 text-white hover:bg-white hover:text-black py-6 text-sm transition-colors"
                          >
                            {isPreorder ? t.status.preorderCta : t.quickOrder.addToCart}
                          </Button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ──────────── STORY BLOCKS ──────────── */}
        {blocks.length > 0 && (
          <section className="section-light mt-16 lg:mt-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {blocks.map((block, i) => (
                <StorySection key={`${block.label}-${i}`} block={block} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <CartDrawer />

      {/* ──────────── MOBILE STICKY BAR ──────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/8 safe-area-pb">
        {isPreorderViaDm ? (
          /* Two-button bar for preorder DM products */
          <div className="flex items-stretch gap-0">
            {/* Price + selection */}
            <div className="flex flex-col justify-center px-4 py-3 min-w-[110px]">
              <p className="text-base font-light tabular-nums leading-tight">
                {formatPrice(displayPrice, t.common.price.kzt)}
              </p>
              <p className="text-[10px] text-white/35 mt-0.5 tracking-wide">
                {selectedColor} · {selectedSize}
              </p>
            </div>
            {/* WA */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-white text-[11px] font-semibold uppercase tracking-[0.06em] active:opacity-80 transition-opacity"
              style={{ backgroundColor: '#25D366' }}
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>
            {/* TG */}
            <a
              href={tgHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-white text-[11px] font-semibold uppercase tracking-[0.06em] active:opacity-80 transition-opacity"
              style={{ backgroundColor: '#229ED9' }}
            >
              <TelegramIcon className="h-5 w-5" />
              Telegram
            </a>
          </div>
        ) : isComingSoon ? (
          <div className="flex items-center justify-between px-4 py-3 gap-4">
            <div>
              <p className="text-base font-light">{formatPrice(product.priceKZT, t.common.price.kzt)}</p>
              <p className="text-[10px] text-white/35">{t.status.comingSoon}</p>
            </div>
            <a
              href={NOTIFY_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 text-sm font-medium uppercase tracking-[0.06em] transition-colors"
            >
              <Bell className="h-4 w-4" />
              {t.status.notifyCta}
            </a>
          </div>
        ) : (
          <div className="flex items-center justify-between px-4 py-3 gap-4">
            <div>
              <p className="text-base font-light tabular-nums">{formatPrice(product.priceRUB, t.common.price.rub)}</p>
              <p className="text-[10px] text-white/35">{selectedSize} · {quantity} {t.cart.pieces}</p>
            </div>
            {isSoldOut ? (
              <Button disabled className="bg-white/8 text-white/35 px-8 cursor-not-allowed">
                {t.status.soldOut}
              </Button>
            ) : (
              <Button
                onClick={handleBuyNow}
                className="bg-white text-black hover:bg-white/90 px-8 font-medium"
              >
                {t.quickOrder.buyNow}
              </Button>
            )}
          </div>
        )}
      </div>

      {product.hasSizeChart && (
        <SizeChartModal open={showSizeChart} onOpenChange={setShowSizeChart} />
      )}
    </>
  )
}
