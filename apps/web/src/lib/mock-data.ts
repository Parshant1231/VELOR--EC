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