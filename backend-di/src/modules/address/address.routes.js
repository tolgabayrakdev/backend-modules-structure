import { Router } from 'express';
import { addressController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createAddressSchema, updateAddressSchema } from './address.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', addressController.getAll);
router.get('/user/:userId', addressController.getByUser);
router.get('/:id', addressController.getById);
router.post('/', validate(createAddressSchema), addressController.create);
router.put('/:id', validate(updateAddressSchema), addressController.update);
router.patch('/user/:userId/:id/default', addressController.setDefault);
router.delete('/:id', addressController.remove);

export default router;
