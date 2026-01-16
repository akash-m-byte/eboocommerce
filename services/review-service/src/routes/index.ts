import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import reviewRoutes from './reviewRoutes';

const router = Router();
router.get('/health', healthController.status);
router.use('/reviews', reviewRoutes);

export default router;
