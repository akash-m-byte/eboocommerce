import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import sellerRoutes from './sellerRoutes';

const router = Router();
router.get('/health', healthController.status);
router.use('/sellers', sellerRoutes);

export default router;
