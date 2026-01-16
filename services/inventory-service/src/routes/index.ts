import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import inventoryRoutes from './inventoryRoutes';

const router = Router();
router.get('/health', healthController.status);
router.use('/inventory', inventoryRoutes);

export default router;
