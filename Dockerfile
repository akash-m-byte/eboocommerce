# Build from repo root: docker build -t eboocommerce .
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci 2>/dev/null || npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src
RUN npm run build && npm prune --production

# Production image – Alpine + OpenSSL so Prisma works (no need to pull node:20-slim)
FROM node:20-alpine

RUN apk add --no-cache openssl ca-certificates

WORKDIR /app

COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
