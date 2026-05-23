export class CouponController {
  constructor(couponService) {
    this.couponService = couponService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.couponService.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.couponService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.couponService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.couponService.update(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  remove = async (req, res, next) => {
    try {
      await this.couponService.delete(req.params.id);
      res.json({ success: true, message: 'Coupon deleted' });
    } catch (err) { next(err); }
  };

  validate = async (req, res, next) => {
    try {
      const data = await this.couponService.validate(req.params.code);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  apply = async (req, res, next) => {
    try {
      const data = await this.couponService.apply(req.body.code, req.body.amount);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };
}
