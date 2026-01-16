import { Router } from 'express';
import { inventoryController } from '../controllers/inventoryController';

const router = Router();
router.get('/:productId', inventoryController.stock);
router.post('/reserve', inventoryController.reserve);
router.post('/release', inventoryController.release);

export default router;
