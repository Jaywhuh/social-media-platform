import { NODE_ENV } from '../config/env.js';

export function notFound(req, res, next) {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(err, req, res, next) {
  // CastError — invalid MongoDB ObjectId (e.g. /api/posts/abc)
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  // ValidationError — Mongoose schema validation failed
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  // Duplicate key — unique index violated (email or username already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ message: `${field} is already taken` });
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: NODE_ENV === 'production' ? null : err.stack,
  });
}