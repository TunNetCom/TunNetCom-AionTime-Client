FROM oven/bun:1-alpine AS base

# Install dependencies only when needed
FROM base AS deps

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy package files and prisma schema
COPY package.json bun.lock ./
COPY prisma ./prisma

COPY .env.production .env

# Install dependencies and generate prisma client
RUN bun install --frozen-lockfile
RUN bunx prisma generate

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# Install OpenSSL here as well if build script reruns prisma generate, and increase memory for build
RUN apk add --no-cache openssl && NODE_OPTIONS=--max-old-space-size=4096 bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# The 'bun' group should already exist in the oven/bun base image.
# We will add the 'nextjs' user to this existing 'bun' group.
RUN adduser --system --uid 1001 --ingroup bun nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:bun .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:bun /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bun /app/.next/static ./.next/static

# Add start.sh script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

USER nextjs

EXPOSE 3000

ENV PORT 3000
# ENV HOSTNAME=0.0.0.0 # Bun typically defaults to 0.0.0.0 when a port is specified

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["/app/start.sh"]
