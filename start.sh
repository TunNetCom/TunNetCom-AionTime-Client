#!/bin/sh
set -e

# Run Prisma migrations
echo "Running Prisma migrations..."
bunx prisma migrate deploy

# Start the application
echo "Starting application..."
exec bun server.js 