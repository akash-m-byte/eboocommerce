import { Router } from 'express';
import { pricingController } from '../controllers/pricingController';

const router = Router();
router.get('/:productId', pricingController.get);
router.post('/base', pricingController.setBase);
router.post('/discount', pricingController.discount);
router.post('/coupon', pricingController.coupon);

export default router;
