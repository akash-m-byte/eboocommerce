# E-boo Architecture Documentation

## Configuration Management

### Environment Variables
- All services use `.env.example` as a template
- Environment validation via `zod` schemas in `src/config/env.ts`
- Centralized config in `shared/config/appConfig.ts`

### Database Configuration
- **PostgreSQL**: Connection pooling via Prisma (default pool size: 10)
- **MongoDB**: Connection pooling via Mongoose (maxPoolSize: 10)
- Connection timeouts and retry strategies configured

### Error Handling
- Custom error classes in `shared/utils/errors.ts`
- Global error handler middleware in `shared/middleware/errorHandler.ts`
- Proper HTTP status codes and error codes

### Request Validation
- Zod schemas in `shared/schemas/`
- Validation middleware: `validate()`, `validateQuery()`, `validateParams()`
- Applied to all POST/PUT endpoints

### Authentication & Authorization
- JWT-based authentication
- Middleware: `authenticate()` and `authorize(...roles)`
- Role-based access control (ADMIN, SELLER, CUSTOMER)

### Service Communication
- HTTP client with retry/timeout in `shared/utils/httpClient.ts`
- Service-to-service calls use `ServiceClient` class
- Request tracing via `x-request-id` header

### Health Checks
- `/api/health` - Basic health check
- `/api/health/ready` - Readiness probe (checks DB)
- `/api/health/live` - Liveness probe

### Graceful Shutdown
- Handles SIGTERM and SIGINT
- Closes HTTP server
- Disconnects databases
- Cleans up resources

### Logging
- Structured logging via `pino`
- Correlation IDs via request tracing
- Log levels configurable via `LOG_LEVEL` env var

### Rate Limiting
- Redis-backed rate limiting
- Configurable per service
- Applied at API Gateway level

## Service Patterns

All services follow this structure:
```
src/
  controllers/    # Request handlers
  services/       # Business logic
  repositories/   # Data access
  routes/         # Route definitions
  models/         # Data models (MongoDB)
  config/         # Configuration
  index.ts        # Entry point
```

## Best Practices

1. **Validation**: Always validate input with Zod schemas
2. **Error Handling**: Use custom error classes, not generic Error
3. **Database**: Use repositories, never direct DB access in controllers
4. **Logging**: Use structured logging with context
5. **Testing**: Health checks verify service dependencies
6. **Security**: Helmet, CORS, rate limiting enabled by default
