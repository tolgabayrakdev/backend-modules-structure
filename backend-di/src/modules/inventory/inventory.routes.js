import { Router } from 'express';
import { inventoryController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { updateStockSchema } from './inventory.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', inventoryController.getAll);
router.get('/low-stock', inventoryController.getLowStock);
router.get('/product/:productId', inventoryController.getByProduct);
router.get('/product/:productId/history', inventoryController.getHistory);
router.get('/:id', inventoryController.getById);
router.patch('/product/:productId/stock', validate(updateStockSchema), inventoryController.updateStock);

export default router;
