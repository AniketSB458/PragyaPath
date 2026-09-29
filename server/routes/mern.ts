import { Router } from 'express';
import { dbState, getDatabaseMetrics, embeddedDb } from '../db/index.js';
import mongoose from 'mongoose';
import {
  UserModel,
  StudySessionModel,
  TestAttemptModel,
  PersonalNoteModel,
  SavedResourceModel,
} from '../models/index.js';

const router = Router();

// GET /api/mern/status
router.get('/status', async (_req, res) => {
  try {
    const memory = process.memoryUsage();
    const metrics = getDatabaseMetrics();

    // Check counts from Mongoose if connected, else embedded
    let collectionStats = metrics.collections;
    if (mongoose.connection.readyState === 1) {
      try {
        const [users, sessions, attempts, notes, bookmarks] = await Promise.all([
          UserModel.countDocuments(),
          StudySessionModel.countDocuments(),
          TestAttemptModel.countDocuments(),
          PersonalNoteModel.countDocuments(),
          SavedResourceModel.countDocuments(),
        ]);
        collectionStats = {
          users,
          studysessions: sessions,
          testattempts: attempts,
          personalnotes: notes,
          savedresources: bookmarks,
        };
      } catch (e) {
        console.warn('Could not count mongoose documents:', e);
      }
    }

    const expressRoutes = [
      { method: 'GET / POST', path: '/api/auth/profile', description: 'User Profile & Sync' },
      { method: 'GET / POST / PUT / DELETE', path: '/api/sessions', description: 'Daily Study Planner CRUD' },
      { method: 'GET / POST / DELETE', path: '/api/notes', description: 'Personal Revision Notes CRUD' },
      { method: 'GET / POST', path: '/api/practice/attempts', description: 'Mock Tests & Attempt Analytics' },
      { method: 'GET / POST / DELETE', path: '/api/bookmarks', description: 'Saved Educational Resources' },
      { method: 'POST', path: '/api/mentor/chat', description: 'AI Learning Mentor & Counselor' },
      { method: 'POST', path: '/api/discovery/recommend', description: 'Career Guidance Engine' },
      { method: 'POST', path: '/api/practice/generate-questions', description: 'Adaptive PYQ & Drill Generator' },
      { method: 'POST', path: '/api/explain/concept', description: 'Multilingual Concept Explainer' },
      { method: 'POST', path: '/api/resources/live-search', description: 'YouTube & Live Search Grounding' },
      { method: 'GET', path: '/api/mern/status', description: 'MERN Stack Health & Architecture Metrics' },
    ];

    return res.json({
      stack: {
        mongo: {
          name: 'MongoDB',
          role: 'Persistent Document Database',
          engine: dbState.engine === 'mongoose' ? 'MongoDB (Mongoose ODM)' : 'MongoDB-Compatible Document Store',
          status: dbState.isConnected ? 'Connected & Active' : 'Disconnected',
          connectionUri: metrics.connectionUri,
          collections: collectionStats,
        },
        express: {
          name: 'Express.js',
          role: 'Node.js Backend REST API Framework',
          status: 'Active',
          endpointsCount: expressRoutes.length,
          routes: expressRoutes,
        },
        react: {
          name: 'React 19 + Vite 6',
          role: 'Frontend Single Page Application (SPA)',
          styling: 'Tailwind CSS v4 + Glassmorphism Architecture',
          stateManagement: 'React Context + REST API Synchronization',
        },
        node: {
          name: 'Node.js',
          version: process.version,
          platform: process.platform,
          arch: process.arch,
          uptimeSeconds: Math.floor(process.uptime()),
          memoryRssMB: Math.round((memory.rss / (1024 * 1024)) * 10) / 10,
          memoryHeapUsedMB: Math.round((memory.heapUsed / (1024 * 1024)) * 10) / 10,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error fetching MERN status:', error);
    return res.status(500).json({ error: 'Failed to retrieve stack status' });
  }
});

// GET /api/mern/collections/:collectionName
router.get('/collections/:collectionName', async (req, res) => {
  try {
    const { collectionName } = req.params;
    let documents: any[] = [];

    if (mongoose.connection.readyState === 1) {
      if (collectionName === 'users') documents = await UserModel.find().limit(25).lean();
      else if (collectionName === 'studysessions') documents = await StudySessionModel.find().limit(25).lean();
      else if (collectionName === 'testattempts') documents = await TestAttemptModel.find().limit(25).lean();
      else if (collectionName === 'personalnotes') documents = await PersonalNoteModel.find().limit(25).lean();
      else if (collectionName === 'savedresources') documents = await SavedResourceModel.find().limit(25).lean();
    } else {
      if (collectionName === 'users') documents = await embeddedDb.users.find({});
      else if (collectionName === 'studysessions') documents = await embeddedDb.studySessions.find({});
      else if (collectionName === 'testattempts') documents = await embeddedDb.testAttempts.find({});
      else if (collectionName === 'personalnotes') documents = await embeddedDb.personalNotes.find({});
      else if (collectionName === 'savedresources') documents = await embeddedDb.savedResources.find({});
    }

    return res.json({
      collection: collectionName,
      count: documents.length,
      documents,
    });
  } catch (error: any) {
    console.error(`Error fetching collection ${req.params.collectionName}:`, error);
    return res.status(500).json({ error: 'Failed to fetch collection data' });
  }
});

export default router;
