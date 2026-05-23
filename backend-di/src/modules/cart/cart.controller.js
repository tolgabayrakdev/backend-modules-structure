export class CartController {
  constructor(cartService) {
    this.cartService = cartService;
  }

  getCart = async (req, res, next) => {
    try {
      const data = await this.cartService.getCart(req.params.userId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  addItem = async (req, res, next) => {
    try {
      const data = await this.cartService.addItem(req.params.userId, req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };

  removeItem = async (req, res, next) => {
    try {
      await this.cartService.removeItem(req.params.userId, req.params.productId);
      res.json({ success: true, message: 'Item removed from cart' });
    } catch (err) { next(err); }
  };

  clearCart = async (req, res, next) => {
    try {
      await this.cartService.clearCart(req.params.userId);
      res.json({ success: true, message: 'Cart cleared' });
    } catch (err) { next(err); }
  };

  getTotal = async (req, res, next) => {
    try {
      const data = await this.cartService.getTotal(req.params.userId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };
}
