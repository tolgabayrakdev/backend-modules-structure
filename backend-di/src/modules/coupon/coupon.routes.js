import { Router } from 'express';
import { couponController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createCouponSchema, updateCouponSchema, applyCouponSchema } from './coupon.schema.js';

const router = Router();

router.get('/validate/:code', couponController.validate);
router.post('/apply', authenticate, validate(applyCouponSchema), couponController.apply);

router.get('/', authenticate, couponController.getAll);
router.get('/:id', authenticate, couponController.getById);
router.post('/', authenticate, validate(createCouponSchema), couponController.create);
router.put('/:id', authenticate, validate(updateCouponSchema), couponController.update);
router.delete('/:id', authenticate, couponController.remove);

export default router;
