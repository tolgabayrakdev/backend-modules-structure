import { userRepository } from './user.repository.js';
import { NotFoundError, ConflictError } from '../../utils/errors.js';
import { hashPassword } from '../../utils/hash.js';

const sanitize = ({ password, ...user }) => user;

export const userService = {
  getAll: async () => {
    const users = await userRepository.findAll();
    return users.map(sanitize);
  },

  getById: async (id) => {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return sanitize(user);
  },

  create: async (data) => {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new ConflictError('Email already in use');
    const hashed = await hashPassword(data.password);
    const user = await userRepository.create({ ...data, password: hashed });
    return sanitize(user);
  },

  update: async (id, data) => {
    await userService.getById(id);
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    const user = await userRepository.update(id, data);
    return sanitize(user);
  },

  remove: async (id) => {
    await userService.getById(id);
    return userRepository.remove(id);
  },

};
