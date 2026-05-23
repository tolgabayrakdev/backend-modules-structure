export class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.productService.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.productService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getByCategory = async (req, res, next) => {
    try {
      const data = await this.productService.getByCategory(req.params.categoryId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getFeatured = async (req, res, next) => {
    try {
      const data = await this.productService.getFeatured();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  search = async (req, res, next) => {
    try {
      const data = await this.productService.search(req.query.q);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.productService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.productService.update(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  remove = async (req, res, next) => {
    try {
      await this.productService.delete(req.params.id);
      res.json({ success: true, message: 'Product deleted' });
    } catch (err) { next(err); }
  };
}
