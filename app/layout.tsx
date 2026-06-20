import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Cormorant } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/lib/i18n/context'
import { CartProvider } from '@/lib/cart/context'
import './globals.css'

// Body text — Cyrillic-capable (site is Russian-primary).
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

// Display / headings — Latin only (no Cyrillic glyphs), used for brand & product names.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

// Accent serif for the manifesto — Cormorant carries Cyrillic (Cormorant Garamond does not).
const cormorant = Cormorant({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://twkklbrand.com'),
  title: 'TAWAKKUL (TWKKL) — Исламский премиальный стритвир',
  description: 'Одна вера. Одна умма. Премиальная одежда с характером. ONE UMMAH ZIP HOODIE и AWRAH SHORTS. Доставка по Казахстану и России.',
  keywords: ['twkkl', 'tawakkul', 'one ummah', 'awrah shorts', 'hoodie', 'streetwear', 'islamic fashion', 'premium', 'исламский стритвир'],
  authors: [{ name: 'TAWAKKUL' }],
  openGraph: {
    title: 'TAWAKKUL (TWKKL) — Исламский премиальный стритвир',
    description: 'Одна вера. Одна умма. Без границ. ONE UMMAH ZIP HOODIE и AWRAH SHORTS.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['kk_KZ', 'en_US'],
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'TAWAKKUL' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAWAKKUL (TWKKL) — Исламский премиальный стритвир',
    description: 'Одна вера. Одна умма. Без границ. ONE UMMAH ZIP HOODIE и AWRAH SHORTS.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  // No maximumScale / userScalable:false — pinch-zoom must stay available (a11y).
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-black text-white">
        <I18nProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
