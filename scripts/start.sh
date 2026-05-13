#!/bin/bash
set -e

echo "
╔══════════════════════════════════╗
║   VELORÉ — Starting Dev         ║
╚══════════════════════════════════╝
"

# Check .env exists
if [ ! -f .env ]; then
  echo "❌  .env not found. Copy .env.example and fill in values."
  exit 1
fi

# Start Docker services
echo "🐳  Starting Docker services..."
docker-compose up -d postgres redis

# Wait for postgres
echo "⏳  Waiting for Postgres..."
until docker exec velore_db pg_isready -U velore > /dev/null 2>&1; do
  sleep 1
done
echo "✅  Postgres ready."

# Run migrations
echo "🔄  Running migrations..."
cd packages/db
npx prisma migrate deploy
npx prisma generate
cd ../..

echo "
✅  All services running.

  Frontend : http://localhost:3000
  API      : http://localhost:4000
  Postgres : localhost:5432
  Redis    : localhost:6379

Run in separate terminals:
  cd apps/api && npm run dev
  cd apps/web && npm run dev
"