import { Router } from 'express';
import { noteController } from './note.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createNoteSchema, updateNoteSchema } from './note.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', noteController.getAll);
router.get('/:id', noteController.getById);
router.post('/', validate(createNoteSchema), noteController.create);
router.put('/:id', validate(updateNoteSchema), noteController.update);
router.delete('/:id', noteController.remove);

export default router;
