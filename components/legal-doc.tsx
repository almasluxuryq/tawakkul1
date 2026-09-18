'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { LEGAL_T } from '@/lib/i18n/legal'
import { Footer } from '@/components/layout/footer'

type DocKey = 'privacy' | 'terms' | 'delivery'

export function LegalDocPage({ docKey }: { docKey: DocKey }) {
  const { language } = useI18n()
  const l = LEGAL_T[language]
  const doc = l[docKey]

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
          <h1 className="text-3xl sm:text-4xl font-light">{doc.title}</h1>
          <p className="text-xs text-white/30 mt-3">{doc.updated}</p>
          <p className="text-base text-white/55 leading-relaxed mt-6 max-w-2xl">
            {doc.intro}
          </p>
        </motion.div>

        <div className="space-y-10">
          {doc.sections.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h2 className="text-lg font-medium mb-3">{section.heading}</h2>
              <div className="space-y-3">
                {section.paras.map((para, j) => (
                  <p key={j} className="text-sm sm:text-base text-white/55 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
