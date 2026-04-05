import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/lib/i18n/context'
import { CartProvider } from '@/lib/cart/context'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://twkklbrand.com'),
  title: 'ONE UMMAH ZIP HOODIE | Tawakkul',
  description: 'One religion · One purpose · One goal. Premium streetwear hoodie from Tawakkul. Double Layer Air Cotton, 350 GSM. Limited Edition 2025.',
  keywords: ['tawakkul', 'one ummah', 'hoodie', 'streetwear', 'islamic fashion', 'premium hoodie'],
  authors: [{ name: 'Tawakkul' }],
  openGraph: {
    title: 'ONE UMMAH ZIP HOODIE | Tawakkul',
    description: 'One religion · One purpose · One goal. Premium streetwear hoodie from Tawakkul.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US', 'kk_KZ'],
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ONE UMMAH ZIP HOODIE by Tawakkul' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ONE UMMAH ZIP HOODIE | Tawakkul',
    description: 'One religion · One purpose · One goal. Premium streetwear hoodie from Tawakkul.',
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
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
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
