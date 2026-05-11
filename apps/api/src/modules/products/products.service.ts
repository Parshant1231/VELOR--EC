import { prisma } from '../../config/prisma'
import { AppError } from '../../middleware/errorHandler'

export interface ProductFilters {
  category?: string
  collection?: string
  featured?: boolean
  minPrice?: number
  maxPrice?: number
  search?: string
  page?: number
  limit?: number
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'featured'
}

export async function getProducts(filters: ProductFilters = {}) {
  const {
    category, collection, featured,
    minPrice, maxPrice, search,
    page = 1, limit = 20,
    sort = 'newest',
  } = filters

  const where: any = {}
  if (category)   where.category   = { equals: category, mode: 'insensitive' }
  if (collection) where.collection = { equals: collection, mode: 'insensitive' }
  if (featured !== undefined) where.featured = featured
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {}
    if (minPrice !== undefined) where.price.gte = minPrice
    if (maxPrice !== undefined) where.price.lte = maxPrice
  }
  if (search) {
    where.OR = [
      { name:        { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { collection:  { contains: search, mode: 'insensitive' } },
    ]
  }

  const orderBy: any =
    sort === 'price_asc'  ? { price: 'asc' } :
    sort === 'price_desc' ? { price: 'desc' } :
    sort === 'featured'   ? { featured: 'desc' } :
                            { createdAt: 'desc' }

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      skip:  (page - 1) * limit,
      take:  limit,
    }),
  ])

  return {
    products,
    meta: { total, page, limit, pages: Math.ceil(total / limit) },
  }
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) throw new AppError('Product not found', 404)
  return product
}

export async function getFeaturedProducts(limit = 8) {
  return prisma.product.findMany({
    where: { featured: true },
    take:  limit,
    orderBy: { createdAt: 'desc' },
  })
}