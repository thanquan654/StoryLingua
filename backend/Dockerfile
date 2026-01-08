# Stage 1: Build source code
FROM node:24-alpine AS builder

WORKDIR /app

# Install OpenSSL
RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY prisma.config.ts ./prisma.config.ts

# Install dependencies
RUN npm ci

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Typescript
RUN npm run build

# Stage 2: Runner
FROM node:24-alpine AS runner

WORKDIR /app

# Install OpenSSL
RUN apk add --no-cache openssl

ENV NODE_ENV=production

# Add non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

RUN chown -R expressjs:nodejs /app

USER expressjs

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
