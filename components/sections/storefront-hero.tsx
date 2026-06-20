'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '77009570233'
const TG_BOT = process.env.NEXT_PUBLIC_TELEGRAM_BOT || 'tawakkulgpt'
const TG_CHANNEL = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || 'tawakkulbrand'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function MegaphoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 11l18-5v12L3 13M11.6 16.8a3 3 0 1 1-5.8-1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const CONTACT_LINKS = [
  {
    key: 'wa',
    Icon: WhatsAppIcon,
    label: 'WhatsApp',
    href: `https://wa.me/${WA_NUMBER}`,
    iconBg: '#25D366',
  },
  {
    key: 'tg',
    Icon: TelegramIcon,
    label: 'Telegram',
    href: `https://t.me/${TG_BOT}`,
    iconBg: '#229ED9',
  },
  {
    key: 'tgch',
    Icon: MegaphoneIcon,
    label: 'Telegram-канал',
    href: `https://t.me/${TG_CHANNEL}`,
    iconBg: '#229ED9',
  },
]

export function StorefrontHero() {
  const { t } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/photos/photo12.JPG"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative mx-auto mb-8 aspect-[2613/939] w-full max-w-[300px]"
        >
          <Image
            src="/logo-twkkl.png"
            alt="twkkl"
            fill
            priority
            className="object-contain"
            sizes="300px"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-xl sm:text-2xl font-semibold tracking-wide text-white leading-tight mb-2">
            {t.hero.label}
          </h1>
          <p className="text-[11px] tracking-[0.28em] uppercase text-white/55">
            {t.hero.subtitle}
          </p>
        </motion.div>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="space-y-2.5 mb-6"
        >
          {CONTACT_LINKS.map(({ key, Icon, label, href, iconBg }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/18 backdrop-blur-sm rounded-xl px-4 py-3.5 transition-all duration-300 group"
            >
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: iconBg }}
              >
                <Icon className="h-5 w-5 text-white" />
              </span>
              <span className="flex-1 text-left text-sm font-medium text-white">{label}</span>
              <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-white/70 transition-colors" />
            </a>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-4"
        >
          {t.hero.scroll}
        </motion.p>

        <motion.a
          href="#collection"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300"
        >
          <span className="text-[13px] font-semibold tracking-[0.15em] uppercase">
            {t.storefront.viewCollection}
          </span>
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  )
}
