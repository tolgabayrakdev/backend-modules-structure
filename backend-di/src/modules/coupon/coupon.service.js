import { HttpException } from '../../exceptions/http.exception.js';

export class CouponService {
  constructor(couponRepository) {
    this.couponRepository = couponRepository;
  }

  async getAll() {
    return this.couponRepository.findAll();
  }

  async getById(id) {
    const coupon = await this.couponRepository.findById(id);
    if (!coupon) throw new HttpException(404, 'Coupon not found');
    return coupon;
  }

  async create(data) {
    const existing = await this.couponRepository.findByCode(data.code);
    if (existing) throw new HttpException(409, 'Coupon code already exists');
    return this.couponRepository.create(data);
  }

  async update(id, data) {
    const updated = await this.couponRepository.update(id, data);
    if (!updated) throw new HttpException(404, 'Coupon not found');
    return updated;
  }

  async delete(id) {
    const deleted = await this.couponRepository.delete(id);
    if (!deleted) throw new HttpException(404, 'Coupon not found');
  }

  async validate(code) {
    const coupon = await this.couponRepository.findByCode(code);
    if (!coupon) throw new HttpException(404, 'Invalid coupon code');
    if (!coupon.active) throw new HttpException(400, 'Coupon is inactive');
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      throw new HttpException(400, 'Coupon has expired');
    }
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      throw new HttpException(400, 'Coupon usage limit reached');
    }
    return coupon;
  }

  async apply(code, amount) {
    const coupon = await this.validate(code);
    await this.couponRepository.incrementUsage(coupon.id);
    const discount =
      coupon.type === 'percentage'
        ? (amount * Number(coupon.value)) / 100
        : Math.min(Number(coupon.value), amount);
    return { coupon, discount, finalAmount: amount - discount };
  }
}
