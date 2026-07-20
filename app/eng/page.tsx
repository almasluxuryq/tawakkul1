'use client'

import { useEffect } from 'react'
import { useI18n } from '@/lib/i18n/context'
import { HomeContent } from '@/components/home-content'

export default function EngPage() {
  const { setLanguage } = useI18n()
  useEffect(() => {
    setLanguage('en')
    try { localStorage.setItem('tawakkul-region', 'world') } catch { /* ignore */ }
  }, [setLanguage])
  return <HomeContent />
}
