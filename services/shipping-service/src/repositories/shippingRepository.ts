import { prisma } from './prisma';

export const shippingRepository = {
  addAddress: (data: any) => prisma.address.create({ data }),
  createShipment: (data: any) => prisma.shipment.create({ data }),
  getShipment: (trackingId: string) => prisma.shipment.findFirst({ where: { trackingId } })
};
