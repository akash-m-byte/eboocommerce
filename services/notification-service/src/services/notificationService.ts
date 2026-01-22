import { notificationRepository } from '../repositories/notificationRepository';
import { ValidationError } from '../../../../shared/utils/errors';

export interface SendNotificationInput {
  userId: string | null;
  channel: 'EMAIL' | 'SMS';
  message: string;
}

/**
 * Notification Service - Business Logic Layer
 */
export class NotificationService {
  async send(input: SendNotificationInput) {
    // Business validation
    if (!input.channel || !['EMAIL', 'SMS'].includes(input.channel)) {
      throw new ValidationError('Channel must be EMAIL or SMS');
    }
    if (!input.message || input.message.trim().length === 0) {
      throw new ValidationError('Message is required');
    }
    if (!input.userId && input.channel === 'SMS') {
      throw new ValidationError('UserId is required for SMS notifications');
    }

    // Create notification record
    const record = await notificationRepository.create(
      input.userId,
      input.channel,
      input.message
    );

    return { status: 'queued', id: record.id };
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
