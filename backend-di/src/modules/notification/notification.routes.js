import { Router } from 'express';
import { notificationController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { sendNotificationSchema } from './notification.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', notificationController.getAll);
router.get('/user/:userId', notificationController.getByUser);
router.get('/:id', notificationController.getById);
router.post('/', validate(sendNotificationSchema), notificationController.send);
router.patch('/:id/read', notificationController.markRead);
router.patch('/user/:userId/read-all', notificationController.markAllRead);
router.delete('/:id', notificationController.remove);

export default router;
