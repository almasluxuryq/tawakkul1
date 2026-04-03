'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'
import { PRODUCT } from '@/lib/cart/context'
import { Button } from '@/components/ui/button'

export function FinalCtaSection() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency
  }

  return (
    <section ref={ref} className="relative py-28 lg:py-40 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/photos/photo3.JPEG"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-5 text-white">
            {t.finalCta.heading}
          </h2>
          <p className="text-base text-white/40 mb-10">
            {t.finalCta.subtitle}
          </p>
          <a href="#order">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-12 py-6 text-sm font-medium transition-all duration-300"
            >
              {t.finalCta.cta} — {formatPrice(PRODUCT.priceKZT, t.common.price.kzt)}
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
