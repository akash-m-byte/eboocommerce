import axios from 'axios';
import { logger } from '../../../../shared/utils/logger';

export interface ServiceConfig {
  name: string;
  url: string;
  basePath: string;
}

export class DocsAggregator {
  private services: ServiceConfig[];

  constructor() {
    this.services = [
      { name: 'auth-service', url: process.env.AUTH_SERVICE_URL!, basePath: '/api' },
      { name: 'product-service', url: process.env.PRODUCT_SERVICE_URL!, basePath: '/api' },
      { name: 'pricing-service', url: process.env.PRICING_SERVICE_URL!, basePath: '/api' },
      { name: 'inventory-service', url: process.env.INVENTORY_SERVICE_URL!, basePath: '/api' },
      { name: 'cart-service', url: process.env.CART_SERVICE_URL!, basePath: '/api' },
      { name: 'order-service', url: process.env.ORDER_SERVICE_URL!, basePath: '/api' },
      { name: 'payment-service', url: process.env.PAYMENT_SERVICE_URL!, basePath: '/api' },
      { name: 'seller-service', url: process.env.SELLER_SERVICE_URL!, basePath: '/api' },
      { name: 'shipping-service', url: process.env.SHIPPING_SERVICE_URL!, basePath: '/api' },
      { name: 'notification-service', url: process.env.NOTIFICATION_SERVICE_URL!, basePath: '/api' },
      { name: 'review-service', url: process.env.REVIEW_SERVICE_URL!, basePath: '/api' }
    ];
  }

  async fetchServiceDocs(service: ServiceConfig): Promise<any> {
    try {
      const response = await axios.get(`${service.url}${service.basePath}/docs/swagger.json`, {
        timeout: 3000
      });
      return {
        service: service.name,
        url: service.url,
        docs: response.data
      };
    } catch (error: any) {
      logger.warn({ service: service.name, error: error.message }, 'Failed to fetch service docs');
      return {
        service: service.name,
        url: service.url,
        docs: null,
        error: error.message
      };
    }
  }

  async aggregateAllDocs(): Promise<any[]> {
    const results = await Promise.all(
      this.services.map(service => this.fetchServiceDocs(service))
    );
    return results;
  }

  async getServiceDoc(serviceName: string): Promise<any> {
    const service = this.services.find(s => s.name === serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return this.fetchServiceDocs(service);
  }

  getServices(): ServiceConfig[] {
    return this.services;
  }
}

export const docsAggregator = new DocsAggregator();