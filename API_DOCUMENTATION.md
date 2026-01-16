# API Documentation Guide

## Overview

The E-boo platform includes automatic API documentation generation using Swagger/OpenAPI. Each service has its own documentation that is automatically updated when routes are added.

## Documentation Service

The **docs-service** (port 4012) aggregates documentation from all services:

- **Hub**: `http://localhost:4012/docs` - Central documentation hub
- **All Services**: `http://localhost:4012/api/docs/all` - Aggregated JSON
- **Service Info**: `http://localhost:4012/api/docs/{service-name}` - Individual service info

## Per-Service Documentation

Each service exposes its own Swagger UI:

- **Auth Service**: `http://localhost:4001/api/docs`
- **Product Service**: `http://localhost:4002/api/docs`
- **Pricing Service**: `http://localhost:4003/api/docs`
- **Inventory Service**: `http://localhost:4004/api/docs`
- **Cart Service**: `http://localhost:4005/api/docs`
- **Order Service**: `http://localhost:4006/api/docs`
- **Payment Service**: `http://localhost:4007/api/docs`
- **Seller Service**: `http://localhost:4008/api/docs`
- **Shipping Service**: `http://localhost:4009/api/docs`
- **Notification Service**: `http://localhost:4010/api/docs`
- **Review Service**: `http://localhost:4011/api/docs`

Each service also exposes OpenAPI JSON:
- `http://localhost:{port}/api/docs/swagger.json`

## Adding Documentation to Routes

### Step 1: Add Swagger Annotations

Add JSDoc comments with `@swagger` tags above your route handlers:

```typescript
/**
 * @swagger
 * /products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of items to skip
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', productController.list);
```

### Step 2: Document Request Bodies

```typescript
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 */
router.post('/', validate(createProductSchema), productController.create);
```

### Step 3: Document Authentication

```typescript
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticate, authorize('ADMIN'), productController.remove);
```

### Step 4: Define Schemas

Add schema definitions in your route files:

```typescript
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         categoryId:
 *           type: string
 */
```

## Automatic Updates

Documentation is automatically generated from:
1. Route annotations (`@swagger` comments)
2. Controller files
3. Route definition files

When you add a new route with annotations, it will automatically appear in the Swagger UI after the service restarts.

## Best Practices

1. **Always document routes** - Every route should have Swagger annotations
2. **Use tags** - Group related endpoints with tags (e.g., `[Products]`, `[Auth]`)
3. **Document responses** - Include all possible response codes
4. **Define schemas** - Reuse schema definitions for request/response bodies
5. **Security** - Document authentication requirements with `security: - bearerAuth: []`

## Example: Complete Route Documentation

```typescript
/**
 * @swagger
 * /orders/checkout:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckoutRequest'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CheckoutRequest:
 *       type: object
 *       required:
 *         - userId
 *         - items
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *     OrderItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *         - price
 *       properties:
 *         productId:
 *           type: string
 *         quantity:
 *           type: integer
 *         price:
 *           type: number
 */
router.post('/checkout', authenticate, validate(checkoutSchema), orderController.checkout);
```

## Testing Documentation

1. Start all services: `docker-compose up`
2. Visit docs hub: `http://localhost:4012/docs`
3. Click on any service to view its Swagger UI
4. Test endpoints directly from Swagger UI

## Troubleshooting

- **Docs not updating**: Restart the service after adding annotations
- **Missing routes**: Ensure annotations are in route files, not just controllers
- **Schema errors**: Check OpenAPI syntax in annotations
- **Service not found**: Verify service is running and accessible
