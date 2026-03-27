import express from 'express'
import cors from 'cors'
import { PORT } from './config/env.js'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()

// --- Middleware ---
// Parse incoming JSON request bodies
app.use(express.json())
// Allow requests from the React frontend
app.use(cors({ origin: 'http://localhost:5173' }))

// --- Routes ---
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

// --- Error Handling ---
app.use(notFound)
app.use(errorHandler)

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})