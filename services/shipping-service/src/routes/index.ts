import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import shippingRoutes from './shippingRoutes';

const router = Router();
router.get('/health', healthController.status);
router.use('/shipping', shippingRoutes);

export default router;
