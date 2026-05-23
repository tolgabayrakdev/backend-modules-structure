import db from './config/db.js';

import { AuthRepository } from './modules/auth/auth.repository.js';
import { AuthService } from './modules/auth/auth.service.js';
import { AuthController } from './modules/auth/auth.controller.js';

import { UserRepository } from './modules/user/user.repository.js';
import { UserService } from './modules/user/user.service.js';
import { UserController } from './modules/user/user.controller.js';

import { ProductRepository } from './modules/product/product.repository.js';
import { ProductService } from './modules/product/product.service.js';
import { ProductController } from './modules/product/product.controller.js';

import { CategoryRepository } from './modules/category/category.repository.js';
import { CategoryService } from './modules/category/category.service.js';
import { CategoryController } from './modules/category/category.controller.js';

import { OrderRepository } from './modules/order/order.repository.js';
import { OrderService } from './modules/order/order.service.js';
import { OrderController } from './modules/order/order.controller.js';

import { OrderItemRepository } from './modules/order-item/order-item.repository.js';
import { OrderItemService } from './modules/order-item/order-item.service.js';
import { OrderItemController } from './modules/order-item/order-item.controller.js';

import { PaymentRepository } from './modules/payment/payment.repository.js';
import { PaymentService } from './modules/payment/payment.service.js';
import { PaymentController } from './modules/payment/payment.controller.js';

import { ReviewRepository } from './modules/review/review.repository.js';
import { ReviewService } from './modules/review/review.service.js';
import { ReviewController } from './modules/review/review.controller.js';

import { CartRepository } from './modules/cart/cart.repository.js';
import { CartService } from './modules/cart/cart.service.js';
import { CartController } from './modules/cart/cart.controller.js';

import { CartItemRepository } from './modules/cart-item/cart-item.repository.js';
import { CartItemService } from './modules/cart-item/cart-item.service.js';
import { CartItemController } from './modules/cart-item/cart-item.controller.js';

import { NotificationRepository } from './modules/notification/notification.repository.js';
import { NotificationService } from './modules/notification/notification.service.js';
import { NotificationController } from './modules/notification/notification.controller.js';

import { AddressRepository } from './modules/address/address.repository.js';
import { AddressService } from './modules/address/address.service.js';
import { AddressController } from './modules/address/address.controller.js';

import { CouponRepository } from './modules/coupon/coupon.repository.js';
import { CouponService } from './modules/coupon/coupon.service.js';
import { CouponController } from './modules/coupon/coupon.controller.js';

import { InventoryRepository } from './modules/inventory/inventory.repository.js';
import { InventoryService } from './modules/inventory/inventory.service.js';
import { InventoryController } from './modules/inventory/inventory.controller.js';

import { ReportRepository } from './modules/report/report.repository.js';
import { ReportService } from './modules/report/report.service.js';
import { ReportController } from './modules/report/report.controller.js';

// Repositories
const authRepository = new AuthRepository(db);
const userRepository = new UserRepository(db);
const productRepository = new ProductRepository(db);
const categoryRepository = new CategoryRepository(db);
const orderRepository = new OrderRepository(db);
const orderItemRepository = new OrderItemRepository(db);
const paymentRepository = new PaymentRepository(db);
const reviewRepository = new ReviewRepository(db);
const cartRepository = new CartRepository(db);
const cartItemRepository = new CartItemRepository(db);
const notificationRepository = new NotificationRepository(db);
const addressRepository = new AddressRepository(db);
const couponRepository = new CouponRepository(db);
const inventoryRepository = new InventoryRepository(db);
const reportRepository = new ReportRepository(db);

// Services
const authService = new AuthService(authRepository);
const userService = new UserService(userRepository);
const productService = new ProductService(productRepository);
const categoryService = new CategoryService(categoryRepository);
const orderService = new OrderService(orderRepository);
const orderItemService = new OrderItemService(orderItemRepository);
const paymentService = new PaymentService(paymentRepository);
const reviewService = new ReviewService(reviewRepository);
const cartService = new CartService(cartRepository);
const cartItemService = new CartItemService(cartItemRepository);
const notificationService = new NotificationService(notificationRepository);
const addressService = new AddressService(addressRepository);
const couponService = new CouponService(couponRepository);
const inventoryService = new InventoryService(inventoryRepository);
const reportService = new ReportService(reportRepository);

// Controllers
export const authController = new AuthController(authService);
export const userController = new UserController(userService);
export const productController = new ProductController(productService);
export const categoryController = new CategoryController(categoryService);
export const orderController = new OrderController(orderService);
export const orderItemController = new OrderItemController(orderItemService);
export const paymentController = new PaymentController(paymentService);
export const reviewController = new ReviewController(reviewService);
export const cartController = new CartController(cartService);
export const cartItemController = new CartItemController(cartItemService);
export const notificationController = new NotificationController(notificationService);
export const addressController = new AddressController(addressService);
export const couponController = new CouponController(couponService);
export const inventoryController = new InventoryController(inventoryService);
export const reportController = new ReportController(reportService);
