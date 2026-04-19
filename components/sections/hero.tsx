'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Instagram, Send, ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const heroLinks = [
  {
    href: 'https://wa.me/77009570233',
    label: 'WhatsApp',
    Icon: WhatsAppIcon,
  },
  {
    href: 'https://t.me/tawakkulgpt',
    label: 'Telegram',
    Icon: Send,
  },
  {
    href: 'https://www.instagram.com/tawakkulTAWAKKUL/',
    label: 'Instagram',
    Icon: Instagram,
  },
]

export function HeroSection() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <Image
          src="/photos/photo12.JPG"
          alt="ONE UMMAH"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full px-5 max-w-[360px] mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative mx-auto mb-5 h-24 w-56 sm:h-28 sm:w-64"
        >
          <Image
            src="/logoo.PNG"
            alt="Tawakkul"
            fill
            priority
            className="object-contain"
            sizes="256px"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[10px] tracking-[0.3em] uppercase text-white/55 mb-3"
        >
          {t.hero.label}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base text-white/70 mb-7 leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Taplink-style messenger buttons */}
        <div className="flex flex-col gap-2">
          {heroLinks.map(({ href, label, Icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              className="group flex items-center gap-3 pl-3 pr-4 py-2.5 rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 group-hover:bg-black/10 transition-colors">
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1 text-left text-sm font-medium">
                {label}
              </span>
              <ArrowRight className="h-3.5 w-3.5 opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center gap-3 my-4"
        >
          <span className="h-px flex-1 bg-white/15" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/40">
            {t.hero.scroll}
          </span>
          <span className="h-px flex-1 bg-white/15" />
        </motion.div>

        {/* CTA — Смотреть и заказать */}
        <motion.a
          href="#order"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-lg shadow-black/30"
        >
          <span className="text-[13px] font-semibold tracking-[0.15em] uppercase">
            {t.hero.cta}
          </span>
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}
