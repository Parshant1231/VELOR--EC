import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../../config/prisma'
import { env } from '../../config/env'
import { AppError } from '../../middleware/errorHandler'

export interface RegisterInput {
  email: string
  password: string
  name?: string
}

export interface LoginInput {
  email: string
  password: string
}

function signToken(userId: string, email: string, role: string) {
  return jwt.sign(
    { userId, email, role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN } as any
  )
}

export async function register(input: RegisterInput) {
  const exists = await prisma.user.findUnique({ where: { email: input.email } })
  if (exists) throw new AppError('Email already registered', 409, 'EMAIL_EXISTS')

  const hashed = await bcrypt.hash(input.password, 12)

  const user = await prisma.user.create({
    data: {
      email:    input.email,
      password: hashed,
      name:     input.name,
      profile:  { create: {} },
    },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })

  const token = signToken(user.id, user.email, user.role)
  return { user, token }
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } })
  if (!user) throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS')

  const valid = await bcrypt.compare(input.password, user.password)
  if (!valid) throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS')

  const token = signToken(user.id, user.email, user.role)

  return {
    user: {
      id:        user.id,
      email:     user.email,
      name:      user.name,
      role:      user.role,
      createdAt: user.createdAt,
    },
    token,
  }
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true, email: true, name: true,
      role: true, createdAt: true,
      profile: { select: { avatar: true, phone: true, tier: true } },
    },
  })
  if (!user) throw new AppError('User not found', 404)
  return user
}