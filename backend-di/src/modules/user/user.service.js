import crypto from 'crypto';
import { HttpException } from '../../exceptions/http.exception.js';

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    const users = await this.userRepository.findAll();
    return users.map(({ password: _, ...u }) => u);
  }

  async getById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new HttpException(404, 'User not found');
    const { password: _, ...safe } = user;
    return safe;
  }

  async getProfile(id) {
    return this.getById(id);
  }

  async create({ name, email, password, role = 'user' }) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new HttpException(409, 'Email already in use');
    const user = await this.userRepository.create({
      name,
      email,
      password: crypto.createHash('sha256').update(password).digest('hex'),
      role,
    });
    const { password: _, ...safe } = user;
    return safe;
  }

  async update(id, data) {
    const updated = await this.userRepository.update(id, data);
    if (!updated) throw new HttpException(404, 'User not found');
    const { password: _, ...safe } = updated;
    return safe;
  }

  async delete(id) {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) throw new HttpException(404, 'User not found');
  }
}
