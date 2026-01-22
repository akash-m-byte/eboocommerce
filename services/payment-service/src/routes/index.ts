import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import paymentRoutes from './paymentRoutes';

const router = Router();
router.get('/health', healthController.status);
router.use('/payments', paymentRoutes);

export default router;
