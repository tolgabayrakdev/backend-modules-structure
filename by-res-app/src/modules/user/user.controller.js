import { userService } from './user.service.js';
import { sendSuccess, sendError } from '../../utils/response.js';

export const userController = {
  getAll: async (req, res, next) => {
    try {
      const users = await userService.getAll();
      sendSuccess(res, users);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const user = await userService.getById(Number(req.params.id));
      sendSuccess(res, user);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const user = await userService.create(req.body);
      sendSuccess(res, user, 201);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const user = await userService.update(Number(req.params.id), req.body);
      sendSuccess(res, user);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      await userService.remove(Number(req.params.id));
      sendSuccess(res, { message: 'User deleted' });
    } catch (err) {
      next(err);
    }
  },
};
