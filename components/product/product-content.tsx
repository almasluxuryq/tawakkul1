'use client'

import { useI18n } from '@/lib/i18n/context'
import { getProduct, ProductId } from '@/lib/cart/products'
import { ProductPage, StoryBlock } from './product-page'
import { TAWAKKUL_HOODIE_T } from '@/lib/i18n/tawakkul-hoodie'

export function ProductContent({ productId }: { productId: ProductId }) {
  const { t, language } = useI18n()
  const product = getProduct(productId)

  let tagline: string
  let blocks: StoryBlock[]

  if (productId === 'tawakkul-hoodie') {
    const tw = TAWAKKUL_HOODIE_T[language]
    tagline = tw.tagline
    blocks = tw.blocks
  } else if (productId === 'one-ummah-zip-hoodie') {
    tagline = t.quickOrder.label
    blocks = [
      {
        label: t.product.silhouette.label,
        heading: t.product.silhouette.heading,
        subtitle: t.product.silhouette.specs,
        description: t.product.silhouette.description,
        image: '/photos/photo1.jpg',
      },
      {
        label: t.product.message.label,
        heading: t.product.message.heading,
        subtitle: t.product.message.subtitle,
        description: t.product.message.description,
        image: '/photos/photo7.jpg',
      },
      {
        label: t.product.detail.label,
        heading: t.product.detail.heading,
        subtitle: t.product.detail.subtitle,
        description: t.product.detail.description,
        image: '/photos/photo8.JPG',
      },
      {
        label: t.fabric.specs.gsm,
        heading: t.fabric.heading,
        description: t.fabric.description,
        image: '/photos/photo10.PNG',
      },
    ]
  } else {
    tagline = t.shorts.tagline
    blocks = [
      {
        label: t.shorts.fit.label,
        heading: t.shorts.fit.heading,
        description: t.shorts.fit.description,
        image: '/photos/new2.jpg',
      },
      {
        label: t.shorts.movement.label,
        heading: t.shorts.movement.heading,
        description: t.shorts.movement.description,
        image: '/photos/awrah-black.jpg',
      },
    ]
  }

  return <ProductPage product={product} tagline={tagline} blocks={blocks} />
}
