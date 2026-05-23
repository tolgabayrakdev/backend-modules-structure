import { Router } from 'express';
import { orderController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createOrderSchema, updateOrderSchema, updateStatusSchema } from './order.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', orderController.getAll);
router.get('/user/:userId', orderController.getUserOrders);
router.get('/:id', orderController.getById);
router.post('/', validate(createOrderSchema), orderController.create);
router.put('/:id', validate(updateOrderSchema), orderController.update);
router.patch('/:id/status', validate(updateStatusSchema), orderController.updateStatus);
router.delete('/:id', orderController.remove);

export default router;
