import { Request, Response, NextFunction } from 'express'
import * as productsService from './products.service'

export async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      category, collection, featured,
      minPrice, maxPrice, search,
      page, limit, sort,
    } = req.query

    const result = await productsService.getProducts({
      category:   category as string,
      collection: collection as string,
      featured:   featured === 'true' ? true : featured === 'false' ? false : undefined,
      minPrice:   minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice:   maxPrice ? parseFloat(maxPrice as string) : undefined,
      search:     search as string,
      page:       page   ? parseInt(page as string)  : 1,
      limit:      limit  ? parseInt(limit as string) : 20,
      sort:       sort as any,
    })

    res.json(result)
  } catch (err) {
    next(err)
  }
}

export async function getProductBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productsService.getProductBySlug(req.params.slug as string)
    res.json(product)
  } catch (err) {
    next(err)
  }
}

export async function getFeatured(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productsService.getFeaturedProducts()
    res.json(products)
  } catch (err) {
    next(err)
  }
}