import { Request, Response, NextFunction } from 'express'
import { prisma } from '../../config/prisma'
import { AppError } from '../../middleware/errorHandler'

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true, email: true, name: true, role: true, createdAt: true,
        profile: true,
        orders: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { items: { include: { product: true } } },
        },
        wishlist: { include: { product: true } },
      },
    })
    if (!user) throw new AppError('User not found', 404)
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, phone } = req.body
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        name,
        profile: { update: { phone } },
      },
      select: { id: true, email: true, name: true, profile: true },
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
}