'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero'
import { ProductDetailsSection } from '@/components/sections/product-details'
import { FabricSection } from '@/components/sections/fabric'
import { GallerySection } from '@/components/sections/gallery'
import { PhotoGridSection } from '@/components/sections/photo-grid'
import { ManifestoSection } from '@/components/sections/manifesto'
import { BrandPhilosophySection } from '@/components/sections/brand-philosophy'
import { QuickOrderSection } from '@/components/sections/quick-order'
import { FinalCtaSection } from '@/components/sections/final-cta'
import { CartDrawer } from '@/components/cart/cart-drawer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProductDetailsSection />
        <FabricSection />
        <GallerySection />
        <PhotoGridSection />
        <ManifestoSection />
        <BrandPhilosophySection />
        <QuickOrderSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
