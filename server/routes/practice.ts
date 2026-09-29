import { Router } from 'express';
import { dbService } from '../models/index.js';

const router = Router();

// GET /api/practice/attempts?userId=...
router.get('/attempts', async (req, res) => {
  try {
    const userId = (req.query.userId as string) || 'anyabandgar458@gmail.com';
    const attempts = await dbService.attempts.list(userId);

    // Compute aggregate performance metrics
    const totalAttempts = attempts.length;
    let totalScore = 0;
    let totalMaxMarks = 0;
    let avgAccuracy = 0;
    const weakMap: Record<string, number> = {};
    const strongMap: Record<string, number> = {};

    attempts.forEach((a: any) => {
      totalScore += a.score || 0;
      totalMaxMarks += a.totalMarks || 0;
      avgAccuracy += a.accuracyPercent || 0;

      (a.weakAreas || []).forEach((w: string) => {
        weakMap[w] = (weakMap[w] || 0) + 1;
      });
      (a.strongAreas || []).forEach((s: string) => {
        strongMap[s] = (strongMap[s] || 0) + 1;
      });
    });

    const aggregateMetrics = {
      totalAttempts,
      averageScore: totalAttempts > 0 ? Math.round((totalScore / totalAttempts) * 10) / 10 : 0,
      averageAccuracy: totalAttempts > 0 ? Math.round(avgAccuracy / totalAttempts) : 0,
      mostFrequentWeakAreas: Object.entries(weakMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([topic, count]) => ({ topic, count })),
      mostFrequentStrongAreas: Object.entries(strongMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([topic, count]) => ({ topic, count })),
    };

    return res.json({ attempts, aggregateMetrics });
  } catch (error: any) {
    console.error('Error fetching attempts:', error);
    return res.status(500).json({ error: 'Failed to fetch test attempts' });
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
      totalMarks,
      accuracyPercent,
      timeSpentSeconds,
      correctCount,
      incorrectCount,
      unattemptedCount,
      strongAreas,
      weakAreas,
      actionRecommendation,
    } = req.body;

    if (!testId || !testTitle) {
      return res.status(400).json({ error: 'testId and testTitle are required' });
    }

    const attempt = await dbService.attempts.create({
      userId,
      testId,
      testTitle,
      score: Number(score) || 0,
      totalMarks: Number(totalMarks) || 0,
      accuracyPercent: Number(accuracyPercent) || 0,
      timeSpentSeconds: Number(timeSpentSeconds) || 0,
      correctCount: Number(correctCount) || 0,
      incorrectCount: Number(incorrectCount) || 0,
      unattemptedCount: Number(unattemptedCount) || 0,
      strongAreas: strongAreas || [],
      weakAreas: weakAreas || [],
      actionRecommendation: actionRecommendation || '',
    });

    // Also update User profile statistics in MongoDB
    try {
      const existingUser = await dbService.users.findOne(userId);
      if (existingUser) {
        const newSolved = (existingUser.questionsSolved || 0) + (correctCount || 0) + (incorrectCount || 0);
        const newCorrect = (existingUser.correctAnswers || 0) + (correctCount || 0);
        const combinedWeak = Array.from(new Set([...(existingUser.weakTopics || []), ...(weakAreas || [])]));
        const combinedStrong = Array.from(new Set([...(existingUser.strongTopics || []), ...(strongAreas || [])]));

        await dbService.users.upsert(userId, {
          questionsSolved: newSolved,
          correctAnswers: newCorrect,
          weakTopics: combinedWeak,
          strongTopics: combinedStrong,
        });
      }
    } catch (profileErr) {
      console.warn('Could not sync user profile stats with attempt:', profileErr);
    }

    return res.status(201).json({ success: true, attempt });
  } catch (error: any) {
    console.error('Error saving practice attempt:', error);
    return res.status(500).json({ error: 'Failed to record test attempt' });
  }
});

export default router;
