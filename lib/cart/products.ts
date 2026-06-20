export type Size = 'S' | 'M' | 'L' | 'XL'

export type ProductId = 'one-ummah-zip-hoodie' | 'awrah-shorts'

export type ProductStatus = 'available' | 'preorder' | 'coming_soon' | 'sold_out'

export type Color = 'BLACK' | 'NAVY' | 'GREY'

export interface Product {
  id: ProductId
  slug: string
  name: string
  subtitle: string
  priceKZT: number
  priceUSD: number
  priceRUB: number
  /** Discounted price shown when status is 'preorder' */
  preorderPriceKZT?: number
  preorderPriceRUB?: number
  sizes: Size[]
  colors?: Color[]
  status: ProductStatus
  preorderDate?: string
  thumb: string
  gallery: string[]
  hasSizeChart: boolean
}

export const PRODUCTS: Record<ProductId, Product> = {
  'one-ummah-zip-hoodie': {
    id: 'one-ummah-zip-hoodie',
    slug: 'one-ummah-zip-hoodie',
    name: 'ONE UMMAH ZIP HOODIE',
    subtitle: '',
    priceKZT: 23990,
    priceUSD: 49,
    priceRUB: 3990,
    sizes: ['S', 'M', 'L', 'XL'],
    status: 'available',
    thumb: '/photos/IMG_2515.JPEG',
    gallery: [
      '/photos/IMG_2515.JPEG',
      '/photos/photo_7_2026-06-07_15-25-24.jpg',
      '/photos/IMG_5516 (2).JPG',
      '/photos/IMG_5735 (2).JPEG',
    ],
    hasSizeChart: true,
  },
  'awrah-shorts': {
    id: 'awrah-shorts',
    slug: 'awrah-shorts',
    name: 'AWRAH SHORTS',
    subtitle: 'Предзаказ · 30 июня 2026',
    priceKZT: 14990,
    priceUSD: 31,
    priceRUB: 2490,
    preorderPriceKZT: 12000,
    preorderPriceRUB: 2000,
    sizes: ['M', 'L', 'XL'],
    colors: ['BLACK', 'NAVY', 'GREY'],
    status: 'preorder',
    preorderDate: '2026-06-30T00:00:00+05:00',
    thumb: '/photos/new2.jpg',
    gallery: ['/photos/new2.jpg', '/photos/awrah-black.jpg'],
    hasSizeChart: false,
  },
}

export const PRODUCT_LIST: Product[] = Object.values(PRODUCTS)

export function getProduct(id: ProductId): Product {
  return PRODUCTS[id]
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCT_LIST.find((p) => p.slug === slug)
}

export function isProductId(value: string): value is ProductId {
  return value in PRODUCTS
}
