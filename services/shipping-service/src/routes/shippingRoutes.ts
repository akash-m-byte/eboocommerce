import { Router } from 'express';
import { shippingController } from '../controllers/shippingController';

const router = Router();
router.post('/cost', shippingController.cost);
router.post('/ship', shippingController.ship);
router.get('/track/:trackingId', shippingController.track);

export default router;
