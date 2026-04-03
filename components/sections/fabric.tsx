'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

export function FabricSection() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="section-darker py-24 lg:py-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* GSM Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-baseline justify-center gap-3">
            <span className="text-8xl sm:text-9xl lg:text-[11rem] font-extralight tracking-tighter">
              350
            </span>
            <span className="text-xl lg:text-2xl text-white/40 tracking-wider">
              {t.fabric.specs.gsm}
            </span>
          </div>
        </motion.div>

        {/* Heading and Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-xl mx-auto mb-20"
        >
          <h2 className="text-2xl lg:text-3xl font-light mb-5">
            {t.fabric.heading}
          </h2>
          <p className="text-base text-white/50 leading-relaxed">
            {t.fabric.description}
          </p>
        </motion.div>

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-4 lg:gap-6"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/photos/photo4.PNG"
              alt="ONE UMMAH hoodie flat lay"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 40vw"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/photos/photo11.png"
              alt="ONE UMMAH hoodie product shot"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 40vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
