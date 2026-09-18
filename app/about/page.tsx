'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { PAGES_T } from '@/lib/i18n/pages'
import { Footer } from '@/components/layout/footer'

const WA = 'https://wa.me/77009570233'
const TG = 'https://t.me/tawakkulgpt'

export default function AboutPage() {
  const { language } = useI18n()
  const p = PAGES_T[language]

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm tracking-[0.15em]">TAWAKKUL</span>
            </Link>
            <h1 className="text-lg font-medium">{p.aboutLabel}</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative">
          <div className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
            <Image
              src="/photos/IMG_2527.JPG"
              alt="TAWAKKUL"
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pb-10">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="block text-xs tracking-[0.25em] uppercase text-white/50 mb-3"
                >
                  {p.aboutLabel}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight max-w-2xl"
                >
                  {p.aboutHeading}
                </motion.h2>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 lg:py-24 space-y-6">
          {[p.aboutP1, p.aboutP2, p.aboutP3].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-base sm:text-lg text-white/60 leading-relaxed"
            >
              {para}
            </motion.p>
          ))}
        </section>

        {/* Values */}
        <section className="section-darker py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <span className="block text-xs tracking-[0.25em] uppercase text-white/40 mb-10 text-center">
              {p.aboutValuesLabel}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
              {p.values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-black p-8 lg:p-10"
                >
                  <span className="text-white/20 text-sm font-mono">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl font-light mt-4 mb-2">{v.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{v.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 lg:py-24 text-center">
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
              href="/faq"
              className="text-sm text-white/40 hover:text-white transition-colors underline underline-offset-4"
            >
              {p.faqHeading} →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
