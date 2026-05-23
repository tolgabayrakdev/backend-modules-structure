import { Router } from 'express';
import { reportController } from '../../container.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/sales', reportController.getSalesReport);
router.get('/users', reportController.getUsersReport);
router.get('/products', reportController.getProductsReport);
router.get('/revenue', reportController.getRevenueReport);

export default router;
