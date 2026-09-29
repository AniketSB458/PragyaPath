import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  CAREERS_DATABASE,
  EXAMS_DATABASE,
  INITIAL_USER_PROFILE,
  ROADMAPS_DATABASE,
} from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';
import {
  Career,
  DailyStudySession,
  Exam,
  FreeResource,
  Language,
  Roadmap,
  UserProfile,
} from '../types';
import { api } from '../services/api';

export type TabType =
  | 'dashboard'
  | 'careers'
  | 'exams'
  | 'roadmap'
  | 'resources'
  | 'planner'
  | 'practice'
  | 'mocks'
  | 'mentor'
  | 'library';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error' | 'warning';
}

interface PersonalNote {
  id: string;
  topic: string;
  content: string;
  createdAt: string;
}

interface AppContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeExam: Exam;
  setActiveExam: (exam: Exam) => void;
  activeCareer: Career;
  setActiveCareer: (career: Career) => void;
  activeRoadmap: Roadmap;
  setActiveRoadmap: (roadmap: Roadmap) => void;
  dailySessions: DailyStudySession[];
  toggleDailySession: (id: string) => void;
  addDailySession: (session: Omit<DailyStudySession, 'id' | 'completed'>) => void;
  toggleTopicCompletion: (topicId: string) => void;
  customSavedResources: FreeResource[];
  toggleBookmarkResource: (resourceId: string, resourceData?: FreeResource) => void;
  toggleBookmarkQuestion: (questionId: string) => void;
  addWeakTopic: (topic: string) => void;
  resolveWeakTopic: (topic: string) => void;
  notes: PersonalNote[];
  addNote: (topic: string, content: string) => void;
  deleteNote: (id: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  focusTimer: {
    minutes: number;
    seconds: number;
    isRunning: boolean;
    start: () => void;
    pause: () => void;
    reset: (mins?: number) => void;
  };
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
  dismissToast: () => void;
  isMernModalOpen: boolean;
  setIsMernModalOpen: (open: boolean) => void;
  isServerSynced: boolean;
  recentAttempts: any[];
  refreshAttempts: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_DAILY_SESSIONS: DailyStudySession[] = [
  {
    id: 'ds-1',
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
    title: 'Daily General Awareness & Logical Reasoning Quiz',
    subject: 'General Intelligence',
    topic: 'Syllogisms, Puzzles & National Schemes',
    durationMinutes: 15,
    sessionType: 'Adaptive Quiz',
    completed: false,
    priority: 'low',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('pragyapath_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasLegacyName =
          !parsed.email ||
          parsed.name === 'Rahul Sharma' ||
          parsed.name === 'Priya Deshmukh' ||
          parsed.name === 'Vikram Patel' ||
          parsed.name === 'Sneha Roy';
        const hasGateGoal = parsed.targetExamId === 'gate_cse' || (parsed.targetGoal && parsed.targetGoal.includes('GATE'));

        return {
          ...parsed,
          name: hasLegacyName ? 'Anya Bandgar' : parsed.name,
          email: parsed.email || 'anyabandgar458@gmail.com',
          targetGoal: hasGateGoal ? 'National & State Competitive Exams' : (parsed.targetGoal || 'National & State Competitive Exams'),
          targetExamId: hasGateGoal ? 'upsc_cse' : (parsed.targetExamId || 'upsc_cse'),
          degreeOrStream: hasGateGoal ? 'Bachelor Degree (Final Year / Graduate)' : (parsed.degreeOrStream || 'Bachelor Degree (Final Year / Graduate)'),
        };
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USER_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [activeExam, setActiveExam] = useState<Exam>(EXAMS_DATABASE[0]);
  const [activeCareer, setActiveCareer] = useState<Career>(CAREERS_DATABASE[0]);
  const [activeRoadmap, setActiveRoadmap] = useState<Roadmap>(
    ROADMAPS_DATABASE.roadmap_upsc_cse || Object.values(ROADMAPS_DATABASE)[0]
  );
  const [dailySessions, setDailySessions] = useState<DailyStudySession[]>(() => {
    try {
      const saved = localStorage.getItem('pragyapath_daily_sessions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DAILY_SESSIONS;
  });

  const [notes, setNotes] = useState<PersonalNote[]>(() => {
    try {
      const saved = localStorage.getItem('pragyapath_notes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'note-1',
        topic: 'Fundamental Rights & Writs (Art 32 vs 226)',
        content: 'Article 32 is itself a Fundamental Right (Supreme Court). Article 226 gives wider discretionary power to High Courts covering both FRs and ordinary legal rights.',
        createdAt: 'Yesterday',
      },
      {
        id: 'note-2',
        topic: 'Successive Percentage Formula',
        content: 'Net Change = a + b + (ab/100). For successive discounts d1 and d2: Net discount = d1 + d2 - (d1 * d2 / 100).',
        createdAt: '2 days ago',
      },
    ];
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return profile.language || 'en';
  });

  // Focus Timer state
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds((prev) => prev - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes((prev) => prev - 1);
          setTimerSeconds(59);
        } else {
          setTimerRunning(false);
          // Play notification chime
          try {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.play().catch(() => {});
          } catch (e) {}
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerMinutes, timerSeconds]);

  // Persist Profile
  useEffect(() => {
    try {
      localStorage.setItem('pragyapath_user_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  // Persist Daily Sessions
  useEffect(() => {
    try {
      localStorage.setItem('pragyapath_daily_sessions', JSON.stringify(dailySessions));
    } catch (e) {
      console.error(e);
    }
  }, [dailySessions]);

  // Persist Notes
  useEffect(() => {
    try {
      localStorage.setItem('pragyapath_notes', JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  }, [notes]);

  // Custom Saved Live Resources (YouTube, Web)
  const [customSavedResources, setCustomSavedResources] = useState<FreeResource[]>(() => {
    try {
      const saved = localStorage.getItem('pragyapath_custom_resources');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pragyapath_custom_resources', JSON.stringify(customSavedResources));
    } catch (e) {
      console.error(e);
    }
  }, [customSavedResources]);

  // MERN Architecture modal state
  const [isMernModalOpen, setIsMernModalOpen] = useState<boolean>(false);
  const [isServerSynced, setIsServerSynced] = useState<boolean>(false);
  const [recentAttempts, setRecentAttempts] = useState<any[]>([]);

  // Fetch test attempts from MongoDB
  const refreshAttempts = useCallback(async () => {
    try {
      const email = profile.email || 'anyabandgar458@gmail.com';
      const data = await api.practice.getAttempts(email);
      if (data && data.attempts) {
        setRecentAttempts(data.attempts);
      }
    } catch (e) {
      console.warn('Failed to refresh attempts:', e);
    }
  }, [profile.email]);

  // Initial MERN Database Hydration
  useEffect(() => {
    let isMounted = true;
    async function hydrateFromMernDatabase() {
      const email = profile.email || 'anyabandgar458@gmail.com';
      try {
        // 1. Fetch Profile
        const serverUser = await api.auth.getProfile(email);
        if (serverUser && isMounted) {
          setProfile((prev) => ({
            ...prev,
            ...serverUser,
          }));
        }

        // 2. Fetch Sessions
        const serverSessions = await api.sessions.getSessions(email);
        if (serverSessions && serverSessions.length > 0 && isMounted) {
          setDailySessions(serverSessions);
        }

        // 3. Fetch Notes
        const serverNotes = await api.notes.getNotes(email);
        if (serverNotes && serverNotes.length > 0 && isMounted) {
          setNotes(serverNotes);
        }

        // 4. Fetch Attempts
        await refreshAttempts();

        if (isMounted) {
          setIsServerSynced(true);
        }
      } catch (err) {
        console.warn('MERN database hydration fallback to local cache:', err);
      }
    }

    hydrateFromMernDatabase();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      // Background sync to MongoDB via Express
      api.auth.updateProfile({ ...next, email: next.email || 'anyabandgar458@gmail.com' }).catch(() => {});
      return next;
    });
  };

  // Toast state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToast({ id, message, type });
  };

  const dismissToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    updateProfile({ language: lang });
    showToast(`Language set to ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi (हिंदी)' : 'Marathi (मराठी)'}`, 'info');
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict && langDict[key]) return langDict[key];
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) return enDict[key];
    return key;
  };

  const toggleDailySession = (id: string) => {
    setDailySessions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newCompleted = !s.completed;
          if (newCompleted) {
            updateProfile({
              totalStudyMinutes: profile.totalStudyMinutes + s.durationMinutes,
            });
            showToast(`Completed "${s.title}" (+${s.durationMinutes}m)`, 'success');
          }
          // Sync update to MongoDB
          api.sessions.updateSession(id, { completed: newCompleted }).catch(() => {});
          return { ...s, completed: newCompleted };
        }
        return s;
      })
    );
  };

  const addDailySession = (session: Omit<DailyStudySession, 'id' | 'completed'>) => {
    const tempId = `ds-${Date.now()}`;
    const newSession: DailyStudySession = {
      ...session,
      id: tempId,
      completed: false,
    };
    setDailySessions((prev) => [newSession, ...prev]);
    showToast(`Added study session: ${session.title}`, 'success');

    // Persist to MongoDB
    const email = profile.email || 'anyabandgar458@gmail.com';
    api.sessions.createSession({ ...session, userId: email }).then((saved) => {
      if (saved && saved.id) {
        setDailySessions((prev) => prev.map((s) => (s.id === tempId ? { ...s, id: saved.id } : s)));
      }
    }).catch(() => {});
  };

  const toggleTopicCompletion = (topicId: string) => {
    const isCompleted = profile.completedTopicIds.includes(topicId);
    const newCompleted = isCompleted
      ? profile.completedTopicIds.filter((id) => id !== topicId)
      : [...profile.completedTopicIds, topicId];

    updateProfile({ completedTopicIds: newCompleted });
    showToast(isCompleted ? 'Topic marked uncompleted' : 'Topic marked completed! Great work.', isCompleted ? 'info' : 'success');
  };

  const toggleBookmarkResource = (resourceId: string, resourceData?: FreeResource) => {
    const isBookmarked = profile.bookmarkedResourceIds.includes(resourceId);
    const newBookmarks = isBookmarked
      ? profile.bookmarkedResourceIds.filter((id) => id !== resourceId)
      : [...profile.bookmarkedResourceIds, resourceId];

    const email = profile.email || 'anyabandgar458@gmail.com';

    if (!isBookmarked && resourceData) {
      setCustomSavedResources((prev) => {
        if (!prev.some((r) => r.id === resourceData.id)) {
          return [resourceData, ...prev];
        }
        return prev;
      });
      // Save to MongoDB
      api.bookmarks.saveBookmark({
        userId: email,
        resourceId,
        title: resourceData.title,
        platform: resourceData.platform,
        linkUrl: resourceData.linkUrl,
        resourceData,
      }).catch(() => {});
    } else if (isBookmarked) {
      // Delete from MongoDB
      api.bookmarks.deleteBookmark(resourceId, email).catch(() => {});
    }

    updateProfile({ bookmarkedResourceIds: newBookmarks });
    showToast(isBookmarked ? 'Removed from My Library' : 'Saved to My Library', 'info');
  };

  const toggleBookmarkQuestion = (questionId: string) => {
    const isBookmarked = profile.bookmarkedQuestionIds.includes(questionId);
    const newBookmarks = isBookmarked
      ? profile.bookmarkedQuestionIds.filter((id) => id !== questionId)
      : [...profile.bookmarkedQuestionIds, questionId];

    updateProfile({ bookmarkedQuestionIds: newBookmarks });
    showToast(isBookmarked ? 'Removed question bookmark' : 'Bookmarked question for revision', 'info');
  };

  const addWeakTopic = (topic: string) => {
    if (!profile.weakTopics.includes(topic)) {
      updateProfile({ weakTopics: [topic, ...profile.weakTopics] });
      showToast(`Added "${topic}" to your weak topics for remedial focus`, 'warning');
    }
  };

  const resolveWeakTopic = (topic: string) => {
    updateProfile({
      weakTopics: profile.weakTopics.filter((t) => t !== topic),
      strongTopics: [topic, ...profile.strongTopics],
    });
    showToast(`Mastered "${topic}"! Moved to strong topics.`, 'success');
  };

  const addNote = (topic: string, content: string) => {
    const tempId = `note-${Date.now()}`;
    const newNote: PersonalNote = {
      id: tempId,
      topic,
      content,
      createdAt: 'Just now',
    };
    setNotes((prev) => [newNote, ...prev]);
    showToast(`Saved note for ${topic}`, 'success');

    // Persist to MongoDB
    const email = profile.email || 'anyabandgar458@gmail.com';
    api.notes.createNote({ userId: email, topic, content }).then((saved) => {
      if (saved && (saved.id || saved._id)) {
        const actualId = saved.id || saved._id;
        setNotes((prev) => prev.map((n) => (n.id === tempId ? { ...n, id: actualId } : n)));
      }
    }).catch(() => {});
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    showToast('Note deleted', 'info');
    api.notes.deleteNote(id).catch(() => {});
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        activeTab,
        setActiveTab,
        activeExam,
        setActiveExam,
        activeCareer,
        setActiveCareer,
        activeRoadmap,
        setActiveRoadmap,
        dailySessions,
        toggleDailySession,
        addDailySession,
        toggleTopicCompletion,
        customSavedResources,
        toggleBookmarkResource,
        toggleBookmarkQuestion,
        addWeakTopic,
        resolveWeakTopic,
        notes,
        addNote,
        deleteNote,
        language,
        setLanguage,
        t,
        focusTimer: {
          minutes: timerMinutes,
          seconds: timerSeconds,
          isRunning: timerRunning,
          start: () => setTimerRunning(true),
          pause: () => setTimerRunning(false),
          reset: (mins = 25) => {
            setTimerRunning(false);
            setTimerMinutes(mins);
            setTimerSeconds(0);
          },
        },
        toast,
        showToast,
        dismissToast,
        isMernModalOpen,
        setIsMernModalOpen,
        isServerSynced,
        recentAttempts,
        refreshAttempts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
