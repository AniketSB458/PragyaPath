import express from 'express';
import TestAttempt from '../models/TestAttempt.js';

const router = express.Router();

// GET /api/practice/attempts?userId=...
router.get('/attempts', async (req, res) => {
  try {
    const userId = req.query.userId || 'anyabandgar458@gmail.com';
    const attempts = await TestAttempt.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, attempts });
  } catch (error) {
    console.error('Error fetching attempts:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/practice/attempts
router.post('/attempts', async (req, res) => {
  try {
    const {
      userId = 'anyabandgar458@gmail.com',
      testId,
      testTitle,
      score,
      totalQuestions,
      accuracyPercentage,
      timeSpentSeconds = 0,
      weakTopicsIdentified = []
    } = req.body;

    const attempt = await TestAttempt.create({
      userId,
      testId,
      testTitle,
      score,
      totalQuestions,
      accuracyPercentage,
      timeSpentSeconds,
      weakTopicsIdentified
    });

    res.status(201).json({ success: true, attempt });
  } catch (error) {
    console.error('Error recording test attempt:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
