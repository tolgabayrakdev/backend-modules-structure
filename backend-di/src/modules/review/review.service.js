import { HttpException } from '../../exceptions/http.exception.js';

export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async getAll() {
    return this.reviewRepository.findAll();
  }

  async getById(id) {
    const review = await this.reviewRepository.findById(id);
    if (!review) throw new HttpException(404, 'Review not found');
    return review;
  }

  async getByProduct(productId) {
    const reviews = await this.reviewRepository.findByProduct(productId);
    return reviews.filter((r) => r.approved);
  }

  async getByUser(userId) {
    return this.reviewRepository.findByUser(userId);
  }

  async create(data) {
    if (data.rating < 1 || data.rating > 5) {
      throw new HttpException(400, 'Rating must be between 1 and 5');
    }
    return this.reviewRepository.create(data);
  }

  async update(id, data) {
    const updated = await this.reviewRepository.update(id, data);
    if (!updated) throw new HttpException(404, 'Review not found');
    return updated;
  }

  async approve(id) {
    const updated = await this.reviewRepository.update(id, { approved: true });
    if (!updated) throw new HttpException(404, 'Review not found');
    return updated;
  }

  async delete(id) {
    const deleted = await this.reviewRepository.delete(id);
    if (!deleted) throw new HttpException(404, 'Review not found');
  }
}
