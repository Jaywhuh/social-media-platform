import { Router } from 'express'
import { findUserById, updateUser, followUser, unfollowUser } from '../data/users.js'
import { getPostsByUserId } from '../data/posts.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// GET /api/users/:id — return user profile (no password)
router.get('/:id', (req, res, next) => {
  try {
    const user = findUserById(req.params.id)
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    const { password, ...safeUser } = user
    res.status(200).json(safeUser)

  } catch (err) {
    next(err)
  }
})

// PUT /api/users/:id — update username or bio
router.put('/:id', protect, (req, res, next) => {
  try {
    const { username, bio } = req.body

    if (!username && bio === undefined) {
      res.status(400)
      throw new Error('Provide at least a username or bio to update')
    }

    if (username && username.trim().length < 3) {
      res.status(400)
      throw new Error('Username must be at least 3 characters')
    }

    const updates = {}
    if (username) updates.username = username.trim()
    if (bio !== undefined) updates.bio = bio

    const updated = updateUser(req.params.id, updates)
    if (!updated) {
      res.status(404)
      throw new Error('User not found')
    }

    const { password, ...safeUser } = updated
    res.status(200).json(safeUser)

  } catch (err) {
    next(err)
  }
})

// GET /api/users/:id/posts — return all posts by this user
router.get('/:id/posts', (req, res, next) => {
  try {
    const user = findUserById(req.params.id)
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    const posts = getPostsByUserId(req.params.id)
    res.status(200).json(posts)

  } catch (err) {
    next(err)
  }
})

// POST /api/users/:id/follow
router.post('/:id/follow', protect, (req, res, next) => {
  try {
    const { followerId } = req.body

    if (!followerId) {
      res.status(400)
      throw new Error('followerId is required')
    }

    if (followerId === req.params.id) {
      res.status(400)
      throw new Error('You cannot follow yourself')
    }

    const result = followUser(req.params.id, followerId)

    if (!result) {
      res.status(404)
      throw new Error('User not found')
    }

    if (result.alreadyFollowing) {
      res.status(400)
      throw new Error('You are already following this user')
    }

    res.status(200).json({ message: 'Followed successfully' })

  } catch (err) {
    next(err)
  }
})

// POST /api/users/:id/unfollow
router.post('/:id/unfollow', protect, (req, res, next) => {
  try {
    const { followerId } = req.body

    if (!followerId) {
      res.status(400)
      throw new Error('followerId is required')
    }

    const result = unfollowUser(req.params.id, followerId)

    if (!result) {
      res.status(404)
      throw new Error('User not found')
    }

    res.status(200).json({ message: 'Unfollowed successfully' })

  } catch (err) {
    next(err)
  }
})

export default router