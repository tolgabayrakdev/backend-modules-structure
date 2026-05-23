export class InventoryController {
  constructor(inventoryService) {
    this.inventoryService = inventoryService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.inventoryService.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.inventoryService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getByProduct = async (req, res, next) => {
    try {
      const data = await this.inventoryService.getByProduct(req.params.productId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  updateStock = async (req, res, next) => {
    try {
      const { quantity, reason } = req.body;
      const data = await this.inventoryService.updateStock(req.params.productId, quantity, reason);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getLowStock = async (req, res, next) => {
    try {
      const threshold = req.query.threshold ? Number(req.query.threshold) : 10;
      const data = await this.inventoryService.getLowStock(threshold);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getHistory = async (req, res, next) => {
    try {
      const data = await this.inventoryService.getHistory(req.params.productId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };
}
