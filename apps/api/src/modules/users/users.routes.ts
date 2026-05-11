import { Router } from 'express'
import { authenticate } from '../../middleware/auth'
import * as controller from './users.controller'

const router = Router()

router.get('/',    authenticate, controller.getProfile)
router.patch('/',  authenticate, controller.updateProfile)

export default router