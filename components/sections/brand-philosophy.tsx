'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

export function BrandPhilosophySection() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="section-darker py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1"
          >
            <Image
              src="/photos/photo6.JPG"
              alt="Tawakkul brand"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5 order-1 lg:order-2"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-white/40">
              {t.brand.label}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight">
              {t.brand.heading}
            </h2>
            <p className="text-base text-white/50 leading-relaxed max-w-md">
              {t.brand.description}
            </p>
            <div className="pt-6">
              <Image
                src="/photos/photo10.PNG"
                alt="Tawakkul embroidery"
                width={160}
                height={60}
                className="opacity-60"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
