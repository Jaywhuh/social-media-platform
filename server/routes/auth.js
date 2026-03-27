import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { SALT_ROUNDS } from '../config/bcrypt.js'
import { generateToken } from '../config/jwt.js'
import { findUserByEmail, createUser } from '../data/users.js'

const router = Router()

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    // --- Input Validation ---
    if (!username || !email || !password) {
      res.status(400)
      throw new Error('Username, email, and password are required')
    }

    if (username.trim().length < 3) {
      res.status(400)
      throw new Error('Username must be at least 3 characters')
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      res.status(400)
      throw new Error('Please provide a valid email address')
    }

    if (password.length < 6) {
      res.status(400)
      throw new Error('Password must be at least 6 characters')
    }

    // Check if email is already registered
    const existingUser = findUserByEmail(email)
    if (existingUser) {
      res.status(409)
      throw new Error('An account with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    
    // Save user to storage
    const newUser = createUser({
      id: Date.now().toString(),
      username: username.trim(),
      email,
      password: hashedPassword
    })

    const token = generateToken(newUser)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    })


  } catch (err) {
    next(err)
  }
})

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    // --- Input Validation ---
    if (!email || !password) {
      res.status(400)
      throw new Error('Email and password are required')
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      res.status(400)
      throw new Error('Please provide a valid email address')
    }

    if (password.length < 6) {
      res.status(400)
      throw new Error('Password must be at least 6 characters')
    }

    // Look up user by email
    const user = findUserByEmail(email)
    if (!user) {
      res.status(401)
      throw new Error('Invalid email or password')
    }

    // Compare submitted password against stored hash
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      res.status(401)
      throw new Error('Invalid email or password')
    }

    const token = generateToken(user)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })

  } catch (err) {
    next(err)
  }
})

export default router