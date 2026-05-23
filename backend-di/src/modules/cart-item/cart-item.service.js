import { HttpException } from '../../exceptions/http.exception.js';

export class CartItemService {
  constructor(cartItemRepository) {
    this.cartItemRepository = cartItemRepository;
  }

  async getAll() {
    return this.cartItemRepository.findAll();
  }

  async getById(id) {
    const item = await this.cartItemRepository.findById(id);
    if (!item) throw new HttpException(404, 'Cart item not found');
    return item;
  }

  async getByCart(cartId) {
    return this.cartItemRepository.findByCart(cartId);
  }

  async create(data) {
    return this.cartItemRepository.create(data);
  }

  async update(id, data) {
    const updated = await this.cartItemRepository.update(id, data);
    if (!updated) throw new HttpException(404, 'Cart item not found');
    return updated;
  }

  async delete(id) {
    const deleted = await this.cartItemRepository.delete(id);
    if (!deleted) throw new HttpException(404, 'Cart item not found');
  }
}
