import { orderRepository } from '../repositories/orderRepository';
import { publishEvent } from '../../../shared/utils/eventBus';

export const orderService = {
  async checkout(userId: string, items: { productId: string; quantity: number; price: number }[]) {
    const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    const order = await orderRepository.create(userId, items, total);
    await publishEvent('orders', 'order.created', { orderId: order.id, userId, total });
    return order;
  },
  get: (id: string) => orderRepository.findById(id),
  listByUser: (userId: string) => orderRepository.findByUser(userId),
  cancel: async (id: string) => {
    const order = await orderRepository.updateStatus(id, 'CANCELED');
    await publishEvent('orders', 'order.canceled', { orderId: order.id });
    return order;
  }
};
