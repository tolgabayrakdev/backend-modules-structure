import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UnauthorizedError } from '../utils/errors.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new UnauthorizedError());
  }

  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, env.jwt.secret);
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired token'));
  }
};
