import { Router } from 'express';
import { userController } from './user.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createUserSchema, updateUserSchema } from './user.schema.js';

const router = Router();

router.get('/', authenticate, userController.getAll);
router.get('/:id', authenticate, userController.getById);
router.post('/', validate(createUserSchema), userController.create);
router.put('/:id', authenticate, validate(updateUserSchema), userController.update);
router.delete('/:id', authenticate, userController.remove);

export default router;
