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
  /** Per-color list of sizes that are out of stock (cannot be selected / bought). */
  outOfStock?: Partial<Record<Color, Size[]>>
  status: ProductStatus
  preorderDate?: string
  thumb: string
  gallery: string[]
  hasSizeChart: boolean
}

// Порядок здесь = порядок на главной. Худи первым, шорты вторым.
export const PRODUCTS: Record<ProductId, Product> = {
  'one-ummah-zip-hoodie': {
    id: 'one-ummah-zip-hoodie',
    slug: 'one-ummah-zip-hoodie',
    name: 'ONE UMMAH ZIP HOODIE',
    subtitle: '',
    priceKZT: 23990,
    priceUSD: 54,
    priceRUB: 3990,
    sizes: ['S', 'M', 'L', 'XL'],
    status: 'available',
    thumb: '/photos/photo_7_2026-06-07_15-25-24.jpg',
    gallery: [
      '/photos/photo_7_2026-06-07_15-25-24.jpg',
      '/photos/IMG_2515.JPEG',
      '/photos/IMG_5516 (2).JPG',
      '/photos/IMG_5735 (2).JPEG',
    ],
    hasSizeChart: true,
  },
  'awrah-shorts': {
    id: 'awrah-shorts',
    slug: 'awrah-shorts',
    name: 'AWRAH SHORTS',
    subtitle: '',
    priceKZT: 12000,
    priceUSD: 26,
    priceRUB: 2000,
    sizes: ['M', 'L', 'XL'],
    colors: ['BLACK', 'NAVY', 'GREY'],
    // Чёрный и синий: размеры M и L распроданы (доступен только XL). Серый — все размеры.
    outOfStock: {
      BLACK: ['M', 'L'],
      NAVY: ['M', 'L'],
    },
    status: 'available',
    thumb: '/photos/IMG_2718.JPG',
    gallery: [
      '/photos/IMG_2718.JPG',
      '/photos/IMG_2725.JPG',
      '/photos/IMG_2727.JPG',
      '/photos/IMG_2726.JPG',
    ],
    hasSizeChart: true,
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

/** Per-color image for the shorts gallery — used to jump the gallery to the chosen color. */
export const SHORTS_COLOR_IMAGE: Record<Color, string> = {
  BLACK: '/photos/IMG_2727.JPG',
  NAVY: '/photos/IMG_2726.JPG',
  GREY: '/photos/IMG_2725.JPG',
}
