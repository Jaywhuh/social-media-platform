import { Router } from 'express'

const router = Router()

// GET /api/users/:id
router.get('/:id', (req, res) => {
  res.json({ message: `get user ${req.params.id} works` })
})

// PUT /api/users/:id
router.put('/:id', (req, res) => {
  res.json({ message: `update user ${req.params.id} works` })
})

// GET /api/users/:id/posts
router.get('/:id/posts', (req, res) => {
  res.json({ message: `get posts for user ${req.params.id} works` })
})

// POST /api/users/:id/follow
router.post('/:id/follow', (req, res) => {
  res.json({ message: `follow user ${req.params.id} works` })
})

// POST /api/users/:id/unfollow
router.post('/:id/unfollow', (req, res) => {
  res.json({ message: `unfollow user ${req.params.id} works` })
})

export default router