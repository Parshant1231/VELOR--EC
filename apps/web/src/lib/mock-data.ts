import { Product } from "../types"

export const ALL_PRODUCTS: Product[] = [
  {
    id: '1', name: 'Signature Wool Coat', slug: 'signature-wool-coat',
    price: 1890, images: ['/images/products/signature-wool-coat.png'], category: 'women', collection: 'Outerwear',
    sizes: ['XS','S','M','L','XL'], description: 'Italian wool. Sculpted for presence.',
    colors: [{ name: 'Ivory', hex: '#F5F0E8' }, { name: 'Black', hex: '#0A0A0A' }],
    featured: true, stock: 12,
  },
  {
    id: '2', name: 'Architect Leather Bag', slug: 'architect-leather-bag',
    price: 1290, images: ['/images/products/architect-leather-bag.png'], category: 'accessories', collection: 'Leather',
    sizes: [], description: 'Structured. Refined. Enduring.',
    colors: [{ name: 'Black', hex: '#0A0A0A' }, { name: 'Tan', hex: '#8B6914' }],
    featured: true, stock: 8,
  },
  {
    id: '3', name: 'Asymmetric Drape Dress', slug: 'asymmetric-drape-dress',
    price: 1490, images: ['/images/products/asymmetric-drape-dress.png'], category: 'women', collection: 'Evening',
    sizes: ['XS','S','M','L'], description: 'Movement as design.',
    colors: [{ name: 'Midnight', hex: '#1a1a2e' }],
    featured: true, stock: 6,
  },
  {
    id: '4', name: 'Sculpted Leather Boots', slug: 'sculpted-leather-boots',
    price: 1190, images: ['/images/products/sculpted-leather-boots.png'], category: 'women', collection: 'Footwear',
    sizes: ['36','37','38','39','40','41'], description: 'Precision at every step.',
    colors: [{ name: 'Black', hex: '#0A0A0A' }],
    featured: false, stock: 10,
  },
  {
    id: '5', name: 'Obsidian Tailored Coat', slug: 'obsidian-tailored-coat',
    price: 2890, images: ['/images/products/obsidian-tailored-coat.png'], category: 'men', collection: 'Atelier',
    sizes: ['S','M','L','XL'], description: 'A study in precision, balance, and form. Crafted for movement. Designed for presence.',
    colors: [
      { name: 'Obsidian Black', hex: '#1C1C1C' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Pearl', hex: '#F0EEE9' },
    ],
    featured: true, stock: 4,
  },
  {
    id: '6', name: 'Silk-Tailored Blazer', slug: 'silk-tailored-blazer',
    price: 890, images: ['/images/products/silk-tailored-blazer.png'], category: 'women', collection: 'Essentials',
    sizes: ['XS','S','M','L'], description: 'Effortless authority.',
    colors: [{ name: 'Ivory', hex: '#F5F0E8' }, { name: 'Black', hex: '#0A0A0A' }],
    featured: true, stock: 15,
  },
  {
    id: '7', name: 'Cashmere Blend Polo', slug: 'cashmere-blend-polo',
    price: 620, images: ['/images/products/cashmere-blend-polo.png'], category: 'men', collection: 'Essentials',
    sizes: ['S','M','L','XL','XXL'], description: 'Refined comfort.',
    colors: [{ name: 'Charcoal', hex: '#36454F' }, { name: 'Cream', hex: '#F5F0E8' }],
    featured: false, stock: 20,
  },
  {
    id: '8', name: 'Vegan Leather Tote', slug: 'vegan-leather-tote',
    price: 590, images: ['/images/products/vegan-leather-tote.png'], category: 'accessories', collection: 'Leather',
    sizes: [], description: 'Structured minimalism.',
    colors: [{ name: 'Black', hex: '#0A0A0A' }, { name: 'Ivory', hex: '#F5F0E8' }],
    featured: true, stock: 18,
  },
  {
    id: '9', name: 'Wool Overcoat', slug: 'wool-overcoat',
    price: 1250, images: ['/images/products/wool-overcoat.png'], category: 'men', collection: 'Outerwear',
    sizes: ['S','M','L','XL'], description: 'Timeless precision in tailored form.',
    colors: [{ name: 'Midnight', hex: '#1a1a2e' }, { name: 'Charcoal', hex: '#36454F' }],
    featured: true, stock: 7,
  },
]

export const CATEGORIES = ['All', 'Women', 'Men', 'Accessories', 'Footwear']
export const COLLECTIONS = ['Outerwear', 'Atelier', 'Essentials', 'Leather', 'Evening', 'Footwear', 'Future Classics']
export interface Order {
  id:           string
  orderNumber:  string
  status:       'CONFIRMED' | 'PROCESSED' | 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED'
  total:        number
  createdAt:    string
  estimatedDelivery: string
  items: {
    name:     string
    variant:  string
    price:    number
    quantity: number
    image?:   string
  }[]
  tracking: {
    label: string
    date:  string
    done:  boolean
  }[]
}

export const MOCK_ORDERS: Order[] = [
  {
    id:          'ord_1',
    orderNumber: 'VL92301',
    status:      'IN_TRANSIT',
    total:       2450,
    createdAt:   'May 18, 2025',
    estimatedDelivery: 'May 25, 2025',
    items: [
      { name: 'Lumière Carryall', variant: 'Black / One Size', price: 2450, quantity: 1 },
    ],
    tracking: [
      { label: 'Confirmed',  date: 'May 18', done: true  },
      { label: 'Processed',  date: 'May 19', done: true  },
      { label: 'Shipped',    date: 'May 20', done: true  },
      { label: 'In Transit', date: 'May 23', done: true  },
      { label: 'Delivered',  date: '—',      done: false },
    ],
  },
  {
    id:          'ord_2',
    orderNumber: 'VL88120',
    status:      'DELIVERED',
    total:       3670,
    createdAt:   'Apr 10, 2025',
    estimatedDelivery: 'Apr 16, 2025',
    items: [
      { name: 'Lune Blazer',       variant: 'Pearl White / XS', price: 1290, quantity: 1 },
      { name: 'Noiré Leather Bag', variant: 'Obsidian Black',   price: 890,  quantity: 1 },
      { name: 'Éclat Silk Dress',  variant: 'Midnight / S',     price: 1490, quantity: 1 },
    ],
    tracking: [
      { label: 'Confirmed',  date: 'Apr 10', done: true },
      { label: 'Processed',  date: 'Apr 11', done: true },
      { label: 'Shipped',    date: 'Apr 12', done: true },
      { label: 'In Transit', date: 'Apr 13', done: true },
      { label: 'Delivered',  date: 'Apr 16', done: true },
    ],
  },
  {
    id:          'ord_3',
    orderNumber: 'VL74503',
    status:      'DELIVERED',
    total:       1190,
    createdAt:   'Mar 2, 2025',
    estimatedDelivery: 'Mar 8, 2025',
    items: [
      { name: 'Sculpted Leather Boots', variant: 'Black / 39', price: 1190, quantity: 1 },
    ],
    tracking: [
      { label: 'Confirmed',  date: 'Mar 2', done: true },
      { label: 'Processed',  date: 'Mar 3', done: true },
      { label: 'Shipped',    date: 'Mar 4', done: true },
      { label: 'In Transit', date: 'Mar 5', done: true },
      { label: 'Delivered',  date: 'Mar 8', done: true },
    ],
  },
]

export const MOCK_COLLECTIONS = [
  { id: '1', label: 'Paris Edit',        count: 12 },
  { id: '2', label: 'Winter Essentials', count: 8  },
  { id: '3', label: 'Signature Bags',    count: 6  },
  { id: '4', label: 'Evening Elegance',  count: 9  },
]

export const MOCK_INSIGHTS = [
  { icon: 'arrivals', label: 'New arrivals match your style', count: 12 },
  { icon: 'wishlist', label: 'Items in your wishlist',        count: 6  },
  { icon: 'style',    label: 'Style recommendations',        sub: 'Updated daily' },
]