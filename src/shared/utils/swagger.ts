import swaggerJsdoc from 'swagger-jsdoc';
import { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const port = process.env.PORT || 4000;
const baseUrl = `http://localhost:${port}/api`;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eboocommerce API',
      version: '1.0.0',
      description: 'REST API for eboocommerce: auth, products, categories, reviews, cart, orders, uploads.',
      contact: { name: 'E-boo Platform', email: 'support@eboo.com' },
      license: { name: 'MIT', url: 'https://opensource.org/licenses/MIT' }
    },
    servers: [
      { url: baseUrl, description: 'API base – all paths below are relative to this URL' }
    ],
    tags: [
      { name: 'Auth', description: 'Register, login, refresh, logout, password reset, email verification' },
      { name: 'Products', description: 'Product CRUD and listing' },
      { name: 'Categories', description: 'Category CRUD and tree' },
      { name: 'Upload', description: 'Image upload (single/multiple)' },
      { name: 'Reviews', description: 'Product reviews and moderation' },
      { name: 'Cart', description: 'Shopping cart' },
      { name: 'Orders', description: 'Checkout and orders' },
      { name: 'Health', description: 'Health checks' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Access token from POST /auth/login'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                code: { type: 'string', example: 'BAD_REQUEST' },
                message: { type: 'string' },
                details: { type: 'object' }
              }
            }
          }
        },
        Health: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'ok' },
            service: { type: 'string' }
          }
        }
      }
    },
    security: []
  },
  apis: [
    path.join(process.cwd(), 'src/routes/**/*.ts')
  ]
};

export function setupSwagger(app: any, serviceName: string) {
  const swaggerSpec = swaggerJsdoc({
    ...options,
    definition: {
      ...options.definition,
      info: {
        ...options.definition.info,
        title: `${serviceName} API`,
        description: options.definition.info?.description
      }
    }
  });

  app.get('/api/docs/swagger.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api/docs', swaggerUi.serve);
  app.get(
    '/api/docs',
    swaggerUi.setup(swaggerSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: `${serviceName} API Documentation`,
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'list',
        filter: true,
        tryItOutEnabled: true
      }
    })
  );
}
