import { Router } from 'express';
import { healthController } from '../../../../shared/controllers/healthController';
import docsRoutes from './docsRoutes';

const router = Router();
router.get('/health', healthController.status);
router.use('/docs', docsRoutes);

export default router;
