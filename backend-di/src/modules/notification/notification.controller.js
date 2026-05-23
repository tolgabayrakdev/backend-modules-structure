export class NotificationController {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.notificationService.getAll();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.notificationService.getById(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  getByUser = async (req, res, next) => {
    try {
      const data = await this.notificationService.getByUser(req.params.userId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  send = async (req, res, next) => {
    try {
      const data = await this.notificationService.send(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  };

  markRead = async (req, res, next) => {
    try {
      const data = await this.notificationService.markRead(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  markAllRead = async (req, res, next) => {
    try {
      await this.notificationService.markAllRead(req.params.userId);
      res.json({ success: true, message: 'All notifications marked as read' });
    } catch (err) { next(err); }
  };

  remove = async (req, res, next) => {
    try {
      await this.notificationService.delete(req.params.id);
      res.json({ success: true, message: 'Notification deleted' });
    } catch (err) { next(err); }
  };
}
