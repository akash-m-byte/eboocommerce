# Configuration Guide

## What's Been Added

### 1. **Error Handling System**
- Custom error classes (`AppError`, `ValidationError`, `NotFoundError`, etc.)
- Global error handler middleware
- Proper HTTP status codes and error responses
- Location: `shared/utils/errors.ts`, `shared/middleware/errorHandler.ts`

### 2. **Request Validation**
- Zod validation schemas for all major endpoints
- Validation middleware (`validate`, `validateQuery`, `validateParams`)
- Schemas in `shared/schemas/`:
  - `authSchemas.ts` - Registration, login, refresh
  - `productSchemas.ts` - Product CRUD
  - `cartSchemas.ts` - Cart operations
  - `orderSchemas.ts` - Checkout

### 3. **Authentication & Authorization**
- JWT authentication middleware (`authenticate`)
- Role-based authorization (`authorize(...roles)`)
- Type-safe user context (`req.user`)
- Location: `shared/middleware/auth.ts`

### 4. **Database Configuration**
- Connection pooling for Prisma clients
- MongoDB connection configuration
- Configurable pool sizes and timeouts
- Location: `shared/config/database.ts`

### 5. **Health Checks**
- Basic health: `/api/health`
- Readiness: `/api/health/ready` (checks DB)
- Liveness: `/api/health/live`
- All services include these endpoints

### 6. **Service Communication**
- `ServiceClient` class with retry/timeout
- Request/response interceptors
- Error handling for service calls
- Location: `shared/utils/httpClient.ts`

### 7. **Graceful Shutdown**
- Handles SIGTERM/SIGINT
- Closes HTTP servers
- Disconnects databases
- Cleans up resources
- Location: `shared/utils/gracefulShutdown.ts`

### 8. **Configuration Management**
- Centralized app config
- Environment variable validation
- Type-safe configuration
- Location: `shared/config/appConfig.ts`

### 9. **Project Files**
- `.gitignore` - Excludes node_modules, .env, logs, etc.
- `.dockerignore` - Optimizes Docker builds
- `ARCHITECTURE.md` - Architecture documentation

## Usage Examples

### Adding Validation to a Route
```typescript
import { validate } from '../../../shared/utils/validation';
import { createProductSchema } from '../../../shared/schemas/productSchemas';

router.post('/', validate(createProductSchema), productController.create);
```

### Using Authentication
```typescript
import { authenticate, authorize } from '../../../shared/middleware/auth';

router.get('/admin', authenticate, authorize('ADMIN'), adminController.list);
```

### Throwing Custom Errors
```typescript
import { NotFoundError, ValidationError } from '../../../shared/utils/errors';

if (!product) throw new NotFoundError('Product');
if (!email) throw new ValidationError('Email is required');
```

### Using Service Client
```typescript
import { ServiceClient } from '../../../shared/utils/httpClient';

const productClient = new ServiceClient(process.env.PRODUCT_SERVICE_URL!);
const products = await productClient.get('/api/products');
```

## Environment Variables

### Common to All Services
- `PORT` - Service port
- `SERVICE_NAME` - Service identifier
- `LOG_LEVEL` - Logging level (info, debug, error)
- `NODE_ENV` - Environment (development, production)

### Database Services
- `DATABASE_URL` - PostgreSQL connection string
- `MONGO_URI` - MongoDB connection string

### Auth Service
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - Refresh token secret

### Event-Driven Services
- `RABBITMQ_URL` - RabbitMQ connection string

### API Gateway
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT verification secret
- `*_SERVICE_URL` - URLs for all services

## Next Steps

1. **Update all services** to use the new error handler and validation
2. **Add validation schemas** for remaining endpoints
3. **Configure connection pools** based on expected load
4. **Set up monitoring** for health check endpoints
5. **Add integration tests** using the validation schemas

## Questions?

See `ARCHITECTURE.md` for detailed architecture documentation.
