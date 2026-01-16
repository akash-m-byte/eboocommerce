import { Request, Response } from 'express';
import { DocsAggregator } from '../services/docsAggregator';

const docsAggregator = new DocsAggregator();

export const docsController = {
  index: async (_req: Request, res: Response) => {
    const services = docsAggregator.getServices();
    const servicesList = services.map(s => ({
      name: s.name,
      url: s.url,
      docsUrl: `${s.url}/api/docs`,
      swaggerUrl: `${s.url}/api/docs/swagger.json`,
      serviceInfoUrl: `/api/docs/${s.name}`
    }));
    res.json({
      title: 'E-boo API Documentation',
      version: '1.0.0',
      services: servicesList,
      aggregatedUrl: '/api/docs/all',
      hubUrl: '/docs'
    });
  },

  all: async (_req: Request, res: Response) => {
    const docs = await docsAggregator.aggregateAllDocs();
    res.json({
      title: 'All Services API Documentation',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      services: docs
    });
  },

  service: async (req: Request, res: Response) => {
    try {
      const { serviceName } = req.params;
      const doc = await docsAggregator.getServiceDoc(serviceName);
      res.json(doc);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
};
