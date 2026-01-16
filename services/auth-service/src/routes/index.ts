import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import authRoutes from './authRoutes';

const router = Router();
router.get('/health', healthController.status);
router.get('/health/ready', healthController.readiness);
router.get('/health/live', healthController.liveness);
router.use('/auth', authRoutes);

export default router;
