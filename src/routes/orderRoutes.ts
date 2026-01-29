import { Router } from 'express';
import { orderController } from '../controllers/orderController';

const router = Router();

/** @swagger
 * /orders/checkout:
 *   post:
 *     summary: Create order (checkout)
 *     tags: [Orders]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: { type: string }
 *               items: { type: array }
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/checkout', orderController.checkout);

/** @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 */
router.get('/:id', orderController.get);

/** @swagger
 * /orders/user/{userId}:
 *   get:
 *     summary: List orders by user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/user/:userId', orderController.listByUser);

/** @swagger
 * /orders/{id}/cancel:
 *   post:
 *     summary: Cancel order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order canceled
 */
router.post('/:id/cancel', orderController.cancel);

export default router;
