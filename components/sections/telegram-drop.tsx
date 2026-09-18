'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'

// Ссылка на Telegram. Поменяйте на канал (например t.me/tawakkulbrand),
// если захотите вести подписку через канал, а не через @tawakkulgpt.
const TG_LINK = 'https://t.me/tawakkulgpt'

const DROP_T = {
  ru: {
    label: 'Дропы',
    heading: 'Следующий дроп — в Telegram',
    text: 'Наши коллекции лимитированы и раскупаются быстро. Подпишитесь на наш Telegram, чтобы узнать о старте продаж первым и получить доступ раньше остальных.',
    cta: 'Подписаться в Telegram',
    note: 'Без спама — только анонсы дропов и ранний доступ.',
  },
  kk: {
    label: 'Дроптар',
    heading: 'Келесі дроп — Telegram-да',
    text: 'Біздің коллекциялар шектеулі және тез сатылып кетеді. Сатылым басталғанын бірінші болып білу және басқалардан бұрын қол жеткізу үшін Telegram-ымызға жазылыңыз.',
    cta: 'Telegram-ға жазылу',
    note: 'Спамсыз — тек дроп анонстары мен ерте қолжетімділік.',
  },
  en: {
    label: 'Drops',
    heading: 'The next drop is on Telegram',
    text: 'Our collections are limited and sell out fast. Subscribe to our Telegram to be the first to know when a drop goes live and get early access before everyone else.',
    cta: 'Subscribe on Telegram',
    note: 'No spam — only drop announcements and early access.',
  },
} as const

export function TelegramDropSection() {
  const { language } = useI18n()
  const d = DROP_T[language]
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="section-dark py-20 lg:py-28 border-t border-white/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-white/40 mb-5">
            <span className="h-px w-8 bg-white/20" />
            {d.label}
            <span className="h-px w-8 bg-white/20" />
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight mb-5">
            {d.heading}
          </h2>
          <p className="text-base text-white/55 leading-relaxed max-w-xl mx-auto mb-8">
            {d.text}
          </p>
          <a
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            <Send className="h-4 w-4" />
            {d.cta}
          </a>
          <p className="text-xs text-white/30 mt-5">{d.note}</p>
        </motion.div>
      </div>
    </section>
  )
}
