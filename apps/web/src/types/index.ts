export interface Product {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  category: string
  collection?: string
  sizes: string[]
  colors: { name: string; hex: string }[]
  featured?: boolean
  description?: string
  stock?: number
}

export interface CartItem {
  product: Product
  quantity: number
  size?: string
  color?: string
}

export interface NavItem {
  label: string
  href: string
}