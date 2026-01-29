# Build from repo root: docker build -t eboocommerce .
# Uses BuildKit cache mounts for faster npm install.
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

# Production image – no npm install, copy from builder
FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000

CMD ["node", "dist/index.js"]
