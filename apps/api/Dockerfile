# ─── Stage 1: Dependencies ────────────────────────────────────
FROM node:20-slim AS deps

# Install system dependencies required by Prisma
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# Copy root workspace files
COPY package*.json ./
COPY turbo.json ./

# Copy workspace packages
COPY packages ./packages

# Copy API app
COPY apps/api ./apps/api

# Install dependencies
RUN npm install

# ─── Stage 2: Builder ─────────────────────────────────────────
FROM node:20-slim AS builder

# Install system dependencies required by Prisma
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy full monorepo
COPY . .

# Move into API app
WORKDIR /app/apps/api

# Generate Prisma client
RUN npx prisma generate

# Build API
RUN npm run build

# ─── Stage 3: Production Runner ───────────────────────────────
FROM node:20-slim AS runner

# Install runtime dependencies
RUN apt-get update && apt-get install -y openssl wget

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN groupadd -r nodejs && useradd -r -g nodejs velore

# Copy production files
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Set permissions
RUN chown -R velore:nodejs /app

USER velore

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:4000/health || exit 1

CMD ["node", "dist/index.js"]