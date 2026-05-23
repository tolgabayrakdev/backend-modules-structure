export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      const data = await this.authService.register(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const data = await this.authService.login(req.body);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  logout = async (req, res, next) => {
    try {
      await this.authService.logout(req.body.refreshToken);
      res.json({ success: true, message: 'Logged out' });
    } catch (err) {
      next(err);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const data = await this.authService.refreshToken(req.body.refreshToken);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };
}
