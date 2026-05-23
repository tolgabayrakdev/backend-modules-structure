import { HttpException } from '../../exceptions/http.exception.js';

export class OrderItemService {
  constructor(orderItemRepository) {
    this.orderItemRepository = orderItemRepository;
  }

  async getAll() {
    return this.orderItemRepository.findAll();
  }

  async getById(id) {
    const item = await this.orderItemRepository.findById(id);
    if (!item) throw new HttpException(404, 'Order item not found');
    return item;
  }

  async getByOrder(orderId) {
    return this.orderItemRepository.findByOrder(orderId);
  }

  async create(data) {
    if (data.quantity < 1) throw new HttpException(400, 'Quantity must be at least 1');
    return this.orderItemRepository.create(data);
  }

  async update(id, data) {
    const updated = await this.orderItemRepository.update(id, data);
    if (!updated) throw new HttpException(404, 'Order item not found');
    return updated;
  }

  async delete(id) {
    const deleted = await this.orderItemRepository.delete(id);
    if (!deleted) throw new HttpException(404, 'Order item not found');
  }
}
