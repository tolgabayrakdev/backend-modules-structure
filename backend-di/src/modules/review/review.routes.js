import { Router } from 'express';
import { reviewController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createReviewSchema, updateReviewSchema } from './review.schema.js';

const router = Router();

router.get('/product/:productId', reviewController.getByProduct);
router.get('/user/:userId', authenticate, reviewController.getByUser);
router.get('/:id', reviewController.getById);
router.get('/', authenticate, reviewController.getAll);

router.post('/', authenticate, validate(createReviewSchema), reviewController.create);
router.put('/:id', authenticate, validate(updateReviewSchema), reviewController.update);
router.patch('/:id/approve', authenticate, reviewController.approve);
router.delete('/:id', authenticate, reviewController.remove);

export default router;
