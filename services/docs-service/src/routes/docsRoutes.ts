import { Router } from 'express';
import { docsController } from '../controllers/docsController';

const router = Router();
router.get('/', docsController.index);
router.get('/all', docsController.all);
router.get('/:serviceName', docsController.service);

export default router;
