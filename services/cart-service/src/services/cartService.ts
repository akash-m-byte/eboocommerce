import { cartRepository } from '../repositories/cartRepository';

export const cartService = {
  getCart: (userId: string) => cartRepository.getCart(userId),
  add: async (userId: string | undefined, guestId: string | undefined, productId: string, quantity: number) => {
    const cart = await cartRepository.findOrCreateCart(userId, guestId);
    await cartRepository.addItem(cart.id, productId, quantity);
    return cartRepository.findOrCreateCart(userId, guestId);
  },
  update: async (userId: string, productId: string, quantity: number) => {
    const cart = await cartRepository.findOrCreateCart(userId, undefined);
    await cartRepository.updateItem(cart.id, productId, quantity);
    return cartRepository.findOrCreateCart(userId, undefined);
  },
  remove: async (userId: string, productId: string) => {
    const cart = await cartRepository.findOrCreateCart(userId, undefined);
    await cartRepository.removeItem(cart.id, productId);
    return cartRepository.findOrCreateCart(userId, undefined);
  }
};
