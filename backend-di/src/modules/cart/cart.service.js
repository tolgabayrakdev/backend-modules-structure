import { HttpException } from '../../exceptions/http.exception.js';

export class CartService {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async _getOrCreate(userId) {
    return (await this.cartRepository.findByUser(userId)) ?? this.cartRepository.create(userId);
  }

  async getCart(userId) {
    const cart = await this._getOrCreate(userId);
    const items = await this.cartRepository.findItemsByCart(cart.id);
    const total = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);
    return { ...cart, items, total };
  }

  async addItem(userId, { productId, quantity, price }) {
    const cart = await this._getOrCreate(userId);
    return this.cartRepository.addItem(cart.id, productId, quantity, price);
  }

  async removeItem(userId, productId) {
    const cart = await this.cartRepository.findByUser(userId);
    if (!cart) throw new HttpException(404, 'Cart not found');
    const removed = await this.cartRepository.removeItem(cart.id, productId);
    if (!removed) throw new HttpException(404, 'Item not found in cart');
  }

  async clearCart(userId) {
    const cart = await this.cartRepository.findByUser(userId);
    if (!cart) throw new HttpException(404, 'Cart not found');
    await this.cartRepository.clearItems(cart.id);
  }

  async getTotal(userId) {
    const cart = await this.cartRepository.findByUser(userId);
    if (!cart) return { total: 0 };
    const items = await this.cartRepository.findItemsByCart(cart.id);
    return { total: items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0) };
  }
}
