import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import cartRoutes from './cartRoutes';

const router = Router();
router.get('/health', healthController.status);
router.use('/carts', cartRoutes);

export default router;
