import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 5000
export const JWT_SECRET = process.env.JWT_SECRET
export const NODE_ENV = process.env.NODE_ENV || 'development'

// Safety check — crash early if critical secrets are missing
if (!JWT_SECRET) {
  console.error('FATAL: JWT_SECRET is not defined in .env')
  process.exit(1)
}