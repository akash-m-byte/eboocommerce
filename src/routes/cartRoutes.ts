import { Router } from 'express';
import { cartController } from '../controllers/cartController';

const router = Router();

/**
 * @swagger
 * /carts/{userId}:
 *   get:
 *     summary: Get cart by user ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart with items
 */
router.get('/:userId', cartController.get);

/**
 * @swagger
 * /carts/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: { type: string }
 *               guestId: { type: string }
 *               productId: { type: string }
 *               quantity: { type: number }
 *     responses:
 *       201:
 *         description: Item added
 */
router.post('/add', cartController.add);

/**
 * @swagger
 * /carts/update:
 *   post:
 *     summary: Update item quantity
 *     tags: [Cart]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: { type: string }
 *               productId: { type: string }
 *               quantity: { type: number }
 *     responses:
 *       200:
 *         description: Cart updated
 */
router.post('/update', cartController.update);

/**
 * @swagger
 * /carts/remove:
 *   post:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: { type: string }
 *               productId: { type: string }
 *     responses:
 *       200:
 *         description: Item removed
 */
router.post('/remove', cartController.remove);

export default router;
