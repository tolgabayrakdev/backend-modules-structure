export class CategoryController {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.categoryService.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.categoryService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getTree = async (req, res, next) => {
    try {
      const data = await this.categoryService.getTree();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.categoryService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.categoryService.update(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  remove = async (req, res, next) => {
    try {
      await this.categoryService.delete(req.params.id);
      res.json({ success: true, message: 'Category deleted' });
    } catch (err) { next(err); }
  };
}
