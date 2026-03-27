import { Router } from 'express'
import {
  getAllPosts,
  findPostById,
  createPost,
  updatePost,
  deletePost
} from '../data/posts.js'

const router = Router()

// GET /api/posts — fetch all posts
router.get('/', (req, res) => {
  const posts = getAllPosts()
  res.status(200).json(posts)
})

// POST /api/posts — create a post
router.post('/', (req, res, next) => {
  try {
    const { content, authorId, authorUsername } = req.body

    if (!content || !authorId || !authorUsername) {
      res.status(400)
      throw new Error('content, authorId, and authorUsername are required')
    }

    if (content.trim().length === 0) {
      res.status(400)
      throw new Error('Post content cannot be empty')
    }

    const newPost = createPost({
      id: Date.now().toString(),
      author: {
        id: authorId,
        username: authorUsername
      },
      content: content.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    })

    res.status(201).json(newPost)

  } catch (err) {
    next(err)
  }
})

// GET /api/posts/:id — fetch single post
router.get('/:id', (req, res, next) => {
  try {
    const post = findPostById(req.params.id)
    if (!post) {
      res.status(404)
      throw new Error('Post not found')
    }
    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
})

// PUT /api/posts/:id — update a post
router.put('/:id', (req, res, next) => {
  try {
    const { content } = req.body

    if (!content || content.trim().length === 0) {
      res.status(400)
      throw new Error('Content is required')
    }

    const updated = updatePost(req.params.id, { content: content.trim() })
    if (!updated) {
      res.status(404)
      throw new Error('Post not found')
    }

    res.status(200).json(updated)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/posts/:id — delete a post
router.delete('/:id', (req, res, next) => {
  try {
    const deleted = deletePost(req.params.id)
    if (!deleted) {
      res.status(404)
      throw new Error('Post not found')
    }
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (err) {
    next(err)
  }
})

export default router