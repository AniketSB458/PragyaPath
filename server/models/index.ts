import mongoose, { Schema, Document } from 'mongoose';
import { embeddedDb } from '../db/index.js';

/* -------------------------------------------------------------
 * 1. User Model & Schema
 * ------------------------------------------------------------- */
export interface IUser extends Document {
  name: string;
  email: string;
  educationStage: string;
  degreeOrStream: string;
  currentYear: string;
  targetGoal: string;
  targetExamId?: string;
  targetYear: string;
  dailyHours: number;
  language: string;
  weakTopics: string[];
  strongTopics: string[];
  completedTopicIds: string[];
  bookmarkedResourceIds: string[];
  bookmarkedQuestionIds: string[];
  streakDays: number;
  totalStudyMinutes: number;
  questionsSolved: number;
  correctAnswers: number;
  lastActiveDate: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    educationStage: { type: String, default: 'ug_general' },
    degreeOrStream: { type: String, default: 'Bachelor Degree' },
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
    lastActiveDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

/* -------------------------------------------------------------
 * 2. Study Session (Daily Planner) Model & Schema
 * ------------------------------------------------------------- */
export interface IStudySession extends Document {
  userId: string;
  title: string;
  subject: string;
  topic: string;
  durationMinutes: number;
  sessionType: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
  updatedAt: Date;
}

const StudySessionSchema = new Schema<IStudySession>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    durationMinutes: { type: Number, default: 30 },
    sessionType: { type: String, default: 'Concept & Theory' },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  },
  { timestamps: true }
);

export const StudySessionModel =
  mongoose.models.StudySession || mongoose.model<IStudySession>('StudySession', StudySessionSchema);

/* -------------------------------------------------------------
 * 3. Personal Notes Model & Schema
 * ------------------------------------------------------------- */
