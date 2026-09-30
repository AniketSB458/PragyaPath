import express from 'express';
import StudySession from '../models/StudySession.js';

const router = express.Router();

// GET /api/sessions?userId=...
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'anyabandgar458@gmail.com';
    const sessions = await StudySession.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/sessions
router.post('/', async (req, res) => {
  try {
    const {
      userId = 'anyabandgar458@gmail.com',
      title,
      subject,
      topic,
      durationMinutes = 30,
      sessionType = 'Concept & Theory',
      priority = 'medium',
      reminderTime = '',
      reminderEnabled = false
    } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ success: false, error: 'Title and subject are required' });
    }

    const session = await StudySession.create({
      userId,
      title,
      subject,
      topic: topic || subject,
      durationMinutes,
      sessionType,
      priority,
      reminderTime,
      reminderEnabled,
      completed: false
    });

    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error('Error creating session:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/sessions/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const session = await StudySession.findByIdAndUpdate(id, { $set: updates }, { new: true });
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    res.json({ success: true, session });
  } catch (error) {
    console.error('Error updating session:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/sessions/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await StudySession.findByIdAndDelete(id);
    res.json({ success: true, message: 'Session deleted' });
  } catch (error) {
    console.error('Error deleting session:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
