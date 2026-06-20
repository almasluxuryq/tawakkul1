'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { StorefrontHero } from '@/components/sections/storefront-hero'
import { StorefrontProducts } from '@/components/sections/storefront-products'
import { ManifestoSection } from '@/components/sections/manifesto'
import { BrandPhilosophySection } from '@/components/sections/brand-philosophy'
import { CartDrawer } from '@/components/cart/cart-drawer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <StorefrontHero />
        <StorefrontProducts />
        <ManifestoSection />
        <BrandPhilosophySection />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
