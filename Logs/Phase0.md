VELORE PROJECT LOG — PHASE 0
==============================
Status: COMPLETE
Date: Phase 0

STACK:
- Turborepo monorepo
- apps/web: Next.js 14 + TypeScript + Tailwind + Framer Motion
- apps/api: Express.js + TypeScript
- packages/db: Prisma + PostgreSQL
- Docker: postgres:16 on 5432, redis:7 on 6379

DESIGN TOKENS:
- Colors: velore-black (#0A0A0A), velore-gold (#C9A96E), velore-surface (#1A1A1A)
- Fonts: Cormorant Garamond (serif/display), Inter (sans)
- Custom scrollbar, ::selection styled gold

DB SCHEMA: User, Profile, Product, Order, OrderItem, WishlistItem, CartItem
MIGRATIONS: Run with `npx prisma migrate dev --name init`

ENV: .env at root, DATABASE_URL points to Docker postgres
PORTS: Frontend 3000, API 4000, Postgres 5432, Redis 6379

GIT: Pushed to main branch
NEXT: PHASE 1 — Homepage + Navbar + Hero Section (pixel-perfect to design)

IMAGE PLACEHOLDERS: All product/model images → /public/images/placeholder/
Fonts confirmed: Cormorant Garamond from Google Fonts via next/font