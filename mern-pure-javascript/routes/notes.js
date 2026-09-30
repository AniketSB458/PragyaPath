import express from 'express';
import PersonalNote from '../models/PersonalNote.js';

const router = express.Router();

// GET /api/notes?userId=...
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'anyabandgar458@gmail.com';
    const notes = await PersonalNote.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, notes });
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/notes
router.post('/', async (req, res) => {
  try {
    const { userId = 'anyabandgar458@gmail.com', topic, content } = req.body;
    if (!topic || !content) {
      return res.status(400).json({ success: false, error: 'Topic and content are required' });
    }

    const note = await PersonalNote.create({ userId, topic, content });
    res.status(201).json({ success: true, note });
  } catch (error) {
    console.error('Error creating note:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/notes/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await PersonalNote.findByIdAndDelete(id);
    res.json({ success: true, message: 'Note deleted' });
  } catch (error) {
    console.error('Error deleting note:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
