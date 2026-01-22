import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import orderRoutes from './orderRoutes';

const router = Router();
router.get('/health', healthController.status);
router.use('/orders', orderRoutes);

export default router;
