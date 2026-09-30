import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  CAREERS_DATABASE,
  EXAMS_DATABASE,
  INITIAL_USER_PROFILE,
  ROADMAPS_DATABASE
} from "../data/mockData";
import { TRANSLATIONS } from "../data/translations";
import { api } from "../services/api";
import { playReminderChime, sendDesktopNotification, formatTime12h } from "../utils/sound";
const AppContext = createContext(void 0);
const INITIAL_DAILY_SESSIONS = [
  {
    id: "ds-1",
    title: "Indian Polity: Constitutional Articles & Fundamental Rights",
    subject: "Indian Polity & Governance",
    topic: "Writ Jurisdictions & Article 21 Expansion",
    durationMinutes: 60,
    sessionType: "Concept & Theory",
    completed: true,
    priority: "high",
    reminderTime: "08:00",
    reminderEnabled: true
  },
  {
    id: "ds-2",
    title: "Quantitative Aptitude & Data Interpretation Speed Drill",
    subject: "Quantitative Aptitude",
    topic: "Percentages, Ratios & Bar Graph Analysis",
    durationMinutes: 45,
    sessionType: "PYQ Practice",
    completed: false,
    priority: "high",
    reminderTime: "11:00",
    reminderEnabled: true
  },
  {
    id: "ds-3",
    title: "Modern Indian History: Freedom Movement Milestones",
    subject: "History & Culture",
    topic: "1919 Montagu-Chelmsford & Civil Disobedience",
    durationMinutes: 30,
    sessionType: "Weak Topic Revision",
    completed: false,
    priority: "medium",
    reminderTime: "15:30",
    reminderEnabled: true
  },
  {
    id: "ds-4",
    title: "Daily General Awareness & Logical Reasoning Quiz",
    subject: "General Intelligence",
    topic: "Syllogisms, Puzzles & National Schemes",
    durationMinutes: 15,
    sessionType: "Adaptive Quiz",
    completed: false,
    priority: "low",
    reminderTime: "20:00",
    reminderEnabled: true
  }
];
const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("pragyapath_user_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasLegacyName = !parsed.email || parsed.name === "Rahul Sharma" || parsed.name === "Priya Deshmukh" || parsed.name === "Vikram Patel" || parsed.name === "Sneha Roy";
        const hasGateGoal = parsed.targetExamId === "gate_cse" || parsed.targetGoal && parsed.targetGoal.includes("GATE");
        return {
          ...parsed,
          name: hasLegacyName ? "Anya Bandgar" : parsed.name,
          email: parsed.email || "anyabandgar458@gmail.com",
          targetGoal: hasGateGoal ? "National & State Competitive Exams" : parsed.targetGoal || "National & State Competitive Exams",
          targetExamId: hasGateGoal ? "upsc_cse" : parsed.targetExamId || "upsc_cse",
          degreeOrStream: hasGateGoal ? "Bachelor Degree (Final Year / Graduate)" : parsed.degreeOrStream || "Bachelor Degree (Final Year / Graduate)"
        };
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USER_PROFILE;
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeExam, setActiveExam] = useState(EXAMS_DATABASE[0]);
  const [activeCareer, setActiveCareer] = useState(CAREERS_DATABASE[0]);
  const [activeRoadmap, setActiveRoadmap] = useState(
    ROADMAPS_DATABASE.roadmap_upsc_cse || Object.values(ROADMAPS_DATABASE)[0]
  );
  const [dailySessions, setDailySessions] = useState(() => {
    try {
      const saved = localStorage.getItem("pragyapath_daily_sessions");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DAILY_SESSIONS;
  });
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("pragyapath_notes");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: "note-1",
        topic: "Fundamental Rights & Writs (Art 32 vs 226)",
        content: "Article 32 is itself a Fundamental Right (Supreme Court). Article 226 gives wider discretionary power to High Courts covering both FRs and ordinary legal rights.",
        createdAt: "Yesterday"
      },
      {
        id: "note-2",
        topic: "Successive Percentage Formula",
        content: "Net Change = a + b + (ab/100). For successive discounts d1 and d2: Net discount = d1 + d2 - (d1 * d2 / 100).",
        createdAt: "2 days ago"
      }
    ];
  });
  const [language, setLanguageState] = useState(() => {
    return profile.language || "en";
  });
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds((prev) => prev - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes((prev) => prev - 1);
          setTimerSeconds(59);
        } else {
          setTimerRunning(false);
          try {
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
            audio.play().catch(() => {
            });
          } catch (e) {
          }
        }
      }, 1e3);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerMinutes, timerSeconds]);
  useEffect(() => {
    try {
      localStorage.setItem("pragyapath_user_profile", JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);
  useEffect(() => {
    try {
      localStorage.setItem("pragyapath_daily_sessions", JSON.stringify(dailySessions));
    } catch (e) {
      console.error(e);
    }
  }, [dailySessions]);
  useEffect(() => {
    try {
      localStorage.setItem("pragyapath_notes", JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  }, [notes]);
  const [customSavedResources, setCustomSavedResources] = useState(() => {
    try {
      const saved = localStorage.getItem("pragyapath_custom_resources");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("pragyapath_custom_resources", JSON.stringify(customSavedResources));
    } catch (e) {
      console.error(e);
    }
  }, [customSavedResources]);
  const [isServerSynced, setIsServerSynced] = useState(false);
  const [recentAttempts, setRecentAttempts] = useState([]);
  const refreshAttempts = useCallback(async () => {
    try {
      const email = profile.email || "anyabandgar458@gmail.com";
      const data = await api.practice.getAttempts(email);
      if (data && data.attempts) {
        setRecentAttempts(data.attempts);
      }
    } catch (e) {
      console.warn("Failed to refresh attempts:", e);
    }
  }, [profile.email]);
  useEffect(() => {
    let isMounted = true;
    async function hydrateFromMernDatabase() {
      const email = profile.email || "anyabandgar458@gmail.com";
      try {
        const serverUser = await api.auth.getProfile(email);
        if (serverUser && isMounted) {
          setProfile((prev) => ({
            ...prev,
            ...serverUser
          }));
        }
        const serverSessions = await api.sessions.getSessions(email);
        if (serverSessions && serverSessions.length > 0 && isMounted) {
          setDailySessions(serverSessions);
        }
        const serverNotes = await api.notes.getNotes(email);
        if (serverNotes && serverNotes.length > 0 && isMounted) {
          setNotes(serverNotes);
        }
        await refreshAttempts();
        if (isMounted) {
          setIsServerSynced(true);
        }
      } catch (err) {
        console.warn("MERN database hydration fallback to local cache:", err);
      }
    }
    hydrateFromMernDatabase();
    return () => {
      isMounted = false;
    };
  }, []);
  const updateProfile = (updates) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      api.auth.updateProfile({ ...next, email: next.email || "anyabandgar458@gmail.com" }).catch(() => {
      });
      return next;
    });
  };
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success", options) => {
    const id = `toast-${Date.now()}`;
    setToast({
      id,
      message,
      type,
      ...options
    });
  };
  const dismissToast = () => {
    setToast(null);
  };
  useEffect(() => {
    if (toast) {
      const dismissDuration = toast.duration || (toast.type === "reminder" ? 1e4 : 3500);
      const timer = setTimeout(() => {
        setToast(null);
      }, dismissDuration);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const startFocusForSession = (session) => {
    setActiveTab("planner");
    setTimerMinutes(session.durationMinutes);
    setTimerSeconds(0);
    setTimerRunning(true);
    showToast(`Focus sprint started for "${session.title}" (${session.durationMinutes}m)!`, "success");
  };
  const snoozeTaskReminder = (taskId, minutes = 10) => {
    const now = /* @__PURE__ */ new Date();
    now.setMinutes(now.getMinutes() + minutes);
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const newTime = `${h}:${m}`;
    setDailySessions(
      (prev) => prev.map((s) => {
        if (s.id === taskId) {
          return {
            ...s,
            reminderTime: newTime,
            reminderEnabled: true,
            lastNotifiedDate: void 0
          };
        }
        return s;
      })
    );
    showToast(`Reminder snoozed for ${minutes}m (will alert at ${formatTime12h(newTime)})`, "info");
  };
  const triggerStudyReminderToast = (session) => {
    playReminderChime();
    sendDesktopNotification(
      `\u23F0 Study Reminder: ${session.title}`,
      `Scheduled ${session.durationMinutes} mins on ${session.subject} (${session.sessionType})`
    );
    const formattedTime = formatTime12h(session.reminderTime || "Now");
    setToast({
      id: `reminder-${session.id}-${Date.now()}`,
      type: "reminder",
      title: session.title,
      message: `Time to start your scheduled ${session.durationMinutes}-minute study sprint!`,
      subtitle: `${session.subject} \u2022 ${session.sessionType} \u2022 Scheduled ${formattedTime}`,
      duration: 12e3,
      action: {
        label: `Start Focus (${session.durationMinutes}m)`,
        onClick: () => {
          startFocusForSession(session);
        }
      },
      secondaryAction: {
        label: "Snooze 10m",
        onClick: () => {
          snoozeTaskReminder(session.id, 10);
        }
      }
    });
  };
  const setTaskReminder = (taskId, reminderTime, enabled = true) => {
    setDailySessions((prev) => {
      const next = prev.map((s) => {
        if (s.id === taskId) {
          const updated = {
            ...s,
            reminderTime,
            reminderEnabled: enabled,
            lastNotifiedDate: s.reminderTime !== reminderTime ? void 0 : s.lastNotifiedDate
          };
          api.sessions.updateSession(taskId, {
            reminderTime: updated.reminderTime,
            reminderEnabled: updated.reminderEnabled
          }).catch(() => {
          });
          return updated;
        }
        return s;
      });
      return next;
    });
    if (enabled) {
      showToast(`Daily reminder set for ${formatTime12h(reminderTime)}`, "success");
    } else {
      showToast("Study reminder turned off", "info");
    }
  };
  const toggleTaskReminder = (taskId) => {
    const task = dailySessions.find((s) => s.id === taskId);
    if (!task) return;
    const nextState = !task.reminderEnabled;
    const defaultTime = task.reminderTime || "09:00";
    setTaskReminder(taskId, defaultTime, nextState);
  };
  const quickScheduleAllReminders = () => {
    const times = ["08:00", "11:00", "15:30", "19:30", "21:00"];
    setDailySessions(
      (prev) => prev.map((s, idx) => ({
        ...s,
        reminderTime: s.reminderTime || times[idx % times.length],
        reminderEnabled: true
      }))
    );
    playReminderChime();
    showToast("Scheduled daily study reminders for all tasks across morning, afternoon & evening!", "success");
  };
  useEffect(() => {
    const checkReminders = () => {
      const now = /* @__PURE__ */ new Date();
      const currentHours = String(now.getHours()).padStart(2, "0");
      const currentMins = String(now.getMinutes()).padStart(2, "0");
      const currentTimeStr = `${currentHours}:${currentMins}`;
      const todayDateStr = now.toISOString().split("T")[0];
      dailySessions.forEach((session) => {
        if (session.reminderEnabled && session.reminderTime === currentTimeStr && session.lastNotifiedDate !== todayDateStr && !session.completed) {
          triggerStudyReminderToast(session);
          setDailySessions(
            (prev) => prev.map((s) => s.id === session.id ? { ...s, lastNotifiedDate: todayDateStr } : s)
          );
        }
      });
    };
    checkReminders();
    const interval = setInterval(checkReminders, 15e3);
    return () => clearInterval(interval);
  }, [dailySessions]);
  const setLanguage = (lang) => {
    setLanguageState(lang);
    updateProfile({ language: lang });
    showToast(`Language set to ${lang === "en" ? "English" : lang === "hi" ? "Hindi (\u0939\u093F\u0902\u0926\u0940)" : "Marathi (\u092E\u0930\u093E\u0920\u0940)"}`, "info");
  };
  const t = (key) => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict && langDict[key]) return langDict[key];
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) return enDict[key];
    return key;
  };
  const toggleDailySession = (id) => {
    setDailySessions(
      (prev) => prev.map((s) => {
        if (s.id === id) {
          const newCompleted = !s.completed;
          if (newCompleted) {
            updateProfile({
              totalStudyMinutes: profile.totalStudyMinutes + s.durationMinutes
            });
            showToast(`Completed "${s.title}" (+${s.durationMinutes}m)`, "success");
          }
          api.sessions.updateSession(id, { completed: newCompleted }).catch(() => {
          });
          return { ...s, completed: newCompleted };
        }
        return s;
      })
    );
  };
  const addDailySession = (session) => {
    const tempId = `ds-${Date.now()}`;
    const newSession = {
      ...session,
      id: tempId,
      completed: false
    };
    setDailySessions((prev) => [newSession, ...prev]);
    showToast(`Added study session: ${session.title}`, "success");
    const email = profile.email || "anyabandgar458@gmail.com";
    api.sessions.createSession({ ...session, userId: email }).then((saved) => {
      if (saved && saved.id) {
        setDailySessions((prev) => prev.map((s) => s.id === tempId ? { ...s, id: saved.id } : s));
      }
    }).catch(() => {
    });
  };
  const toggleTopicCompletion = (topicId) => {
    const isCompleted = profile.completedTopicIds.includes(topicId);
    const newCompleted = isCompleted ? profile.completedTopicIds.filter((id) => id !== topicId) : [...profile.completedTopicIds, topicId];
    updateProfile({ completedTopicIds: newCompleted });
    showToast(isCompleted ? "Topic marked uncompleted" : "Topic marked completed! Great work.", isCompleted ? "info" : "success");
  };
  const toggleBookmarkResource = (resourceId, resourceData) => {
    const isBookmarked = profile.bookmarkedResourceIds.includes(resourceId);
    const newBookmarks = isBookmarked ? profile.bookmarkedResourceIds.filter((id) => id !== resourceId) : [...profile.bookmarkedResourceIds, resourceId];
    const email = profile.email || "anyabandgar458@gmail.com";
    if (!isBookmarked && resourceData) {
      setCustomSavedResources((prev) => {
        if (!prev.some((r) => r.id === resourceData.id)) {
          return [resourceData, ...prev];
        }
        return prev;
      });
      api.bookmarks.saveBookmark({
        userId: email,
        resourceId,
        title: resourceData.title,
        platform: resourceData.platform,
        linkUrl: resourceData.linkUrl,
        resourceData
      }).catch(() => {
      });
    } else if (isBookmarked) {
      api.bookmarks.deleteBookmark(resourceId, email).catch(() => {
      });
    }
    updateProfile({ bookmarkedResourceIds: newBookmarks });
    showToast(isBookmarked ? "Removed from My Library" : "Saved to My Library", "info");
  };
  const toggleBookmarkQuestion = (questionId) => {
    const isBookmarked = profile.bookmarkedQuestionIds.includes(questionId);
    const newBookmarks = isBookmarked ? profile.bookmarkedQuestionIds.filter((id) => id !== questionId) : [...profile.bookmarkedQuestionIds, questionId];
    updateProfile({ bookmarkedQuestionIds: newBookmarks });
    showToast(isBookmarked ? "Removed question bookmark" : "Bookmarked question for revision", "info");
  };
  const addWeakTopic = (topic) => {
    if (!profile.weakTopics.includes(topic)) {
      updateProfile({ weakTopics: [topic, ...profile.weakTopics] });
      showToast(`Added "${topic}" to your weak topics for remedial focus`, "warning");
    }
  };
  const resolveWeakTopic = (topic) => {
    updateProfile({
      weakTopics: profile.weakTopics.filter((t2) => t2 !== topic),
      strongTopics: [topic, ...profile.strongTopics]
    });
    showToast(`Mastered "${topic}"! Moved to strong topics.`, "success");
  };
  const addNote = (topic, content) => {
    const tempId = `note-${Date.now()}`;
    const newNote = {
      id: tempId,
      topic,
      content,
      createdAt: "Just now"
    };
    setNotes((prev) => [newNote, ...prev]);
    showToast(`Saved note for ${topic}`, "success");
    const email = profile.email || "anyabandgar458@gmail.com";
    api.notes.createNote({ userId: email, topic, content }).then((saved) => {
      if (saved && (saved.id || saved._id)) {
        const actualId = saved.id || saved._id;
        setNotes((prev) => prev.map((n) => n.id === tempId ? { ...n, id: actualId } : n));
      }
    }).catch(() => {
    });
  };
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    showToast("Note deleted", "info");
    api.notes.deleteNote(id).catch(() => {
    });
  };
  return <AppContext.Provider
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
      setTaskReminder,
      toggleTaskReminder,
      triggerStudyReminderToast,
      snoozeTaskReminder,
      quickScheduleAllReminders,
      startFocusForSession,
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
        }
      },
      toast,
      showToast,
      dismissToast,
      isServerSynced,
      recentAttempts,
      refreshAttempts
    }}
  >
      {children}
    </AppContext.Provider>;
};
const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
export {
  AppProvider,
  useApp
};
