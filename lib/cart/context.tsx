'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Size = 'S' | 'M' | 'L' | 'XL'

export interface CartItem {
  id: string
  size: Size
  quantity: number
}

export interface Product {
  id: string
  name: string
  priceKZT: number
  priceUSD: number
  priceRUB: number
}

export const PRODUCT: Product = {
  id: 'one-ummah-zip-hoodie',
  name: 'ONE UMMAH ZIP HOODIE',
  priceKZT: 23990,
  priceUSD: 49,
  priceRUB: 3990,
}

interface CartContextType {
  items: CartItem[]
  addItem: (size: Size, quantity?: number) => void
  removeItem: (size: Size) => void
  updateQuantity: (size: Size, quantity: number) => void
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setItems(JSON.parse(stored))
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

  const addItem = (size: Size, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.size === size)
      if (existing) {
        return prev.map((item) =>
          item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { id: PRODUCT.id, size, quantity }]
    })
  }

  const removeItem = (size: Size) => {
    setItems((prev) => prev.filter((item) => item.size !== size))
  }

  const updateQuantity = (size: Size, quantity: number) => {
    if (quantity <= 0) {
      removeItem(size)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.size === size ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPriceKZT = items.reduce(
    (sum, item) => sum + item.quantity * PRODUCT.priceKZT,
    0
  )
  const totalPriceUSD = items.reduce(
    (sum, item) => sum + item.quantity * PRODUCT.priceUSD,
    0
  )
  const totalPriceRUB = items.reduce(
    (sum, item) => sum + item.quantity * PRODUCT.priceRUB,
    0
  )

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
