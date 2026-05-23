import { Router } from 'express';
import { authController } from '../../container.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { registerSchema, loginSchema, refreshTokenSchema } from './auth.schema.js';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', validate(refreshTokenSchema), authController.refreshToken);

export default router;
