'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { PAGES_T } from '@/lib/i18n/pages'
import { Footer } from '@/components/layout/footer'

const WA = 'https://wa.me/77009570233'
const TG = 'https://t.me/tawakkulgpt'

export default function FaqPage() {
  const { language } = useI18n()
  const p = PAGES_T[language]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm tracking-[0.15em]">TAWAKKUL</span>
            </Link>
            <h1 className="text-lg font-medium">{p.faqLabel}</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="block text-xs tracking-[0.25em] uppercase text-white/40 mb-3">
            {p.faqLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-light">{p.faqHeading}</h2>
        </motion.div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {p.faqItems.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                >
                  <span className="text-base sm:text-lg text-white/90 group-hover:text-white transition-colors">
                    {item.q}
                  </span>
                  <Plus
                    className={`h-5 w-5 text-white/40 flex-shrink-0 mt-1 transition-transform duration-300 ${
                      isOpen ? 'rotate-45 text-white' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-8 text-sm sm:text-base text-white/55 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="text-white/60 mb-6">{p.contactCta}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              {p.writeWa}
            </a>
            <a
              href={TG}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              {p.writeTg}
            </a>
          </div>
          <div className="mt-10">
            <Link
              href="/about"
              className="text-sm text-white/40 hover:text-white transition-colors underline underline-offset-4"
            >
              {p.aboutHeading} →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
