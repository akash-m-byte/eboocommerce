import { prisma } from './prisma';

export const notificationRepository = {
  create: (userId: string | null, channel: 'EMAIL' | 'SMS', message: string) =>
    prisma.notification.create({ data: { userId: userId || undefined, channel, message } })
};
