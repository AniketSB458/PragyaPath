import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'mongodb_store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export type DbEngineType = 'mongoose' | 'embedded_mongo';

interface DbState {
  engine: DbEngineType;
  isConnected: boolean;
  connectionUri: string;
  error?: string;
}

export const dbState: DbState = {
  engine: 'embedded_mongo',
  isConnected: false,
  connectionUri: '',
};

// Embedded document database interface mimicking MongoDB collections
class EmbeddedCollection<T extends { _id?: string; id?: string }> {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  private loadAll(): T[] {
    try {
      if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({}), 'utf-8');
      }
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(raw || '{}');
      return Array.isArray(data[this.name]) ? data[this.name] : [];
    } catch (e) {
      console.error(`Error loading collection ${this.name}:`, e);
      return [];
    }
  }

  private saveAll(items: T[]) {
    try {
      let data: Record<string, any> = {};
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        data = JSON.parse(raw || '{}');
      }
      data[this.name] = items;
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error(`Error saving collection ${this.name}:`, e);
    }
  }

  async find(filter: Partial<T> = {}): Promise<T[]> {
    const items = this.loadAll();
    const filterKeys = Object.keys(filter) as (keyof T)[];
    if (filterKeys.length === 0) return items;
    return items.filter((item) =>
      filterKeys.every((key) => filter[key] === undefined || (item as any)[key] === filter[key])
    );
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    const results = await this.find(filter);
    return results[0] || null;
  }

  async create(doc: T): Promise<T> {
    const items = this.loadAll();
    const newDoc = {
      ...doc,
      _id: doc._id || doc.id || `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: (doc as any).createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    items.unshift(newDoc as T);
    this.saveAll(items);
    return newDoc as T;
  }

  async updateOne(filter: Partial<T>, update: Partial<T>): Promise<T | null> {
    const items = this.loadAll();
    const filterKeys = Object.keys(filter) as (keyof T)[];
    const index = items.findIndex((item) =>
      filterKeys.every((key) => filter[key] === undefined || (item as any)[key] === filter[key])
    );
    if (index === -1) return null;
    const updated = {
      ...items[index],
      ...update,
      updatedAt: new Date().toISOString(),
    };
    items[index] = updated;
    this.saveAll(items);
    return updated;
  }

  async deleteOne(filter: Partial<T>): Promise<boolean> {
    const items = this.loadAll();
    const filterKeys = Object.keys(filter) as (keyof T)[];
    const index = items.findIndex((item) =>
      filterKeys.every((key) => filter[key] === undefined || (item as any)[key] === filter[key])
    );
    if (index === -1) return false;
    items.splice(index, 1);
    this.saveAll(items);
    return true;
  }

  async count(filter: Partial<T> = {}): Promise<number> {
    const items = await this.find(filter);
    return items.length;
  }
}

// Embedded stores
export const embeddedDb = {
  users: new EmbeddedCollection<any>('users'),
  studySessions: new EmbeddedCollection<any>('studysessions'),
  testAttempts: new EmbeddedCollection<any>('testattempts'),
  personalNotes: new EmbeddedCollection<any>('personalnotes'),
  savedResources: new EmbeddedCollection<any>('savedresources'),
};

// Seed default data if empty
async function seedDefaultDataIfEmpty() {
  const usersCount = await embeddedDb.users.count();
  if (usersCount === 0) {
    await embeddedDb.users.create({
      _id: 'user_anya_default',
      name: 'Anya Bandgar',
      email: 'anyabandgar458@gmail.com',
      educationStage: 'ug_general',
      degreeOrStream: 'Bachelor Degree (Final Year / Graduate)',
      currentYear: 'Final Year',
      targetGoal: 'National & State Competitive Exams',
      targetExamId: 'upsc_cse',
      targetYear: '2026',
      dailyHours: 4,
      language: 'en',
      weakTopics: ['Modern Indian History (Post-1857 Act)', 'Quantitative Aptitude (Permutations)'],
      strongTopics: ['Indian Polity & Governance', 'Logical Reasoning'],
      completedTopicIds: ['top_upsc_polity_1', 'top_upsc_geog_1'],
      bookmarkedResourceIds: [],
      bookmarkedQuestionIds: [],
      streakDays: 7,
      totalStudyMinutes: 240,
      questionsSolved: 35,
      correctAnswers: 28,
      lastActiveDate: new Date().toISOString().split('T')[0],
    });
  }

  const sessionsCount = await embeddedDb.studySessions.count();
  if (sessionsCount === 0) {
    const defaultSessions = [
      {
        id: 'ds-1',
        userId: 'anyabandgar458@gmail.com',
        title: 'Indian Polity: Constitutional Articles & Fundamental Rights',
        subject: 'Indian Polity & Governance',
        topic: 'Writ Jurisdictions & Article 21 Expansion',
        durationMinutes: 60,
        sessionType: 'Concept & Theory',
        completed: true,
        priority: 'high',
      },
      {
        id: 'ds-2',
        userId: 'anyabandgar458@gmail.com',
        title: 'Quantitative Aptitude & Data Interpretation Speed Drill',
        subject: 'Quantitative Aptitude',
        topic: 'Percentages, Ratios & Bar Graph Analysis',
        durationMinutes: 45,
        sessionType: 'PYQ Practice',
        completed: false,
        priority: 'high',
      },
      {
        id: 'ds-3',
        userId: 'anyabandgar458@gmail.com',
        title: 'Modern Indian History: Freedom Movement Milestones',
        subject: 'History & Culture',
        topic: '1919 Montagu-Chelmsford & Civil Disobedience',
        durationMinutes: 30,
        sessionType: 'Weak Topic Revision',
        completed: false,
        priority: 'medium',
      },
      {
        id: 'ds-4',
        userId: 'anyabandgar458@gmail.com',
        title: 'Daily General Awareness & Logical Reasoning Quiz',
        subject: 'General Intelligence',
        topic: 'Syllogisms, Puzzles & National Schemes',
        durationMinutes: 15,
        sessionType: 'Adaptive Quiz',
        completed: false,
        priority: 'low',
      },
    ];

    for (const s of defaultSessions) {
      await embeddedDb.studySessions.create(s);
    }
  }

  const notesCount = await embeddedDb.personalNotes.count();
  if (notesCount === 0) {
    await embeddedDb.personalNotes.create({
      id: 'note-1',
      userId: 'anyabandgar458@gmail.com',
      topic: 'Fundamental Rights & Writs (Art 32 vs 226)',
      content:
        'Article 32 is itself a Fundamental Right (Supreme Court). Article 226 gives wider discretionary power to High Courts covering both FRs and ordinary legal rights.',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    });
    await embeddedDb.personalNotes.create({
      id: 'note-2',
      userId: 'anyabandgar458@gmail.com',
      topic: 'Successive Percentage Formula',
      content:
        'Net Change = a + b + (ab/100). For successive discounts d1 and d2: Net discount = d1 + d2 - (d1 * d2 / 100).',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    });
  }

  const attemptsCount = await embeddedDb.testAttempts.count();
  if (attemptsCount === 0) {
    await embeddedDb.testAttempts.create({
      id: 'attempt-init-1',
      userId: 'anyabandgar458@gmail.com',
      testId: 'mock-1',
      testTitle: 'UPSC CSE Prelims GS-1 Foundation Mock',
      score: 16.0,
      totalMarks: 20,
      accuracyPercent: 80,
      timeSpentSeconds: 780,
      correctCount: 8,
      incorrectCount: 2,
      unattemptedCount: 0,
      strongAreas: ['Indian Polity & Constitution', 'Physical Geography'],
      weakAreas: ['Modern Indian History'],
      actionRecommendation: 'Solid conceptual grip on Polity. Strengthen Modern History timeline and dates.',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    });
  }
}

// Connect to MongoDB or activate embedded engine
export async function initDatabase(): Promise<DbState> {
  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri) {
    try {
      console.log(`Connecting to MongoDB at ${mongoUri.replace(/:([^@]+)@/, ':****@')}...`);
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      dbState.engine = 'mongoose';
      dbState.isConnected = true;
      dbState.connectionUri = mongoUri;
      console.log('MongoDB (Mongoose) connected successfully!');
      return dbState;
    } catch (err: any) {
      console.warn('MongoDB connection failed. Falling back to embedded Mongo engine:', err.message);
      dbState.error = err.message;
    }
  }

  // Use embedded persistent document store
  dbState.engine = 'embedded_mongo';
  dbState.isConnected = true;
  dbState.connectionUri = 'embedded://pragyapath_mern.db';
  await seedDefaultDataIfEmpty();
  console.log('MERN Embedded MongoDB Document Store active and seeded.');
  return dbState;
}

export function getDatabaseMetrics() {
  let rawData: Record<string, any> = {};
  try {
    if (fs.existsSync(DB_FILE)) {
      rawData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8') || '{}');
    }
  } catch (e) {}

  return {
    engine: dbState.engine,
    isConnected: dbState.isConnected,
    connectionUri: dbState.connectionUri.replace(/:([^@]+)@/, ':****@'),
    collections: {
      users: (rawData.users || []).length,
      studysessions: (rawData.studysessions || []).length,
      testattempts: (rawData.testattempts || []).length,
      personalnotes: (rawData.personalnotes || []).length,
      savedresources: (rawData.savedresources || []).length,
    },
    dataFile: DB_FILE,
  };
}
