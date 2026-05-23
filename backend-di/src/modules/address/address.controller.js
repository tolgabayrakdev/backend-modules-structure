export class AddressController {
  constructor(addressService) {
    this.addressService = addressService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.addressService.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.addressService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getByUser = async (req, res, next) => {
    try {
      const data = await this.addressService.getByUser(req.params.userId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.addressService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.addressService.update(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  setDefault = async (req, res, next) => {
    try {
      const data = await this.addressService.setDefault(req.params.userId, req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  remove = async (req, res, next) => {
    try {
      await this.addressService.delete(req.params.id);
      res.json({ success: true, message: 'Address deleted' });
    } catch (err) { next(err); }
  };
}
