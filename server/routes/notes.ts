import { Router } from 'express';
import { dbService } from '../models/index.js';

const router = Router();

// GET /api/notes?userId=...
router.get('/', async (req, res) => {
  try {
    const userId = (req.query.userId as string) || 'anyabandgar458@gmail.com';
    const notes = await dbService.notes.list(userId);
    return res.json({ notes });
  } catch (error: any) {
    console.error('Error fetching notes:', error);
    return res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// POST /api/notes
router.post('/', async (req, res) => {
  try {
    const { userId = 'anyabandgar458@gmail.com', topic, content } = req.body;
    if (!topic || !content) {
      return res.status(400).json({ error: 'Topic and content are required' });
    }

    const note = await dbService.notes.create({
      userId,
      topic,
      content,
    });

    return res.status(201).json({ success: true, note });
  } catch (error: any) {
    console.error('Error creating note:', error);
    return res.status(500).json({ error: 'Failed to create note' });
  }
});

// DELETE /api/notes/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await dbService.notes.delete(id);
    return res.json({ success: true, deleted });
  } catch (error: any) {
    console.error('Error deleting note:', error);
    return res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;
