# Service Template - Layered Architecture

Use this template when creating or refactoring services.

## Directory Structure

```
src/
├── controllers/          # HTTP Layer
│   ├── {entity}Controller.ts
│   └── healthController.ts
├── services/             # Business Logic Layer
│   └── {entity}Service.ts
├── repositories/         # Data Access Layer
│   ├── {entity}Repository.ts
│   └── prisma.ts (or mongoose model)
├── routes/               # Route definitions
│   ├── {entity}Routes.ts
│   └── index.ts
├── config/               # Configuration
│   └── env.ts
└── index.ts              # Application entry point
```

## Controller Template

```typescript
import { Request, Response, NextFunction } from 'express';
import { entityService } from '../services/entityService';

/**
 * Entity Controller - HTTP Request/Response Layer
 * Handles HTTP requests, extracts data, calls service, returns responses
 */
export const entityController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, offset } = req.query;
      const result = await entityService.list({
        limit: Number(limit || 20),
        offset: Number(offset || 0)
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await entityService.getById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await entityService.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await entityService.update(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await entityService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
```

## Service Template

```typescript
import { entityRepository } from '../repositories/entityRepository';
import { NotFoundError, ValidationError } from '../../../../shared/utils/errors';

export interface CreateEntityInput {
  // Define input interface
}

export interface UpdateEntityInput {
  // Define input interface
}

/**
 * Entity Service - Business Logic Layer
 * Handles business logic, validation, and data transformation
 */
export class EntityService {
  async list(input: { limit: number; offset: number }) {
    // Business validation
    if (input.limit < 1 || input.limit > 100) {
      input.limit = 20;
    }

    // Call repository
    return entityRepository.findAll(input.limit, input.offset);
  }

  async getById(id: string) {
    const entity = await entityRepository.findById(id);
    if (!entity) {
      throw new NotFoundError('Entity');
    }
    return entity;
  }

  async create(input: CreateEntityInput) {
    // Business validation
    if (!input.requiredField) {
      throw new ValidationError('Required field is missing');
    }

    // Transform data
    const data = {
      ...input,
      createdAt: new Date()
    };

    // Call repository
    return entityRepository.create(data);
  }

  async update(id: string, input: UpdateEntityInput) {
    // Check existence
    const existing = await entityRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Entity');
    }

    // Transform data
    const data = {
      ...input,
      updatedAt: new Date()
    };

    // Call repository
    return entityRepository.update(id, data);
  }

  async delete(id: string) {
    const entity = await entityRepository.findById(id);
    if (!entity) {
      throw new NotFoundError('Entity');
    }

    return entityRepository.delete(id);
  }
}

// Export singleton instance
export const entityService = new EntityService();
```

## Repository Template

```typescript
import { prisma } from './prisma';
// OR import { Model } from '../models/model';

/**
 * Entity Repository - Data Access Layer
 * Handles all database operations
 * NO business logic - only database queries
 */
export const entityRepository = {
  findAll: (limit: number, offset: number) =>
    prisma.entity.findMany({
      take: limit,
      skip: offset
    }),

  findById: (id: string) =>
    prisma.entity.findUnique({
      where: { id }
    }),

  create: (data: any) =>
    prisma.entity.create({
      data
    }),

  update: (id: string, data: any) =>
    prisma.entity.update({
      where: { id },
      data
    }),

  delete: (id: string) =>
    prisma.entity.delete({
      where: { id }
    })
};
```

## Key Principles

1. **Controller**: Only HTTP concerns (extract, call service, return response)
2. **Service**: Business logic, validation, transformation, orchestration
3. **Repository**: Only database operations, no business logic

## Checklist

When refactoring a service:

- [ ] Controller methods have `NextFunction` parameter
- [ ] Controller methods use try-catch and call `next(error)`
- [ ] Controller only extracts data and calls service
- [ ] Service has business validation
- [ ] Service transforms data before calling repository
- [ ] Repository has NO business logic
- [ ] Repository only does database queries
- [ ] All layers use proper TypeScript interfaces/types
