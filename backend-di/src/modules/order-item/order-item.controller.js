export class OrderItemController {
  constructor(orderItemService) {
    this.orderItemService = orderItemService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.orderItemService.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.orderItemService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getByOrder = async (req, res, next) => {
    try {
      const data = await this.orderItemService.getByOrder(req.params.orderId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.orderItemService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.orderItemService.update(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  remove = async (req, res, next) => {
    try {
      await this.orderItemService.delete(req.params.id);
      res.json({ success: true, message: 'Order item deleted' });
    } catch (err) { next(err); }
  };
}
