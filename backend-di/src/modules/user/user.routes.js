import { Router } from 'express';
import { userController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createUserSchema, updateUserSchema } from './user.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', userController.getAll);
router.get('/:id/profile', userController.getProfile);
router.get('/:id', userController.getById);
router.post('/', validate(createUserSchema), userController.create);
router.put('/:id', validate(updateUserSchema), userController.update);
router.delete('/:id', userController.remove);

export default router;
