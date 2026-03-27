import { NODE_ENV } from '../config/env.js'

// 404 handler — runs when no route matched the request
export function notFound(req, res, next) {
  const error = new Error(`Not Found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// General error handler — runs when next(error) is called anywhere
export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500

  res.status(statusCode).json({
    message: err.message,
    stack: NODE_ENV === 'production' ? null : err.stack
  })
}