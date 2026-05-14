import { Router } from 'express';
import {
  findUserById,
  updateUser,
  followUser,
  unfollowUser,
} from '../data/users.js';
import { getPostsByUserId } from '../data/posts.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const { password, ...safeUser } = user.toObject();
    res.status(200).json(safeUser);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:id
router.put('/:id', protect, async (req, res, next) => {
  try {
    const { username, bio } = req.body;

    if (!username && bio === undefined) {
      res.status(400);
      throw new Error('Provide at least a username or bio to update');
    }

    if (username && username.trim().length < 3) {
      res.status(400);
      throw new Error('Username must be at least 3 characters');
    }

    const updates = {};
    if (username) updates.username = username.trim();
    if (bio !== undefined) updates.bio = bio;

    const updated = await updateUser(req.params.id, updates);
    if (!updated) {
      res.status(404);
      throw new Error('User not found');
    }

    const { password, ...safeUser } = updated.toObject();
    res.status(200).json(safeUser);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id/posts
router.get('/:id/posts', async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const posts = await getPostsByUserId(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// POST /api/users/:id/follow
router.post('/:id/follow', protect, async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const followerId = req.user.id;

    if (followerId === targetId) {
      res.status(400);
      throw new Error('You cannot follow yourself');
    }

    await followUser(targetId, followerId);
    res.status(200).json({ message: 'Followed successfully' });
  } catch (err) {
    next(err);
  }
});

// POST /api/users/:id/unfollow
router.post('/:id/unfollow', protect, async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const followerId = req.user.id;

    await unfollowUser(targetId, followerId);
    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;