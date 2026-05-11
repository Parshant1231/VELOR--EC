import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../types'

interface WishlistStore {
  items: Product[]
  toggle: (product: Product) => void
  has: (productId: string) => boolean
  count: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.find((i) => i.id === product.id)
        set((s) => ({
          items: exists
            ? s.items.filter((i) => i.id !== product.id)
            : [...s.items, product],
        }))
      },
      has: (productId) => !!get().items.find((i) => i.id === productId),
      count: () => get().items.length,
    }),
    { name: 'velore-wishlist' }
  )
)