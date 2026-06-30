'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { PRODUCT_LIST } from '@/lib/cart/products'

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency
}

export function StorefrontProducts() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="collection" className="section-dark py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-12 lg:mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-white/40">
            {t.storefront.collectionLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PRODUCT_LIST.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/product/${product.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                  <Image
                    src={product.thumb}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {product.status === 'coming_soon' && (
                    <span className="absolute top-4 left-4 bg-white text-black text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5">
                      {t.status.comingSoon}
                    </span>
                  )}
                  {product.status === 'preorder' && (
                    <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5">
                      {t.status.preorder}
                    </span>
                  )}
                  {product.status === 'sold_out' && (
                    <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white border border-white/30 text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5">
                      {t.status.soldOut}
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-4 pt-5">
                  <div>
                    <h2 className="font-display text-lg lg:text-xl font-medium tracking-tight">
                      {product.name}
                    </h2>
                    <p className="text-sm text-white/50 mt-1">
                      {product.status === 'coming_soon'
                        ? `${t.status.dropsIn} · ${t.status.dropDate}`
                        : formatPrice(product.priceRUB, t.common.price.rub)}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase text-white/40 group-hover:text-white transition-colors pt-1">
                    {product.status === 'coming_soon'
                      ? t.status.cardComingSoon
                      : t.storefront.viewProduct}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
