import { Router } from 'express';
import {
  getAllPosts,
  findPostById,
  createPost,
  updatePost,
  deletePost,
} from '../data/posts.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// GET /api/posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// POST /api/posts
router.post('/', protect, async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400);
      throw new Error('content is required');
    }

    if (content.trim().length === 0) {
      res.status(400);
      throw new Error('Post content cannot be empty');
    }

    const newPost = await createPost(content.trim(), req.user.id);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res, next) => {
  try {
    const post = await findPostById(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

// PUT /api/posts/:id
router.put('/:id', protect, async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      res.status(400);
      throw new Error('Content is required');
    }

    const updated = await updatePost(req.params.id, content.trim());
    if (!updated) {
      res.status(404);
      throw new Error('Post not found');
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/posts/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const deleted = await deletePost(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error('Post not found');
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;