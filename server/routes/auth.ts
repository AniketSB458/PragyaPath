import { Router } from 'express';
import { dbService } from '../models/index.js';

const router = Router();

// GET /api/auth/profile?email=...
router.get('/profile', async (req, res) => {
  try {
    const email = (req.query.email as string) || 'anyabandgar458@gmail.com';
    const user = await dbService.users.findOne(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ user });
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// POST /api/auth/profile
router.post('/profile', async (req, res) => {
  try {
    const { email, _id, id, __v, createdAt, updatedAt, ...updates } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const updatedUser = await dbService.users.upsert(email, updates);
    return res.json({ success: true, user: updatedUser });
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// GET /api/auth/users
router.get('/users', async (_req, res) => {
  try {
    const users = await dbService.users.list();
    return res.json({ users, total: users.length });
  } catch (error: any) {
    console.error('Error listing users:', error);
    return res.status(500).json({ error: 'Failed to list users' });
  }
});

export default router;
