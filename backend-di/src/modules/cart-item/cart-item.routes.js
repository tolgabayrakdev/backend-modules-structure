import { Router } from 'express';
import { cartItemController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createCartItemSchema, updateCartItemSchema } from './cart-item.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', cartItemController.getAll);
router.get('/cart/:cartId', cartItemController.getByCart);
router.get('/:id', cartItemController.getById);
router.post('/', validate(createCartItemSchema), cartItemController.create);
router.put('/:id', validate(updateCartItemSchema), cartItemController.update);
router.delete('/:id', cartItemController.remove);

export default router;
