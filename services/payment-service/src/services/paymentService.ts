import { paymentRepository } from '../repositories/paymentRepository';
import { publishEvent } from '../../../../shared/utils/eventBus';
import { ValidationError, NotFoundError } from '../../../../shared/utils/errors';

export interface CreateIntentInput {
  orderId: string;
  userId: string;
  amount: number;
}

export interface HandleCallbackInput {
  paymentId: string;
  status: 'SUCCESS' | 'FAILED';
  payload: any;
}

/**
 * Payment Service - Business Logic Layer
 */
export class PaymentService {
  async createIntent(input: CreateIntentInput) {
    // Business validation
    if (!input.orderId || !input.userId) {
      throw new ValidationError('OrderId and UserId are required');
    }
    if (input.amount <= 0) {
      throw new ValidationError('Amount must be greater than 0');
    }

    // Create payment intent
    const payment = await paymentRepository.create(
      input.orderId,
      input.userId,
      input.amount
    );

    return {
      paymentId: payment.id,
      status: payment.status
    };
  }

  async handleCallback(input: HandleCallbackInput) {
    // Business validation
    if (!input.paymentId) {
      throw new ValidationError('PaymentId is required');
    }
    if (!['SUCCESS', 'FAILED'].includes(input.status)) {
      throw new ValidationError('Invalid payment status');
    }

    // Log callback
    await paymentRepository.log(input.paymentId, input.payload);

    // Update payment status
    const payment = await paymentRepository.updateStatus(
      input.paymentId,
      input.status
    );

    if (!payment) {
      throw new NotFoundError('Payment');
    }

    // Publish events
    if (input.status === 'SUCCESS') {
      await publishEvent('payments', 'payment.success', {
        paymentId: payment.id,
        orderId: payment.orderId,
        amount: payment.amount,
        userId: payment.userId
      });
    } else {
      await publishEvent('payments', 'payment.failed', {
        paymentId: payment.id,
        orderId: payment.orderId,
        userId: payment.userId
      });
    }

    return payment;
  }
}

// Export singleton instance
export const paymentService = new PaymentService();
