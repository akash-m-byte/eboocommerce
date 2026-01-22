import { Router } from 'express';
import { sellerController } from '../controllers/sellerController';

const router = Router();
router.post('/onboard', sellerController.onboard);
router.get('/:id', sellerController.get);
router.get('/:id/analytics', sellerController.analytics);

export default router;
