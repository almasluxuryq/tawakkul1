'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

export function ManifestoSection() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const cards = [
    {
      title: t.manifesto.cards.religion.title,
      description: t.manifesto.cards.religion.description,
    },
    {
      title: t.manifesto.cards.purpose.title,
      description: t.manifesto.cards.purpose.description,
    },
    {
      title: t.manifesto.cards.goal.title,
      description: t.manifesto.cards.goal.description,
    },
  ]

  return (
    <section id="manifesto" ref={ref} className="section-dark py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
            {t.manifesto.heading}
            <br />
            <span className="font-serif italic text-[#E8E4DF]">
              {t.manifesto.headingItalic}
            </span>
          </h2>
        </motion.div>

        {/* Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl space-y-5 mb-20"
        >
          <p className="text-base text-white/50 leading-relaxed">
            {t.manifesto.paragraph1}
          </p>
          <p className="text-base text-white/50 leading-relaxed">
            {t.manifesto.paragraph2}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 border border-white/10 rounded-lg"
            >
              <h3 className="text-lg font-medium mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
