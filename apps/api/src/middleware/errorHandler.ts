import { Request, Response, NextFunction } from 'express'

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[${new Date().toISOString()}] ${err.name}: ${err.message}`)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    })
  }

  // Prisma unique constraint
  if ((err as any).code === 'P2002') {
    return res.status(409).json({ error: 'Resource already exists' })
  }

  // Prisma not found
  if ((err as any).code === 'P2025') {
    return res.status(404).json({ error: 'Resource not found' })
  }

  return res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  })
}