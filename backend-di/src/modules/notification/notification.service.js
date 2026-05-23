import { HttpException } from '../../exceptions/http.exception.js';

export class NotificationService {
  constructor(notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  async getAll() {
    return this.notificationRepository.findAll();
  }

  async getById(id) {
    const n = await this.notificationRepository.findById(id);
    if (!n) throw new HttpException(404, 'Notification not found');
    return n;
  }

  async getByUser(userId) {
    return this.notificationRepository.findByUser(userId);
  }

  async send({ userId, title, message, type = 'info' }) {
    return this.notificationRepository.create({ userId, title, message, type });
  }

  async markRead(id) {
    const updated = await this.notificationRepository.update(id, { read: true, read_at: new Date() });
    if (!updated) throw new HttpException(404, 'Notification not found');
    return updated;
  }

  async markAllRead(userId) {
    await this.notificationRepository.markAllRead(userId);
  }

  async delete(id) {
    const deleted = await this.notificationRepository.delete(id);
    if (!deleted) throw new HttpException(404, 'Notification not found');
  }
}
