import mongoose from 'mongoose';

const StudySessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    durationMinutes: { type: Number, default: 30 },
    sessionType: {
      type: String,
      enum: ['Concept & Theory', 'PYQ Practice', 'Weak Topic Revision', 'Adaptive Quiz', 'Mock Test'],
      default: 'Concept & Theory'
    },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    reminderTime: { type: String, default: '' }, // e.g. "09:00"
    reminderEnabled: { type: Boolean, default: false },
    lastNotifiedDate: { type: String, default: '' }
  },
  { timestamps: true }
);

const StudySession = mongoose.models.StudySession || mongoose.model('StudySession', StudySessionSchema);
export default StudySession;
