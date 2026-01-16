import { Router } from 'express';
import { reviewController } from '../controllers/reviewController';

const router = Router();
router.get('/product/:productId', reviewController.list);
router.post('/', reviewController.create);
router.patch('/:id/moderate', reviewController.moderate);

export default router;
