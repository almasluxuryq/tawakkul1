export type Size = 'S' | 'M' | 'L' | 'XL'

export type ProductId = 'tawakkul-hoodie' | 'one-ummah-zip-hoodie' | 'awrah-shorts'

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
  /** Old (regular) price shown crossed out next to the current price */
  compareAtKZT?: number
  compareAtUSD?: number
  compareAtRUB?: number
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

// Порядок здесь = порядок на главной:
// 1) HOODIE TAWAKKUL (новинка), 2) ONE UMMAH ZIP HOODIE, 3) AWRAH SHORTS.
export const PRODUCTS: Record<ProductId, Product> = {
  'tawakkul-hoodie': {
    id: 'tawakkul-hoodie',
    slug: 'tawakkul-hoodie',
    name: 'HOODIE TAWAKKUL',
    subtitle: '',
    // ПРЕДЗАКАЗ. Партия уже пошита, в пути. Старая цена — зачёркнута.
    priceKZT: 19990,
    priceUSD: 44.99,
    priceRUB: 3790,
    compareAtKZT: 21990,
    compareAtUSD: 49,
    compareAtRUB: 3990,
    sizes: ['S', 'M', 'L', 'XL'],
    status: 'preorder',
    thumb: '/photos/tawakkul/street-mosque.jpg',
    gallery: [
      '/photos/tawakkul/street-mosque.jpg',
      '/photos/tawakkul/day-night.jpg',
      '/photos/tawakkul/front.jpg',
      '/photos/tawakkul/print-snow.jpg',
      '/photos/tawakkul/blizzard.jpg',
      '/photos/tawakkul/chairlift.jpg',
      '/photos/tawakkul/elevator.jpg',
      '/photos/tawakkul/print-detail.jpg',
    ],
    // Отдельной таблицы мерок для этой модели пока нет — помогаем с размером в WA/TG.
    hasSizeChart: false,
  },
  'one-ummah-zip-hoodie': {
    id: 'one-ummah-zip-hoodie',
    slug: 'one-ummah-zip-hoodie',
    name: 'ONE UMMAH ZIP HOODIE',
    subtitle: '',
    // ПРЕДЗАКАЗ (партия 50 шт., пошив с 14.10.2026). Старая цена — зачёркнута.
    priceKZT: 19990,
    priceUSD: 44.99,
    priceRUB: 3790,
    compareAtKZT: 21990,
    compareAtUSD: 49,
    compareAtRUB: 3990,
    sizes: ['S', 'M', 'L', 'XL'],
    status: 'preorder',
    thumb: '/photos/IMG_4716.JPG',
    gallery: [
      '/photos/IMG_2515 (3).JPEG',
      '/photos/IMG_4716.JPG',
      '/photos/IMG_1827.JPG',
      '/photos/IMG_4719.JPG',
      '/photos/IMG_4717.JPG',
      '/photos/IMG_2527.JPG',
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
    // В наличии только: NAVY — XL, GREY — M. Всё остальное распродано.
    // Чёрный распродан полностью — стоит последним и показывается как «нет в наличии».
    colors: ['NAVY', 'GREY', 'BLACK'],
    outOfStock: {
      NAVY: ['M', 'L'],
      GREY: ['L', 'XL'],
      BLACK: ['M', 'L', 'XL'],
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
