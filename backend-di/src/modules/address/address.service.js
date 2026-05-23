import { HttpException } from '../../exceptions/http.exception.js';

export class AddressService {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }

  async getAll() {
    return this.addressRepository.findAll();
  }

  async getById(id) {
    const address = await this.addressRepository.findById(id);
    if (!address) throw new HttpException(404, 'Address not found');
    return address;
  }

  async getByUser(userId) {
    return this.addressRepository.findByUser(userId);
  }

  async create(data) {
    return this.addressRepository.create(data);
  }

  async update(id, data) {
    const updated = await this.addressRepository.update(id, data);
    if (!updated) throw new HttpException(404, 'Address not found');
    return updated;
  }

  async setDefault(userId, id) {
    const address = await this.addressRepository.findById(id);
    if (!address) throw new HttpException(404, 'Address not found');
    if (String(address.userId) !== String(userId)) {
      throw new HttpException(403, 'Address does not belong to this user');
    }
    return this.addressRepository.setDefault(userId, id);
  }

  async delete(id) {
    const deleted = await this.addressRepository.delete(id);
    if (!deleted) throw new HttpException(404, 'Address not found');
  }
}
