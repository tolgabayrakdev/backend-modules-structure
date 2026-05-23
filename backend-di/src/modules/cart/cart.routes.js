import { Router } from 'express';
import { cartController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { addItemSchema } from './cart.schema.js';

const router = Router();

router.use(authenticate);

router.get('/:userId', cartController.getCart);
router.get('/:userId/total', cartController.getTotal);
router.post('/:userId/items', validate(addItemSchema), cartController.addItem);
router.delete('/:userId/items/:productId', cartController.removeItem);
router.delete('/:userId', cartController.clearCart);

export default router;
