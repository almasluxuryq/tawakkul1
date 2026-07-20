'use client'

import { useEffect } from 'react'
import { useI18n } from '@/lib/i18n/context'
import { HomeContent } from '@/components/home-content'

export default function KzPage() {
  const { setLanguage } = useI18n()
  useEffect(() => {
    setLanguage('kk')
    try { localStorage.setItem('tawakkul-region', 'kz') } catch { /* ignore */ }
  }, [setLanguage])
  return <HomeContent />
}
