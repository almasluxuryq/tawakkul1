'use client'

import { useEffect } from 'react'
import { useI18n } from '@/lib/i18n/context'
import { HomeContent } from '@/components/home-content'

export default function RuPage() {
  const { setLanguage } = useI18n()
  useEffect(() => {
    setLanguage('ru')
    try { localStorage.setItem('tawakkul-region', 'ru') } catch { /* ignore */ }
  }, [setLanguage])
  return <HomeContent />
}
