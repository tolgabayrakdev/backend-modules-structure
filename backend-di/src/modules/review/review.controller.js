export class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.reviewService.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.reviewService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getByProduct = async (req, res, next) => {
    try {
      const data = await this.reviewService.getByProduct(req.params.productId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getByUser = async (req, res, next) => {
    try {
      const data = await this.reviewService.getByUser(req.params.userId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.reviewService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.reviewService.update(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  approve = async (req, res, next) => {
    try {
      const data = await this.reviewService.approve(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  remove = async (req, res, next) => {
    try {
      await this.reviewService.delete(req.params.id);
      res.json({ success: true, message: 'Review deleted' });
    } catch (err) { next(err); }
  };
}
