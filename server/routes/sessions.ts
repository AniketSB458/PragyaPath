import { Router } from 'express';
import { dbService } from '../models/index.js';

const router = Router();

// GET /api/sessions?userId=...
router.get('/', async (req, res) => {
  try {
    const userId = (req.query.userId as string) || 'anyabandgar458@gmail.com';
    const sessions = await dbService.sessions.list(userId);
    return res.json({ sessions });
  } catch (error: any) {
    console.error('Error fetching sessions:', error);
    return res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// POST /api/sessions
router.post('/', async (req, res) => {
  try {
    const { userId = 'anyabandgar458@gmail.com', title, subject, topic, durationMinutes, sessionType, priority } =
      req.body;
    if (!title || !subject || !topic) {
      return res.status(400).json({ error: 'Title, subject, and topic are required' });
    }

    const newSession = await dbService.sessions.create({
      userId,
      title,
      subject,
      topic,
      durationMinutes: durationMinutes || 30,
      sessionType: sessionType || 'Concept & Theory',
      priority: priority || 'medium',
      completed: false,
    });

    return res.status(201).json({ success: true, session: newSession });
  } catch (error: any) {
    console.error('Error creating session:', error);
    return res.status(500).json({ error: 'Failed to create session' });
  }
});

// PUT /api/sessions/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await dbService.sessions.update(id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Session not found' });
    }
    return res.json({ success: true, session: updated });
  } catch (error: any) {
    console.error('Error updating session:', error);
    return res.status(500).json({ error: 'Failed to update session' });
  }
});

// DELETE /api/sessions/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await dbService.sessions.delete(id);
    return res.json({ success: true, deleted });
  } catch (error: any) {
    console.error('Error deleting session:', error);
    return res.status(500).json({ error: 'Failed to delete session' });
  }
});

export default router;
