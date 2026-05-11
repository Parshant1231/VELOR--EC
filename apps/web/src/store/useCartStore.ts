import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../types'

interface CartItem {
  product: Product
  quantity: number
  size?: string
  color?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, size?: string, color?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export type { CartItem, CartStore }

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, color) => {
        const existing = get().items.find(
          (i) => i.product.id === product.id && i.size === size
        )
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.product.id === product.id && i.size === size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }))
        } else {
          set((s) => ({ items: [...s.items, { product, quantity: 1, size, color }] }))
        }
      },

      removeItem: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.product.id !== productId) })),

      updateQuantity: (productId, quantity) =>
        set((s) => ({
          items: quantity <= 0
            ? s.items.filter((i) => i.product.id !== productId)
            : s.items.map((i) => i.product.id === productId ? { ...i, quantity } : i),
        })),

      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'velore-cart' }
  )
)