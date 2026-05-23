import { Router } from 'express';
import { paymentController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createPaymentSchema } from './payment.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', paymentController.getAll);
router.get('/history/:userId', paymentController.getHistory);
router.get('/:id', paymentController.getById);
router.post('/', validate(createPaymentSchema), paymentController.create);
router.patch('/:id/verify', paymentController.verify);
router.patch('/:id/refund', paymentController.refund);

export default router;
