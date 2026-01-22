import { prisma } from './prisma';

export const paymentRepository = {
  create: (orderId: string, userId: string, amount: number) => prisma.payment.create({ data: { orderId, userId, amount } }),
  updateStatus: (id: string, status: any) => prisma.payment.update({ where: { id }, data: { status } }),
  log: (paymentId: string, payload: any) => prisma.transactionLog.create({ data: { paymentId, payload: JSON.stringify(payload) } })
};
