import axios from 'axios';
import { logger } from '../../shared/utils/logger';

const get = (base: string, path: string, headers: Record<string, string>) =>
  axios.get(`${base}${path}`, { headers, timeout: 5000 }).then(r => r.data).catch(err => {
    logger.error({ err, base, path }, 'Service call failed');
    throw new Error(`Service unavailable: ${err.message}`);
  });

const post = (base: string, path: string, body: unknown, headers: Record<string, string>) =>
  axios.post(`${base}${path}`, body, { headers, timeout: 5000 }).then(r => r.data).catch(err => {
    logger.error({ err, base, path }, 'Service call failed');
    throw new Error(`Service unavailable: ${err.message}`);
  });

export const resolvers = {
  Query: {
    products: async (_: unknown, args: { limit?: number; offset?: number }, ctx: any) => {
      const limit = args.limit || 20;
      const offset = args.offset || 0;
      return get(process.env.PRODUCT_SERVICE_URL!, `/api/products?limit=${limit}&offset=${offset}`, ctx.headers);
    },
    cart: async (_: unknown, args: { userId: string }, ctx: any) => {
      return get(process.env.CART_SERVICE_URL!, `/api/carts/${args.userId}`, ctx.headers);
    },
    order: async (_: unknown, args: { id: string }, ctx: any) => {
      return get(process.env.ORDER_SERVICE_URL!, `/api/orders/${args.id}`, ctx.headers);
    }
  },
  Mutation: {
    addToCart: async (_: unknown, args: { userId: string; productId: string; quantity: number }, ctx: any) => {
      return post(process.env.CART_SERVICE_URL!, '/api/carts/add', args, ctx.headers);
    },
    checkout: async (_: unknown, args: { userId: string }, ctx: any) => {
      return post(process.env.ORDER_SERVICE_URL!, '/api/orders/checkout', { userId: args.userId }, ctx.headers);
    }
  }
};
