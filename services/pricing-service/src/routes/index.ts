import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import pricingRoutes from './pricingRoutes';

const router = Router();
router.get('/health', healthController.status);
router.use('/pricing', pricingRoutes);

export default router;
