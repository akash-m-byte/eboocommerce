import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import notificationRoutes from './notificationRoutes';

const router = Router();
router.get('/health', healthController.status);
router.use('/notifications', notificationRoutes);

export default router;
