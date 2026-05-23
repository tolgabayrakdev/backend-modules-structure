import express from 'express';
import { errorHandler } from './middlewares/error.middleware.js';

import authRouter from './modules/auth/auth.routes.js';
import userRouter from './modules/user/user.routes.js';
import productRouter from './modules/product/product.routes.js';
import categoryRouter from './modules/category/category.routes.js';
import orderRouter from './modules/order/order.routes.js';
import orderItemRouter from './modules/order-item/order-item.routes.js';
import paymentRouter from './modules/payment/payment.routes.js';
import reviewRouter from './modules/review/review.routes.js';
import cartRouter from './modules/cart/cart.routes.js';
import cartItemRouter from './modules/cart-item/cart-item.routes.js';
import notificationRouter from './modules/notification/notification.routes.js';
import addressRouter from './modules/address/address.routes.js';
import couponRouter from './modules/coupon/coupon.routes.js';
import inventoryRouter from './modules/inventory/inventory.routes.js';
import reportRouter from './modules/report/report.routes.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/order-items', orderItemRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/carts', cartRouter);
app.use('/api/cart-items', cartItemRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/addresses', addressRouter);
app.use('/api/coupons', couponRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/reports', reportRouter);

app.use(errorHandler);

export default app;
