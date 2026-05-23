import { HttpException } from '../../exceptions/http.exception.js';

const VALID_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async getAll() {
    return this.orderRepository.findAll();
  }

  async getById(id) {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new HttpException(404, 'Order not found');
    return order;
  }

  async getUserOrders(userId) {
    return this.orderRepository.findByUser(userId);
  }

  async create(data) {
    return this.orderRepository.create(data);
  }

  async update(id, data) {
    const updated = await this.orderRepository.update(id, data);
    if (!updated) throw new HttpException(404, 'Order not found');
    return updated;
  }

  async updateStatus(id, status) {
    if (!VALID_STATUSES.includes(status)) {
      throw new HttpException(400, `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
    }
    const updated = await this.orderRepository.update(id, { status });
    if (!updated) throw new HttpException(404, 'Order not found');
    return updated;
  }

  async delete(id) {
    const deleted = await this.orderRepository.delete(id);
    if (!deleted) throw new HttpException(404, 'Order not found');
  }
}
