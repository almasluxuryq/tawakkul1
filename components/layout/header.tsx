'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { useCart } from '@/lib/cart/context'
import { Language } from '@/lib/i18n/translations'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navLinks = [
  { href: '#product', key: 'product' as const },
  { href: '#gallery', key: 'gallery' as const },
  { href: '#manifesto', key: 'manifesto' as const },
  { href: '#order', key: 'order' as const },
]

const languages: { code: Language; label: string }[] = [
  { code: 'ru', label: 'РУС' },
  { code: 'kk', label: 'ҚАЗ' },
  { code: 'en', label: 'ENG' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useI18n()
  const { totalItems, setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-lg font-medium tracking-[0.15em] uppercase">
                TAWAKKUL
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  {t.nav[link.key]}
                </a>
              ))}
              <Link
                href="/track"
                className="text-sm text-white/50 hover:text-white transition-colors duration-300"
              >
                {t.nav.track}
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/50 hover:text-white hover:bg-transparent gap-1 px-2"
                  >
                    <span className="text-xs">
                      {languages.find((l) => l.code === language)?.label}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-black/95 backdrop-blur-md border-white/10"
                >
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`text-sm cursor-pointer ${
                        language === lang.code
                          ? 'text-white'
                          : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white/50 hover:text-white hover:bg-transparent"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white text-black text-xs font-medium flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white/50 hover:text-white hover:bg-transparent"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-black z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                  <span className="text-lg font-medium tracking-[0.15em] uppercase">
                    TAWAKKUL
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/50 hover:text-white hover:bg-transparent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex-1 flex flex-col gap-1 p-5">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.key}
                      href={link.href}
                      onClick={handleNavClick}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-lg text-white/60 hover:text-white py-3 transition-colors duration-300"
                    >
                      {t.nav[link.key]}
                    </motion.a>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <Link
                      href="/track"
                      onClick={handleNavClick}
                      className="text-lg text-white/60 hover:text-white py-3 transition-colors duration-300 block"
                    >
                      {t.nav.track}
                    </Link>
                  </motion.div>
                </nav>
                <div className="p-5 border-t border-white/10">
                  <a href="#order" onClick={handleNavClick}>
                    <Button className="w-full bg-white text-black hover:bg-white/90 transition-all duration-300">
                      {t.nav.order}
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
