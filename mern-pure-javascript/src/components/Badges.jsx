import React, { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { useApp } from "../context/AppContext";
import {
  Award,
  Crown,
  Sun,
  Target,
  Zap,
  BookOpen,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Lock,
  Sparkles,
  ChevronRight
} from "lucide-react";
const Badges = () => {
  const { profile, dailySessions, recentAttempts, notes, setActiveTab } = useApp();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedBadge, setSelectedBadge] = useState(null);
  const badgesList = useMemo(() => {
    const streak = profile.streakDays || 1;
    const questionsSolved = profile.questionsSolved || 0;
    const correctAnswers = profile.correctAnswers || 0;
    const accuracy = questionsSolved > 0 ? Math.round(correctAnswers / questionsSolved * 100) : 0;
    const totalMinutes = profile.totalStudyMinutes || dailySessions.filter((s) => s.completed).reduce((acc, s) => acc + s.durationMinutes, 0) + 120;
    const completedTopics = profile.completedTopicIds?.length || 0;
    const notesCount = notes?.length || 0;
    const attemptsCount = recentAttempts?.length || 0;
    const completedSessionsCount = dailySessions.filter((s) => s.completed).length;
    const hasEarlySession = dailySessions.some((s) => {
      if (!s.reminderTime) return false;
      const hour = parseInt(s.reminderTime.split(":")[0], 10);
      return !isNaN(hour) && hour < 10;
    });
    return [
      {
        id: "early-bird",
        title: "Early Bird",
        description: "Schedule and complete study sessions in the morning hours before 10:00 AM.",
        category: "Focus",
        tier: "Bronze",
        icon: Sun,
        color: {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-800",
          gradient: "from-amber-400 to-orange-500",
          iconBg: "bg-amber-500/15 text-amber-600"
        },
        isUnlocked: hasEarlySession || completedSessionsCount > 0,
        progress: hasEarlySession || completedSessionsCount > 0 ? 100 : 50,
        currentValue: hasEarlySession ? "Morning Active" : "Pending",
        targetValue: "Morning Slot",
        unlockedAt: "Unlocked Today",
        xpPoints: 50
      },
      {
        id: "consistency-king",
        title: "Consistency King",
        description: "Maintain an unbroken daily study streak of 3 or more consecutive days.",
        category: "Consistency",
        tier: streak >= 7 ? "Gold" : streak >= 3 ? "Silver" : "Bronze",
        icon: Crown,
        color: {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-900",
          gradient: "from-yellow-400 via-amber-500 to-yellow-600",
          iconBg: "bg-yellow-500/20 text-yellow-700"
        },
        isUnlocked: streak >= 3,
        progress: Math.min(100, Math.round(streak / 3 * 100)),
        currentValue: `${streak}d Streak`,
        targetValue: "3d Streak",
        unlockedAt: streak >= 3 ? "Active Streak" : void 0,
        xpPoints: 100
      },
      {
        id: "accuracy-sniper",
        title: "Accuracy Sniper",
        description: "Attain 75% or higher overall accuracy across competitive practice questions.",
        category: "Mastery",
        tier: "Gold",
        icon: Target,
        color: {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-900",
          gradient: "from-emerald-500 to-teal-600",
          iconBg: "bg-emerald-500/15 text-emerald-600"
        },
        isUnlocked: accuracy >= 75 && questionsSolved >= 10,
        progress: Math.min(100, Math.round(accuracy / 75 * 100)),
        currentValue: `${accuracy}%`,
        targetValue: "75% Accuracy",
        unlockedAt: accuracy >= 75 ? "Verified High Accuracy" : void 0,
        xpPoints: 120
      },
      {
        id: "focus-centurion",
        title: "Focus Centurion",
        description: "Log over 180 total minutes of deep focus timed study sprints.",
        category: "Focus",
        tier: "Platinum",
        icon: Zap,
        color: {
          bg: "bg-indigo-50",
          border: "border-indigo-200",
          text: "text-indigo-900",
          gradient: "from-indigo-600 to-purple-600",
          iconBg: "bg-indigo-500/15 text-indigo-600"
        },
        isUnlocked: totalMinutes >= 180,
        progress: Math.min(100, Math.round(totalMinutes / 180 * 100)),
        currentValue: `${totalMinutes}m`,
        targetValue: "180m",
        unlockedAt: totalMinutes >= 180 ? "Deep Work Master" : void 0,
        xpPoints: 150
      },
      {
        id: "syllabus-crusher",
        title: "Syllabus Crusher",
        description: "Master and complete 3 or more core phase topics from your active exam roadmap.",
        category: "Milestone",
        tier: "Silver",
        icon: BookOpen,
        color: {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-900",
          gradient: "from-blue-500 to-indigo-600",
          iconBg: "bg-blue-500/15 text-blue-600"
        },
        isUnlocked: completedTopics >= 3,
        progress: Math.min(100, Math.round(completedTopics / 3 * 100)),
        currentValue: `${completedTopics} Topics`,
        targetValue: "3 Topics",
        unlockedAt: completedTopics >= 3 ? "Phase Milestone Met" : void 0,
        xpPoints: 80
      },
      {
        id: "remedial-warrior",
        title: "Weakness Vanquisher",
        description: "Turn diagnosed weak syllabus areas into mastered strengths through targeted PYQ drills.",
        category: "Mastery",
        tier: "Silver",
        icon: ShieldCheck,
        color: {
          bg: "bg-rose-50",
          border: "border-rose-200",
          text: "text-rose-900",
          gradient: "from-rose-500 to-pink-600",
          iconBg: "bg-rose-500/15 text-rose-600"
        },
        isUnlocked: profile.strongTopics?.length > 0,
        progress: profile.strongTopics?.length > 0 ? 100 : 60,
        currentValue: `${profile.strongTopics?.length || 0} Mastered`,
        targetValue: "1 Mastered",
        unlockedAt: "Strong Foundation Established",
        xpPoints: 90
      },
      {
        id: "scholar-archivist",
        title: "Revision Archivist",
        description: "Document and save personal revision notes and formulas in your offline vault.",
        category: "Consistency",
        tier: "Bronze",
        icon: FileText,
        color: {
          bg: "bg-teal-50",
          border: "border-teal-200",
          text: "text-teal-900",
          gradient: "from-teal-500 to-emerald-600",
          iconBg: "bg-teal-500/15 text-teal-600"
        },
        isUnlocked: notesCount >= 1,
        progress: Math.min(100, Math.round(notesCount / 1 * 100)),
        currentValue: `${notesCount} Notes`,
        targetValue: "1 Note",
        unlockedAt: notesCount >= 1 ? "Vault Initiated" : void 0,
        xpPoints: 60
      },
      {
        id: "mock-gladiator",
        title: "Mock Gladiator",
        description: "Complete authentic timed mock examinations to benchmark real cutoff readiness.",
        category: "Milestone",
        tier: "Gold",
        icon: Award,
        color: {
          bg: "bg-purple-50",
          border: "border-purple-200",
          text: "text-purple-900",
          gradient: "from-purple-600 to-violet-700",
          iconBg: "bg-purple-500/15 text-purple-600"
        },
        isUnlocked: attemptsCount >= 1,
        progress: Math.min(100, Math.round(attemptsCount / 1 * 100)),
        currentValue: `${attemptsCount} Attempted`,
        targetValue: "1 Mock",
        unlockedAt: attemptsCount >= 1 ? "Simulated Readiness" : void 0,
        xpPoints: 110
      }
    ];
  }, [profile, dailySessions, recentAttempts, notes]);
  const unlockedCount = badgesList.filter((b) => b.isUnlocked).length;
  const totalCount = badgesList.length;
  const totalXp = badgesList.filter((b) => b.isUnlocked).reduce((sum, b) => sum + b.xpPoints, 0);
  const filteredBadges = useMemo(() => {
    if (selectedFilter === "unlocked") {
      return badgesList.filter((b) => b.isUnlocked);
    }
    if (selectedFilter === "progress") {
      return badgesList.filter((b) => !b.isUnlocked);
    }
    return badgesList;
  }, [badgesList, selectedFilter]);
  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
    if (badge.isUnlocked) {
      try {
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.7 },
          colors: ["#4f46e5", "#f59e0b", "#10b981", "#ec4899"]
        });
      } catch (e) {
      }
    }
  };
  return <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-5 border border-white/80 shadow-sm relative overflow-hidden">
      {
    /* Background Accent Pill */
  }
      <div className="absolute top-0 right-0 w-72 h-72 bg-linear-to-bl from-amber-400/10 via-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

      {
    /* Header with Motivational Progress & Filter Tabs */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100/80 pb-4 relative z-10">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                <span>Achievement Badges & Mastery</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  {totalXp} XP Earned
                </span>
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Activity-driven milestones and streaks. Complete daily goals to unlock higher mastery tiers!
          </p>
        </div>

        {
    /* Motivational Status & Filter Tabs */
  }
        <div className="flex flex-wrap items-center gap-2">
          {
    /* Progress Capsule */
  }
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-900">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              {unlockedCount} of {totalCount} Unlocked ({Math.round(unlockedCount / totalCount * 100)}%)
            </span>
          </div>

          {
    /* Filter Pills */
  }
          <div className="flex items-center rounded-xl border border-slate-200/80 p-0.5 bg-slate-50/80 text-[11px] font-semibold">
            <button
    onClick={() => setSelectedFilter("all")}
    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${selectedFilter === "all" ? "bg-white text-indigo-700 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
  >
              All ({totalCount})
            </button>
            <button
    onClick={() => setSelectedFilter("unlocked")}
    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${selectedFilter === "unlocked" ? "bg-white text-indigo-700 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
  >
              Unlocked ({unlockedCount})
            </button>
            <button
    onClick={() => setSelectedFilter("progress")}
    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${selectedFilter === "progress" ? "bg-white text-indigo-700 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
  >
              In Progress ({totalCount - unlockedCount})
            </button>
          </div>
        </div>
      </div>

      {
    /* Badges Grid */
  }
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-10">
        {filteredBadges.map((badge) => {
    const Icon = badge.icon;
    const isSelected = selectedBadge?.id === badge.id;
    return <div
      key={badge.id}
      onClick={() => handleBadgeClick(badge)}
      className={`group p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${badge.isUnlocked ? `${badge.color.bg} ${badge.color.border} hover:shadow-md hover:scale-[1.02]` : "bg-slate-50/70 border-slate-200/80 opacity-75 hover:opacity-90"} ${isSelected ? "ring-2 ring-indigo-500 shadow-md" : ""}`}
    >
              {
      /* Top Row: Icon + Tier Pill */
    }
              <div className="flex items-start justify-between mb-3">
                <div
      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs ${badge.isUnlocked ? badge.color.iconBg : "bg-slate-200 text-slate-400"}`}
    >
                  {badge.isUnlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                </div>

                <div className="flex flex-col items-end space-y-1">
                  <span
      className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${badge.isUnlocked ? "bg-white/80 text-slate-700 border-slate-200/80 shadow-2xs" : "bg-slate-200 text-slate-500 border-slate-300"}`}
    >
                    {badge.tier}
                  </span>
                  <span className="text-[10px] font-bold text-amber-700">
                    +{badge.xpPoints} XP
                  </span>
                </div>
              </div>

              {
      /* Title & Description */
    }
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-950 transition-colors flex items-center space-x-1.5">
                  <span className="truncate">{badge.title}</span>
                  {badge.isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              {
      /* Bottom Progress Strip */
    }
              <div className="mt-3 pt-2.5 border-t border-slate-200/60">
                <div className="flex items-center justify-between text-[10px] font-semibold mb-1">
                  <span className={badge.isUnlocked ? "text-emerald-700" : "text-slate-500"}>
                    {badge.isUnlocked ? "Unlocked!" : `${badge.currentValue} / ${badge.targetValue}`}
                  </span>
                  <span className="font-mono text-slate-600">{badge.progress}%</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                  <div
      className={`h-1.5 rounded-full transition-all duration-500 ${badge.isUnlocked ? "bg-emerald-500" : "bg-indigo-600"}`}
      style={{ width: `${badge.progress}%` }}
    />
                </div>
              </div>
            </div>;
  })}
      </div>

      {
    /* Selected Badge Detail Modal / Drawer Banner */
  }
      {selectedBadge && <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white text-indigo-600 border border-indigo-200 flex items-center justify-center shadow-xs shrink-0">
              {React.createElement(selectedBadge.icon, { className: "w-4 h-4" })}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900">{selectedBadge.title}</span>
                <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-200">
                  {selectedBadge.tier} Tier • +{selectedBadge.xpPoints} XP
                </span>
                {selectedBadge.isUnlocked ? <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Completed
                  </span> : <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    In Progress ({selectedBadge.progress}%)
                  </span>}
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">{selectedBadge.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {!selectedBadge.isUnlocked && <button
    onClick={() => {
      if (selectedBadge.category === "Consistency" || selectedBadge.category === "Focus") {
        setActiveTab("planner");
      } else if (selectedBadge.category === "Mastery") {
        setActiveTab("practice");
      } else {
        setActiveTab("roadmap");
      }
    }}
    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-xs cursor-pointer flex items-center space-x-1"
  >
                <span>Level Up</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>}
            <button
    onClick={() => setSelectedBadge(null)}
    className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 font-semibold transition-colors cursor-pointer border border-slate-200"
  >
              Dismiss
            </button>
          </div>
        </div>}
    </div>;
};
export {
  Badges
};
