export class CartItemController {
  constructor(cartItemService) {
    this.cartItemService = cartItemService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.cartItemService.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.cartItemService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getByCart = async (req, res, next) => {
    try {
      const data = await this.cartItemService.getByCart(req.params.cartId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.cartItemService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.cartItemService.update(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  remove = async (req, res, next) => {
    try {
      await this.cartItemService.delete(req.params.id);
      res.json({ success: true, message: 'Cart item deleted' });
    } catch (err) { next(err); }
  };
}
