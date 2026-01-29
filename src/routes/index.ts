import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import categoryRoutes from './categoryRoutes';
import uploadRoutes from './uploadRoutes';
import reviewRoutes from './reviewRoutes';
import cartRoutes from './cartRoutes';
import orderRoutes from './orderRoutes';

const router = Router();

/** @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is up
 */
router.get('/health', healthController.status);

/** @swagger
 * /health/ready:
 *   get:
 *     summary: Readiness (DB connected)
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Ready
 *       503:
 *         description: DB unavailable
 */
router.get('/health/ready', healthController.readiness);

/** @swagger
 * /health/live:
 *   get:
 *     summary: Liveness probe
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Alive
 */
router.get('/health/live', healthController.liveness);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/upload', uploadRoutes);
router.use('/reviews', reviewRoutes);
router.use('/carts', cartRoutes);
router.use('/orders', orderRoutes);

export default router;
