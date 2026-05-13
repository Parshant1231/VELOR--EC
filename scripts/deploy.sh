#!/bin/bash
set -e

echo "
╔══════════════════════════════════╗
║   VELORÉ — Production Deploy    ║
╚══════════════════════════════════╝
"

# Check prod env exists
if [ ! -f .env.production ]; then
  echo "❌  .env.production not found."
  echo "    Copy .env.production.example, fill in values."
  exit 1
fi

# Load production env
export $(grep -v '^#' .env.production | xargs)

# Validate required vars
REQUIRED=("POSTGRES_PASSWORD" "JWT_SECRET" "NEXT_PUBLIC_API_URL" "NEXT_PUBLIC_APP_URL")
for var in "${REQUIRED[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌  Missing required env var: $var"
    exit 1
  fi
done

echo "🐳  Building production images..."
docker-compose -f docker-compose.prod.yml --env-file .env.production build --no-cache

echo "🚀  Starting production services..."
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d

echo "⏳  Waiting for services to be healthy..."
sleep 15

echo "
✅  Production stack running.

  App   : http://localhost (via Nginx)
  API   : internal only (via Nginx proxy)
  DB    : internal only

Check logs: docker-compose -f docker-compose.prod.yml logs -f
"