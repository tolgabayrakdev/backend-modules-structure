import { HttpException } from '../../exceptions/http.exception.js';

export class PaymentService {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async getAll() {
    return this.paymentRepository.findAll();
  }

  async getById(id) {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) throw new HttpException(404, 'Payment not found');
    return payment;
  }

  async getHistory(userId) {
    return this.paymentRepository.findByUser(userId);
  }

  async create(data) {
    return this.paymentRepository.create(data);
  }

  async verify(id) {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) throw new HttpException(404, 'Payment not found');
    if (payment.status !== 'pending') throw new HttpException(400, 'Payment already processed');
    return this.paymentRepository.update(id, { status: 'completed', verified_at: new Date() });
  }

  async refund(id) {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) throw new HttpException(404, 'Payment not found');
    if (payment.status !== 'completed') {
      throw new HttpException(400, 'Only completed payments can be refunded');
    }
    return this.paymentRepository.update(id, { status: 'refunded', refunded_at: new Date() });
  }
}
