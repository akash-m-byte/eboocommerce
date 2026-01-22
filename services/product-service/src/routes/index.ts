import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import productRoutes from './productRoutes';
import categoryRoutes from './categoryRoutes';

const router = Router();
router.get('/health', healthController.status);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);

export default router;
