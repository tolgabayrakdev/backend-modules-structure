export class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.orderService.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.orderService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getUserOrders = async (req, res, next) => {
    try {
      const data = await this.orderService.getUserOrders(req.params.userId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.orderService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.orderService.update(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  updateStatus = async (req, res, next) => {
    try {
      const data = await this.orderService.updateStatus(req.params.id, req.body.status);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  remove = async (req, res, next) => {
    try {
      await this.orderService.delete(req.params.id);
      res.json({ success: true, message: 'Order deleted' });
    } catch (err) { next(err); }
  };
}
