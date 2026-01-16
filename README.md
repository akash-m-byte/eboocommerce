# E-boo Ecommerce Platform (Microservices)

E-boo is a production-grade, enterprise-scale e-commerce platform designed with a **Node.js + Express.js + TypeScript** microservices architecture.

**Author**: Akash Masih

## High-Level Architecture
- **API Gateway / BFF (GraphQL)**: Single entry point for frontend, aggregates data from internal services, validates JWT, enforces rate limits, propagates tracing.
- **Microservices**: Independently deployable/scalable, each owns its database.
- **REST**: Public and internal service-to-service APIs.
- **GraphQL**: Internal aggregation layer for frontend (BFF).
- **Datastores**:
  - **PostgreSQL** for transactional services (auth, pricing, inventory, cart, order, payment, seller, shipping, notifications).
  - **MongoDB** for catalog and reviews.
  - **Redis** for caching, sessions, rate limiting.
- **Event-driven integration**: RabbitMQ topics for order/payment/notification events.
- **API Documentation**: Auto-generated Swagger/OpenAPI docs for each service.

## Services
- **API Gateway / BFF** (Port 4000) - GraphQL aggregation
- **Auth & User** (Port 4001) - Authentication & authorization
- **Product Catalog** (Port 4002) - Product CRUD, categories, search
- **Pricing & Offers** (Port 4003) - Pricing, discounts, coupons
- **Inventory** (Port 4004) - Stock tracking, reservations
- **Cart** (Port 4005) - Shopping cart management
- **Order** (Port 4006) - Order lifecycle
- **Payment** (Port 4007) - Payment processing
- **Seller** (Port 4008) - Seller management
- **Shipping** (Port 4009) - Shipping & tracking
- **Notification** (Port 4010) - Email/SMS notifications
- **Review & Rating** (Port 4011) - Product reviews
- **Documentation Service** (Port 4012) - API docs aggregator

## API Documentation

### Documentation Hub
Visit `http://localhost:4012/docs` to access the central documentation hub that aggregates all service documentation.

### Per-Service Documentation
Each service exposes Swagger UI at:
- `http://localhost:{port}/api/docs`
- OpenAPI JSON at: `http://localhost:{port}/api/docs/swagger.json`

### Adding Documentation
See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed guide on adding Swagger annotations to routes.

## Running Locally
1. Install Docker Desktop
2. Run: `docker-compose up --build`
3. GraphQL Gateway: `http://localhost:4000/graphql`
4. Documentation Hub: `http://localhost:4012/docs`

## Git Setup

The repository is configured with git user name: **Akash Masih**

To complete git setup:
```bash
# Windows
.\setup-git.ps1

# Linux/Mac
./setup-git.sh
```

Or manually:
```bash
git config user.name "Akash Masih"
git config user.email "dev.akashmasih@gmail.com"
```

See [GIT_SETUP.md](./GIT_SETUP.md) for detailed instructions.

## Key Flows
See each service folder for REST endpoints and contracts. All endpoints are documented in Swagger UI.

## Configuration
See [CONFIGURATION.md](./CONFIGURATION.md) for detailed configuration guide.

## Architecture
See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.
