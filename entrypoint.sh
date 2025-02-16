#!/bin/sh
echo "Running database migrations..."
npx prisma generate
npx prisma migrate deploy
exec "$@"  # Run npm start
