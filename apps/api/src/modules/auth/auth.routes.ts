import { Router } from 'express'
import { z } from 'zod'
import { validate } from '../../middleware/validate'
import { authenticate } from '../../middleware/auth'
import * as controller from './auth.controller'

const router = Router()

const registerSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name:     z.string().min(1).max(80).optional(),
})

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
})

router.post('/register', validate(registerSchema), controller.register)
router.post('/login',    validate(loginSchema),    controller.login)
router.get('/me',        authenticate,             controller.me)

export default router