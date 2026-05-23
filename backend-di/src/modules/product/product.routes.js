import { Router } from 'express';
import { productController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createProductSchema, updateProductSchema } from './product.schema.js';

const router = Router();

router.get('/', productController.getAll);
router.get('/featured', productController.getFeatured);
router.get('/search', productController.search);
router.get('/category/:categoryId', productController.getByCategory);
router.get('/:id', productController.getById);

router.post('/', authenticate, validate(createProductSchema), productController.create);
router.put('/:id', authenticate, validate(updateProductSchema), productController.update);
router.delete('/:id', authenticate, productController.remove);

export default router;
