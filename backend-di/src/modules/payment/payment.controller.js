export class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.paymentService.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.paymentService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getHistory = async (req, res, next) => {
    try {
      const data = await this.paymentService.getHistory(req.params.userId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.paymentService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };

  verify = async (req, res, next) => {
    try {
      const data = await this.paymentService.verify(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  refund = async (req, res, next) => {
    try {
      const data = await this.paymentService.refund(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };
}
