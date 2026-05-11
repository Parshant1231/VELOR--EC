import dotenv from 'dotenv'
import path from 'path'

// Load root .env
dotenv.config({ path: path.resolve(__dirname, '../../../..', '.env') })

function required(key: string): string {
  const val = process.env[key]
  if (!val) throw new Error(`Missing required env var: ${key}`)
  return val
}

export const env = {
  NODE_ENV:       process.env.NODE_ENV || 'development',
  PORT:           parseInt(process.env.API_PORT || '4000'),
  DATABASE_URL:   required('DATABASE_URL'),
  JWT_SECRET:     required('JWT_SECRET'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL:     process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const