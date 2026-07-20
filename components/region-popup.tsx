'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { Language } from '@/lib/i18n/translations'

interface Region {
  label: string
  sub: string
  lang: Language
  path: string
  region: string
  flag: string
}

const REGIONS: Region[] = [
  { label: 'Kazakhstan', sub: 'Қазақстан', lang: 'kk', path: '/kz', region: 'kz', flag: '🇰🇿' },
  { label: 'Russia', sub: 'Россия', lang: 'ru', path: '/ru', region: 'ru', flag: '🇷🇺' },
  { label: 'Worldwide', sub: 'Other countries', lang: 'en', path: '/eng', region: 'world', flag: '🌍' },
]

const KEY = 'tawakkul-region'

export function RegionPopup() {
  const { setLanguage } = useI18n()
  const router = useRouter()
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true)
    } catch { /* ignore */ }
  }, [])

  const pick = (r: Region) => {
    try { localStorage.setItem(KEY, r.region) } catch { /* ignore */ }
    setLanguage(r.lang)
    setShow(false)
    router.push(r.path)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-5 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-2xl p-7 text-center"
          >
            <span className="relative block h-6 w-[70px] mx-auto mb-6">
              <Image src="/logo-twkkl.png" alt="twkkl" fill priority className="object-contain" sizes="70px" />
            </span>

            <h2 className="text-2xl font-semibold tracking-tight">Where are you from?</h2>
            <p className="text-sm text-white/40 mt-1.5 mb-7">Choose your region to continue</p>

            <div className="space-y-2.5">
              {REGIONS.map((r) => (
                <button
                  key={r.region}
                  onClick={() => pick(r)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all text-left active:scale-[0.99]"
                >
                  <span className="text-2xl leading-none">{r.flag}</span>
                  <span className="flex-1">
                    <span className="block text-base font-medium">{r.label}</span>
                    <span className="block text-xs text-white/40">{r.sub}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-white/30" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
