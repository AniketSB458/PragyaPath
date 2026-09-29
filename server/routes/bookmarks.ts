import { Router } from 'express';
import { dbService } from '../models/index.js';

const router = Router();

// GET /api/bookmarks?userId=...
router.get('/', async (req, res) => {
  try {
    const userId = (req.query.userId as string) || 'anyabandgar458@gmail.com';
    const bookmarks = await dbService.bookmarks.list(userId);
    return res.json({ bookmarks });
  } catch (error: any) {
    console.error('Error fetching bookmarks:', error);
    return res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

// POST /api/bookmarks
router.post('/', async (req, res) => {
  try {
    const { userId = 'anyabandgar458@gmail.com', resourceId, title, platform, linkUrl, resourceData } = req.body;
    if (!resourceId || !title || !linkUrl) {
      return res.status(400).json({ error: 'resourceId, title, and linkUrl are required' });
    }

    const bookmark = await dbService.bookmarks.create({
      userId,
      resourceId,
      title,
      platform: platform || 'Curated Resource',
      linkUrl,
      resourceData: resourceData || null,
    });

    return res.status(201).json({ success: true, bookmark });
  } catch (error: any) {
    console.error('Error saving bookmark:', error);
    return res.status(500).json({ error: 'Failed to save bookmark' });
  }
});

// DELETE /api/bookmarks/:resourceId?userId=...
router.delete('/:resourceId', async (req, res) => {
  try {
    const { resourceId } = req.params;
    const userId = (req.query.userId as string) || 'anyabandgar458@gmail.com';
    const deleted = await dbService.bookmarks.delete(userId, resourceId);
    return res.json({ success: true, deleted });
  } catch (error: any) {
    console.error('Error deleting bookmark:', error);
    return res.status(500).json({ error: 'Failed to delete bookmark' });
  }
});

export default router;
