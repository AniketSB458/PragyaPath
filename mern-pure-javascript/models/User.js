import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    educationStage: { type: String, default: 'ug_general' },
    degreeOrStream: { type: String, default: 'Bachelor Degree (Final Year / Graduate)' },
    currentYear: { type: String, default: 'Final Year' },
    targetGoal: { type: String, default: 'National & State Competitive Exams' },
    targetExamId: { type: String, default: 'upsc_cse' },
    targetYear: { type: String, default: '2026' },
    dailyHours: { type: Number, default: 4 },
    language: { type: String, default: 'en' },
    weakTopics: { type: [String], default: [] },
    strongTopics: { type: [String], default: [] },
    completedTopicIds: { type: [String], default: [] },
    bookmarkedResourceIds: { type: [String], default: [] },
    bookmarkedQuestionIds: { type: [String], default: [] },
    streakDays: { type: Number, default: 1 },
    totalStudyMinutes: { type: Number, default: 0 },
    questionsSolved: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    lastActiveDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
