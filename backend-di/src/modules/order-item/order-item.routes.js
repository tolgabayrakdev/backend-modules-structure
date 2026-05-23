import { Router } from 'express';
import { orderItemController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createOrderItemSchema, updateOrderItemSchema } from './order-item.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', orderItemController.getAll);
router.get('/order/:orderId', orderItemController.getByOrder);
router.get('/:id', orderItemController.getById);
router.post('/', validate(createOrderItemSchema), orderItemController.create);
router.put('/:id', validate(updateOrderItemSchema), orderItemController.update);
router.delete('/:id', orderItemController.remove);

export default router;
