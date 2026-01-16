import { Router } from 'express';
import { paymentController } from '../controllers/paymentController';

const router = Router();
router.post('/intent', paymentController.intent);
router.post('/callback', paymentController.callback);

export default router;
