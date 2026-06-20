'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { PRODUCTS, ProductId, Size, isProductId } from './products'

export type { Size, ProductId, Product } from './products'
export { PRODUCTS, PRODUCT_LIST, getProduct, getProductBySlug } from './products'

export interface CartItem {
  productId: ProductId
  size: Size
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (productId: ProductId, size: Size, quantity?: number) => void
  removeItem: (productId: ProductId, size: Size) => void
  updateQuantity: (productId: ProductId, size: Size, quantity: number) => void
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
    result.push({ productId, size: e.size as Size, quantity })
  }
  return result
}

const sameLine = (item: CartItem, productId: ProductId, size: Size) =>
  item.productId === productId && item.size === size

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

  const addItem = (productId: ProductId, size: Size, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => sameLine(item, productId, size))
      if (existing) {
        return prev.map((item) =>
          sameLine(item, productId, size)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { productId, size, quantity }]
    })
  }

  const removeItem = (productId: ProductId, size: Size) => {
    setItems((prev) => prev.filter((item) => !sameLine(item, productId, size)))
  }

  const updateQuantity = (productId: ProductId, size: Size, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        sameLine(item, productId, size) ? { ...item, quantity } : item
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
