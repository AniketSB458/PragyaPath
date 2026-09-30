import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET /api/auth/profile?email=...
router.get('/profile', async (req, res) => {
  try {
    const email = req.query.email || 'anyabandgar458@gmail.com';
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: 'Anya Bandgar',
        targetGoal: 'National & State Competitive Exams',
        targetExamId: 'upsc_cse',
        degreeOrStream: 'Bachelor Degree (Final Year / Graduate)',
        dailyHours: 4,
        language: 'en'
      });
    }

    res.json({ success: true, profile: user });
  } catch (error) {
    console.error('Error in /api/auth/profile:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/auth/profile
router.post('/profile', async (req, res) => {
  try {
    const { email, _id, id, __v, createdAt, updatedAt, ...updates } = req.body;
    const targetEmail = email || 'anyabandgar458@gmail.com';

    const user = await User.findOneAndUpdate(
      { email: targetEmail },
      { $set: updates },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, profile: user });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