export interface IPersonalNote extends Document {
  userId: string;
  topic: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const PersonalNoteSchema = new Schema<IPersonalNote>(
  {
    userId: { type: String, required: true, index: true },
    topic: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const PersonalNoteModel =
  mongoose.models.PersonalNote || mongoose.model<IPersonalNote>('PersonalNote', PersonalNoteSchema);

/* -------------------------------------------------------------
 * 4. Test Attempt Model & Schema
 * ------------------------------------------------------------- */
export interface ITestAttempt extends Document {
  userId: string;
  testId: string;
  testTitle: string;
  score: number;
  totalMarks: number;
  accuracyPercent: number;
  timeSpentSeconds: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  strongAreas: string[];
  weakAreas: string[];
  actionRecommendation: string;
  createdAt: Date;
}

const TestAttemptSchema = new Schema<ITestAttempt>(
  {
    userId: { type: String, required: true, index: true },
    testId: { type: String, required: true },
    testTitle: { type: String, required: true },
    score: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    accuracyPercent: { type: Number, required: true },
    timeSpentSeconds: { type: Number, required: true },
    correctCount: { type: Number, required: true },
    incorrectCount: { type: Number, required: true },
    unattemptedCount: { type: Number, required: true },
    strongAreas: { type: [String], default: [] },
    weakAreas: { type: [String], default: [] },
    actionRecommendation: { type: String, default: '' },
  },
  { timestamps: true }
);

export const TestAttemptModel =
  mongoose.models.TestAttempt || mongoose.model<ITestAttempt>('TestAttempt', TestAttemptSchema);

/* -------------------------------------------------------------
 * 5. Saved Resource / Bookmark Model & Schema
 * ------------------------------------------------------------- */
export interface ISavedResource extends Document {
  userId: string;
  resourceId: string;
  title: string;
  platform: string;
  instructorOrEntity?: string;
  subject?: string;
  topic?: string;
  format?: string;
  linkUrl: string;
  rating?: number;
  resourceData?: any;
  createdAt: Date;
}

const SavedResourceSchema = new Schema<ISavedResource>(
  {
    userId: { type: String, required: true, index: true },
    resourceId: { type: String, required: true },
    title: { type: String, required: true },
    platform: { type: String, default: 'Curated' },
    instructorOrEntity: { type: String },
    subject: { type: String },
    topic: { type: String },
    format: { type: String },
    linkUrl: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    resourceData: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const SavedResourceModel =
  mongoose.models.SavedResource || mongoose.model<ISavedResource>('SavedResource', SavedResourceSchema);

/* -------------------------------------------------------------
 * Unified Database Access Layer (Dual Mongoose / Embedded Mongo)
 * ------------------------------------------------------------- */
export const dbService = {
  // Users
  users: {
    async findOne(email: string) {
      if (mongoose.connection.readyState === 1) {
        return await UserModel.findOne({ email }).lean();
      }
      return await embeddedDb.users.findOne({ email });
    },
    async upsert(email: string, data: any) {
      const { _id, id, __v, createdAt, updatedAt, ...cleanData } = data || {};
      if (mongoose.connection.readyState === 1) {
        return await UserModel.findOneAndUpdate(
          { email },
          { $set: cleanData },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        ).lean();
      }
      const existing = await embeddedDb.users.findOne({ email });
      if (existing) {
        return await embeddedDb.users.updateOne({ email }, cleanData);
      }
      return await embeddedDb.users.create({ _id: _id || 'user_anya_default', email, ...cleanData });
    },
    async list() {
      if (mongoose.connection.readyState === 1) {
        return await UserModel.find().limit(50).lean();
      }
      return await embeddedDb.users.find({});
    },
  },

  // Sessions
  sessions: {
    async list(userId: string) {
      if (mongoose.connection.readyState === 1) {
        return await StudySessionModel.find({ userId }).sort({ createdAt: -1 }).lean();
      }
      return await embeddedDb.studySessions.find({ userId });
    },
    async create(doc: any) {
      if (mongoose.connection.readyState === 1) {
        const item = new StudySessionModel(doc);
        return await item.save();
      }
      return await embeddedDb.studySessions.create(doc);
    },
    async update(id: string, updates: any) {
      const { _id, id: sid, __v, createdAt, updatedAt, ...cleanUpdates } = updates || {};
      if (mongoose.connection.readyState === 1) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          return await StudySessionModel.findByIdAndUpdate(id, { $set: cleanUpdates }, { new: true }).lean();
        }
        return await StudySessionModel.findOneAndUpdate({ id }, { $set: cleanUpdates }, { new: true }).lean();
      }
      const filter = id.startsWith('doc_') ? { _id: id } : { id };
      return await embeddedDb.studySessions.updateOne(filter, cleanUpdates);
    },
    async delete(id: string) {
      if (mongoose.connection.readyState === 1) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          return await StudySessionModel.findByIdAndDelete(id);
        }
        return await StudySessionModel.findOneAndDelete({ id });
      }
      const filter = id.startsWith('doc_') ? { _id: id } : { id };
      return await embeddedDb.studySessions.deleteOne(filter);
    },
  },

  // Notes
  notes: {
    async list(userId: string) {
      if (mongoose.connection.readyState === 1) {
        return await PersonalNoteModel.find({ userId }).sort({ createdAt: -1 }).lean();
      }
      return await embeddedDb.personalNotes.find({ userId });
    },
    async create(doc: any) {
      if (mongoose.connection.readyState === 1) {
        const item = new PersonalNoteModel(doc);
        return await item.save();
      }
      return await embeddedDb.personalNotes.create(doc);
    },
    async delete(id: string) {
      if (mongoose.connection.readyState === 1) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          return await PersonalNoteModel.findByIdAndDelete(id);
        }
        return await PersonalNoteModel.findOneAndDelete({ $or: [{ _id: id }, { id }] });
      }
      const filter = id.startsWith('doc_') ? { _id: id } : { id };
      return await embeddedDb.personalNotes.deleteOne(filter);
    },
  },

  // Test Attempts
  attempts: {
    async list(userId: string) {
      if (mongoose.connection.readyState === 1) {
        return await TestAttemptModel.find({ userId }).sort({ createdAt: -1 }).lean();
      }
      return await embeddedDb.testAttempts.find({ userId });
    },
    async create(doc: any) {
      if (mongoose.connection.readyState === 1) {
        const item = new TestAttemptModel(doc);
        return await item.save();
      }
      return await embeddedDb.testAttempts.create(doc);
    },
  },

  // Saved Resources / Bookmarks
  bookmarks: {
    async list(userId: string) {
      if (mongoose.connection.readyState === 1) {
        return await SavedResourceModel.find({ userId }).sort({ createdAt: -1 }).lean();
      }
      return await embeddedDb.savedResources.find({ userId });
    },
    async create(doc: any) {
      if (mongoose.connection.readyState === 1) {
        const item = new SavedResourceModel(doc);
        return await item.save();
      }
      return await embeddedDb.savedResources.create(doc);
    },
    async delete(userId: string, resourceId: string) {
      if (mongoose.connection.readyState === 1) {
        return await SavedResourceModel.findOneAndDelete({ userId, resourceId });
      }
      return await embeddedDb.savedResources.deleteOne({ userId, resourceId });
    },
  },
};
