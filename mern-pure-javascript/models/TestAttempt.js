import mongoose from 'mongoose';

const TestAttemptSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    testId: { type: String, required: true },
    testTitle: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    accuracyPercentage: { type: Number, required: true },
    timeSpentSeconds: { type: Number, default: 0 },
    weakTopicsIdentified: { type: [String], default: [] },
    completedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const TestAttempt = mongoose.models.TestAttempt || mongoose.model('TestAttempt', TestAttemptSchema);
export default TestAttempt;
