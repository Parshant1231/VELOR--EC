import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { execSync } from 'child_process'
// Routes
import authRoutes     from './modules/auth/auth.routes'
import productRoutes  from './modules/products/products.routes'
import userRoutes     from './modules/users/users.routes'

const app = express()

// ─── Security ───────────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin:      env.CLIENT_URL,
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}))

// ─── Rate limiting ───────────────────────────────────────────
app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max:      20,
  message:  { error: 'Too many requests, please try again later' },
}))

// ─── Body parsing ────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// ─── Logging ─────────────────────────────────────────────────
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'))
}

// ─── Health check ────────────────────────────────────────────
app.get('/health', (_, res) => {
  res.json({ status: 'ok', env: env.NODE_ENV, timestamp: new Date().toISOString() })
})

// ─── Routes ──────────────────────────────────────────────────
app.use('/api/auth',     authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users',    userRoutes)

// ─── 404 ─────────────────────────────────────────────────────
app.use((_, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ─── Error handler (must be last) ────────────────────────────
app.use(errorHandler)

async function bootstrap() {
  // Run pending migrations in production
  if (env.NODE_ENV === 'production') {
    try {
      console.log('Running database migrations...')
      execSync('npx prisma migrate deploy', { stdio: 'inherit' })
      console.log('Migrations complete.')
    } catch (err) {
      console.error('Migration failed:', err)
      process.exit(1)
    }
  }

  app.listen(env.PORT, () => {
    console.log(`
  ╔══════════════════════════════════╗
  ║   VELORÉ API — Running          ║
  ║   Port: ${env.PORT}                     ║
  ║   Env:  ${env.NODE_ENV}             ║
  ╚══════════════════════════════════╝
    `)
  })
}

bootstrap()

export default app