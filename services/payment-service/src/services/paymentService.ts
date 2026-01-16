import { paymentRepository } from '../repositories/paymentRepository';
import { publishEvent } from '../../../shared/utils/eventBus';

export const paymentService = {
  async createIntent(orderId: string, userId: string, amount: number) {
    const payment = await paymentRepository.create(orderId, userId, amount);
    return { paymentId: payment.id, status: payment.status };
  },
  async handleCallback(paymentId: string, status: 'SUCCESS' | 'FAILED', payload: any) {
    await paymentRepository.log(paymentId, payload);
    const payment = await paymentRepository.updateStatus(paymentId, status);
    if (status === 'SUCCESS') {
      await publishEvent('payments', 'payment.success', {
        paymentId,
        orderId: payment.orderId,
        amount: payment.amount,
        userId: payment.userId
      });
    } else {
      await publishEvent('payments', 'payment.failed', { paymentId, orderId: payment.orderId, userId: payment.userId });
    }
    return payment;
  }
};
