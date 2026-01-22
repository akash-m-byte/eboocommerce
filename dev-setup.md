# Development Setup (Local - No Docker)

This is the **recommended way** to develop locally. It's faster and easier than Docker.

## Prerequisites

- Node.js 20+ and npm
- PostgreSQL (running locally or use Docker just for databases)
- MongoDB (running locally or use Docker just for databases)
- Redis (running locally or use Docker just for databases)
- RabbitMQ (running locally or use Docker just for databases)

## Quick Start

### Option 1: Use Docker only for Infrastructure (Recommended)

```bash
# Start only databases and infrastructure
docker-compose up -d postgres mongodb redis rabbitmq

# Install dependencies for all services
npm run install:all

# Run all services in development mode
npm run dev
```

### Option 2: Run Services Individually

```bash
# Terminal 1 - Auth Service
cd services/auth-service
npm install
npm run dev

# Terminal 2 - Product Service
cd services/product-service
npm install
npm run dev

# ... and so on for each service
```

## Environment Variables

Each service needs a `.env` file. Copy the example:

```bash
cp services/auth-service/.env.example services/auth-service/.env
# Edit .env with your local database URLs
```

## Database Setup

Run migrations for services that use Prisma:

```bash
cd services/auth-service
npx prisma migrate dev
```

## Running Services

All services run on their default ports:
- API Gateway: http://localhost:4000
- Auth Service: http://localhost:4001
- Product Service: http://localhost:4002
- ... etc

## Hot Reload

All services support hot reload with `npm run dev` (uses `ts-node-dev` or `nodemon`).
