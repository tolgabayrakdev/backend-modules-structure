export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.userService.getAll();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.userService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getProfile = async (req, res, next) => {
    try {
      const data = await this.userService.getProfile(req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.userService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.userService.update(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  remove = async (req, res, next) => {
    try {
      await this.userService.delete(req.params.id);
      res.json({ success: true, message: 'User deleted' });
    } catch (err) {
      next(err);
    }
  };
}
