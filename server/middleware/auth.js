import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'

export function protect(req, res, next) {
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401)
    return next(new Error('Not authorized, no token provided'))
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401)
    return next(new Error('Not authorized, token is invalid or expired'))
  }
}