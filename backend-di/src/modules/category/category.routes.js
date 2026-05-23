import { Router } from 'express';
import { categoryController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createCategorySchema, updateCategorySchema } from './category.schema.js';

const router = Router();

router.get('/', categoryController.getAll);
router.get('/tree', categoryController.getTree);
router.get('/:id', categoryController.getById);

router.post('/', authenticate, validate(createCategorySchema), categoryController.create);
router.put('/:id', authenticate, validate(updateCategorySchema), categoryController.update);
router.delete('/:id', authenticate, categoryController.remove);

export default router;
