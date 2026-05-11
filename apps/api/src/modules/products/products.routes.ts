import { Router } from 'express'
import * as controller from './products.controller'

const router = Router()

router.get('/',            controller.getProducts)
router.get('/featured',    controller.getFeatured)
router.get('/:slug',       controller.getProductBySlug)

export default router