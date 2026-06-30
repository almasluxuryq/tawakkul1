'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { PRODUCTS, ProductId, Size, Color, isProductId } from './products'

export type { Size, ProductId, Product, Color } from './products'
export { PRODUCTS, PRODUCT_LIST, getProduct, getProductBySlug, SHORTS_COLOR_IMAGE } from './products'

export interface CartItem {
  productId: ProductId
  size: Size
  quantity: number
  color?: Color
}

interface CartContextType {
  items: CartItem[]
  addItem: (productId: ProductId, size: Size, quantity?: number, color?: Color) => void
  removeItem: (productId: ProductId, size: Size, color?: Color) => void
  updateQuantity: (productId: ProductId, size: Size, quantity: number, color?: Color) => void
  clearCart: () => void
  totalItems: number
  totalPriceKZT: number
  totalPriceUSD: number
  totalPriceRUB: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'tawakkul-cart'

const VALID_COLORS: Color[] = ['BLACK', 'NAVY', 'GREY']
const isColor = (v: unknown): v is Color => typeof v === 'string' && (VALID_COLORS as string[]).includes(v)

// Normalizes stored items, including the legacy single-product shape `{ id, size, quantity }`.
function normalizeStoredItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return []
  const result: CartItem[] = []
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue
    const e = entry as Record<string, unknown>
    const productId = (e.productId ?? e.id) as string | undefined
    if (typeof productId !== 'string' || !isProductId(productId)) continue
    if (typeof e.size !== 'string') continue
    const quantity = typeof e.quantity === 'number' && e.quantity > 0 ? e.quantity : 1
    const color = isColor(e.color) ? e.color : undefined
    result.push({ productId, size: e.size as Size, quantity, color })
  }
  return result
}

const sameLine = (item: CartItem, productId: ProductId, size: Size, color?: Color) =>
  item.productId === productId && item.size === size && item.color === color

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setItems(normalizeStoredItems(JSON.parse(stored)))
      } catch {
        // Invalid JSON, ignore
      }
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addItem = (productId: ProductId, size: Size, quantity = 1, color?: Color) => {
    setItems((prev) => {
      const existing = prev.find((item) => sameLine(item, productId, size, color))
      if (existing) {
        return prev.map((item) =>
          sameLine(item, productId, size, color)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { productId, size, quantity, color }]
    })
  }

  const removeItem = (productId: ProductId, size: Size, color?: Color) => {
    setItems((prev) => prev.filter((item) => !sameLine(item, productId, size, color)))
  }

  const updateQuantity = (productId: ProductId, size: Size, quantity: number, color?: Color) => {
    if (quantity <= 0) {
      removeItem(productId, size, color)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        sameLine(item, productId, size, color) ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const sumBy = (key: 'priceKZT' | 'priceUSD' | 'priceRUB') =>
    items.reduce((sum, item) => sum + item.quantity * PRODUCTS[item.productId][key], 0)
  const totalPriceKZT = sumBy('priceKZT')
  const totalPriceUSD = sumBy('priceUSD')
  const totalPriceRUB = sumBy('priceRUB')

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPriceKZT,
        totalPriceUSD,
        totalPriceRUB,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

/** Russian label for a color, e.g. for cart/checkout/order display. */
export const COLOR_LABEL_RU: Record<Color, string> = {
  BLACK: 'Чёрный',
  NAVY: 'Синий',
  GREY: 'Серый',
}
