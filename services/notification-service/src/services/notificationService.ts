import { notificationRepository } from '../repositories/notificationRepository';

export const notificationService = {
  async send(userId: string | null, channel: 'EMAIL' | 'SMS', message: string) {
    const record = await notificationRepository.create(userId, channel, message);
    return { status: 'queued', id: record.id };
  }
};
