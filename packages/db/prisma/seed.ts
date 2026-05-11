/// <reference types="node" />

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding VELORÉ database...')

  // Clean first
  await prisma.cartItem.deleteMany()
  await prisma.wishlistItem.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.user.deleteMany()

  // Products
  const products = await Promise.all([
    prisma.product.create({ data: {
      name: 'Signature Wool Coat', slug: 'signature-wool-coat',
      price: 1890, category: 'women', collection: 'Outerwear',
      description: 'Italian wool. Sculpted for presence.',
      images: [], sizes: ['XS','S','M','L','XL'],
      colors: [{ name: 'Ivory', hex: '#F5F0E8' }, { name: 'Black', hex: '#0A0A0A' }],
      stock: 12, featured: true,
    }}),
    prisma.product.create({ data: {
      name: 'Architect Leather Bag', slug: 'architect-leather-bag',
      price: 1290, category: 'accessories', collection: 'Leather',
      description: 'Structured. Refined. Enduring.',
      images: [], sizes: [],
      colors: [{ name: 'Black', hex: '#0A0A0A' }],
      stock: 8, featured: true,
    }}),
    prisma.product.create({ data: {
      name: 'Obsidian Tailored Coat', slug: 'obsidian-tailored-coat',
      price: 2890, category: 'men', collection: 'Atelier',
      description: 'A study in precision, balance, and form. Crafted for movement. Designed for presence.',
      images: [], sizes: ['S','M','L','XL'],
      colors: [
        { name: 'Obsidian Black', hex: '#1C1C1C' },
        { name: 'Charcoal', hex: '#36454F' },
        { name: 'Camel', hex: '#C19A6B' },
        { name: 'Pearl', hex: '#F0EEE9' },
      ],
      stock: 4, featured: true,
    }}),
    prisma.product.create({ data: {
      name: 'Asymmetric Drape Dress', slug: 'asymmetric-drape-dress',
      price: 1490, category: 'women', collection: 'Evening',
      description: 'Movement as design.',
      images: [], sizes: ['XS','S','M','L'],
      colors: [{ name: 'Midnight', hex: '#1a1a2e' }],
      stock: 6, featured: true,
    }}),
    prisma.product.create({ data: {
      name: 'Vegan Leather Tote', slug: 'vegan-leather-tote',
      price: 590, category: 'accessories', collection: 'Leather',
      description: 'Structured minimalism.',
      images: [], sizes: [],
      colors: [{ name: 'Black', hex: '#0A0A0A' }, { name: 'Ivory', hex: '#F5F0E8' }],
      stock: 18, featured: true,
    }}),
    prisma.product.create({ data: {
      name: 'Silk-Tailored Blazer', slug: 'silk-tailored-blazer',
      price: 890, category: 'women', collection: 'Essentials',
      description: 'Effortless authority.',
      images: [], sizes: ['XS','S','M','L'],
      colors: [{ name: 'Ivory', hex: '#F5F0E8' }],
      stock: 15, featured: true,
    }}),
    prisma.product.create({ data: {
      name: 'Sculpted Leather Boots', slug: 'sculpted-leather-boots',
      price: 1190, category: 'women', collection: 'Footwear',
      description: 'Precision at every step.',
      images: [], sizes: ['36','37','38','39','40','41'],
      colors: [{ name: 'Black', hex: '#0A0A0A' }],
      stock: 10, featured: false,
    }}),
    prisma.product.create({ data: {
      name: 'Cashmere Blend Polo', slug: 'cashmere-blend-polo',
      price: 620, category: 'men', collection: 'Essentials',
      description: 'Refined comfort.',
      images: [], sizes: ['S','M','L','XL','XXL'],
      colors: [{ name: 'Charcoal', hex: '#36454F' }, { name: 'Cream', hex: '#F5F0E8' }],
      stock: 20, featured: false,
    }}),
  ])

  console.log(`✅ Created ${products.length} products`)
  console.log('✅ Seed complete')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())