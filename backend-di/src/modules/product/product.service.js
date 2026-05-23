import { HttpException } from '../../exceptions/http.exception.js';

export class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async getAll() {
    return this.productRepository.findAll();
  }

  async getById(id) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new HttpException(404, 'Product not found');
    return product;
  }

  async getByCategory(categoryId) {
    return this.productRepository.findByCategory(categoryId);
  }

  async getFeatured() {
    return this.productRepository.findFeatured();
  }

  async search(query) {
    if (!query) throw new HttpException(400, 'Search query is required');
    return this.productRepository.search(query);
  }

  async create(data) {
    return this.productRepository.create(data);
  }

  async update(id, data) {
    const updated = await this.productRepository.update(id, data);
    if (!updated) throw new HttpException(404, 'Product not found');
    return updated;
  }

  async delete(id) {
    const deleted = await this.productRepository.delete(id);
    if (!deleted) throw new HttpException(404, 'Product not found');
  }
}
