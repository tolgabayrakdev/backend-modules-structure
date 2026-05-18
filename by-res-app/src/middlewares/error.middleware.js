import { AppError } from '../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ success: false, message: err.message });
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(500).json({ success: false, message: 'Internal Server Error' });
};
