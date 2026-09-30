import { useMemo } from "react";
import confetti from "canvas-confetti";
import { useApp } from "../context/AppContext";
import {
  Flame,
  Crown,
  Shield,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
  TrendingUp,
  Award
} from "lucide-react";
import { playCelebrationSound } from "../utils/sound";
const ConsistencyStreak = () => {
  const { profile, updateProfile, dailySessions, showToast, setActiveTab } = useApp();
  const milestones = useMemo(
    () => [
      {
        days: 3,
        title: "Ignition Spark",
        subtitle: "Initial Habit Formation",
        rewardXp: 50,
        icon: Zap,
        color: {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-800",
          badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
          gradient: "from-amber-500 to-orange-500"
        }
      },
      {
        days: 7,
        title: "Momentum Wave",
        subtitle: "1 Full Week Unbroken",
        rewardXp: 120,
        icon: TrendingUp,
        color: {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          badgeBg: "bg-blue-100 text-blue-900 border-blue-300",
          gradient: "from-blue-500 to-cyan-500"
        }
      },
      {
        days: 14,
        title: "Mastery Lock",
        subtitle: "Neuroplastic Study Flow",
        rewardXp: 250,
        icon: Crown,
        color: {
          bg: "bg-purple-50",
          border: "border-purple-200",
          text: "text-purple-800",
          badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
          gradient: "from-purple-600 to-indigo-600"
        }
      },
      {
        days: 30,
        title: "Habit Titan",
        subtitle: "1 Month Iron Discipline",
        rewardXp: 500,
        icon: Award,
        color: {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-800",
          badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          gradient: "from-emerald-500 to-teal-600"
        }
      },
      {
        days: 60,
        title: "Ranker Zenith",
        subtitle: "Top 0.1% Preparation Mindset",
        rewardXp: 1e3,
        icon: Shield,
        color: {
          bg: "bg-rose-50",
          border: "border-rose-200",
          text: "text-rose-800",
          badgeBg: "bg-rose-100 text-rose-900 border-rose-300",
          gradient: "from-rose-500 to-pink-600"
        }
      }
    ],
    []
  );
  const currentStreak = profile.streakDays || 1;
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const isStudiedToday = profile.lastActiveDate === todayStr || dailySessions.some((s) => s.completed);
  const achievedMilestones = useMemo(
    () => milestones.filter((m) => currentStreak >= m.days),
    [milestones, currentStreak]
  );
  const nextMilestone = useMemo(
    () => milestones.find((m) => currentStreak < m.days) || milestones[milestones.length - 1],
    [milestones, currentStreak]
  );
  const prevMilestoneDays = useMemo(() => {
    const prev = milestones.filter((m) => m.days <= currentStreak);
    return prev.length > 0 ? prev[prev.length - 1].days : 0;
  }, [milestones, currentStreak]);
  const milestoneProgress = useMemo(() => {
    if (currentStreak >= nextMilestone.days && achievedMilestones.length === milestones.length) {
      return 100;
    }
    const range = nextMilestone.days - prevMilestoneDays;
    const current = currentStreak - prevMilestoneDays;
    return Math.min(100, Math.max(10, Math.round(current / (range || 1) * 100)));
  }, [currentStreak, nextMilestone, prevMilestoneDays, achievedMilestones, milestones.length]);
  const daysToNextMilestone = Math.max(0, nextMilestone.days - currentStreak);
  const weekDays = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = /* @__PURE__ */ new Date();
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(today.getDate() - i);
      const dayName = days[d.getDay()];
      const dateNum = d.getDate();
      const isToday = i === 0;
      const isDone = isToday ? isStudiedToday : i < currentStreak;
      result.push({
        dayName,
        dateNum,
        isToday,
        isDone
      });
    }
    return result;
  }, [isStudiedToday, currentStreak]);
  const handleCheckInToday = () => {
    const newStreak = isStudiedToday ? currentStreak : currentStreak + 1;
    updateProfile({
      lastActiveDate: todayStr,
      streakDays: newStreak
    });
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#ef4444", "#6366f1", "#10b981"]
      });
      playCelebrationSound();
    } catch (e) {
    }
    const hitMilestone = milestones.find((m) => m.days === newStreak);
    if (hitMilestone) {
      showToast(`\u{1F525} MILESTONE UNLOCKED: ${hitMilestone.title}! You hit ${newStreak} consecutive days of study! (+${hitMilestone.rewardXp} XP)`, "success");
    } else {
      showToast(`\u{1F525} Streak Protected! Day ${newStreak} logged in your continuous study ledger.`, "success");
    }
  };
  const handleMilestoneClick = (milestone) => {
    const isAchieved = currentStreak >= milestone.days;
    if (isAchieved) {
      try {
        confetti({
          particleCount: 45,
          spread: 50,
          origin: { y: 0.65 },
          colors: ["#f59e0b", "#ec4899", "#3b82f6", "#10b981"]
        });
      } catch (e) {
      }
      showToast(`\u{1F3C6} Milestone '${milestone.title}' (${milestone.days}d) Active! Reward: +${milestone.rewardXp} XP.`, "success");
    } else {
      showToast(`\u{1F3AF} Keep going! Reach ${milestone.days} consecutive study days to unlock '${milestone.title}' (+${milestone.rewardXp} XP).`, "info");
    }
  };
  return <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-5 border border-white/80 shadow-sm relative overflow-hidden">
      {
    /* Background Accent linear gradient */
  }
      <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-bl from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {
    /* Top Banner: Streak Metric + Milestone Pill + Action */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100/80 pb-4 relative z-10">
        <div className="flex items-center space-x-3.5">
          {
    /* Animated Flame Container */
  }
          <div className="relative group">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-amber-500 via-orange-500 to-red-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/25 border border-white/40 transform transition-transform group-hover:scale-105">
              <Flame className="w-6 h-6 text-white animate-pulse" />
            </div>
            {
    /* Small active badge */
  }
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center space-x-1.5">
                <span>Consistency Streak:</span>
                <span className="text-amber-600 font-mono text-xl sm:text-2xl font-black">
                  {currentStreak} Days
                </span>
              </h2>

              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-2xs">
                🔥 ON FIRE
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-0.5 flex items-center space-x-2">
              <span>Next Milestone: <strong className="text-slate-800 font-semibold">{nextMilestone.title} ({nextMilestone.days}d)</strong></span>
              <span>•</span>
              <span className="text-amber-700 font-semibold">{daysToNextMilestone === 0 ? "Goal Achieved!" : `${daysToNextMilestone} days left`}</span>
            </p>
          </div>
        </div>

        {
    /* Check-in / Protect Streak Action */
  }
        <div className="flex items-center space-x-2 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] font-bold text-slate-700">
              {isStudiedToday ? "Streak Secured" : "Action Needed"}
            </div>
            <div className="text-[10px] text-slate-400">
              {isStudiedToday ? "Today counted" : "Study to protect"}
            </div>
          </div>

          <button
    onClick={handleCheckInToday}
    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center space-x-1.5 border ${isStudiedToday ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-white/20 shadow-md shadow-orange-500/20"}`}
    title="Log study session check-in to advance streak"
  >
            {isStudiedToday ? <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Today Completed</span>
              </> : <>
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Check-in Today (+1d)</span>
              </>}
          </button>
        </div>
      </div>

      {
    /* 7-Day Rolling Visual Calendar Strip */
  }
      <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-2xs relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>Weekly Study Continuity</span>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">
            {weekDays.filter((d) => d.isDone).length} of 7 Days Completed
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((d, idx) => <div
    key={idx}
    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${d.isDone ? "bg-linear-to-b from-amber-50 to-orange-50/60 border-amber-300 text-amber-900 shadow-2xs" : d.isToday ? "bg-indigo-50/50 border-indigo-300 border-dashed text-indigo-900 ring-2 ring-indigo-400/20" : "bg-slate-50/50 border-slate-200/80 text-slate-400"}`}
  >
              <span className="text-[10px] font-bold uppercase tracking-wider">{d.dayName}</span>
              <span className="text-xs font-black font-mono my-0.5">{d.dateNum}</span>
              {d.isDone ? <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-in zoom-in" /> : <span className="w-2 h-2 rounded-full bg-slate-300 my-0.5" />}
            </div>)}
        </div>
      </div>

      {
    /* Progress Bar Toward Next Milestone */
  }
      <div className="space-y-1.5 relative z-10">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 flex items-center space-x-1.5">
            <span>Milestone Target:</span>
            <strong className="text-indigo-700">{nextMilestone.title} ({nextMilestone.days} Days)</strong>
          </span>
          <span className="font-bold font-mono text-indigo-600">
            {currentStreak} / {nextMilestone.days} Days ({milestoneProgress}%)
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
          <div
    className="h-2 rounded-full bg-linear-to-r from-amber-500 via-orange-500 to-indigo-600 transition-all duration-700 ease-out"
    style={{ width: `${milestoneProgress}%` }}
  />
        </div>
      </div>

      {
    /* Milestone Checkpoints Shield Grid */
  }
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Streak Milestones & Rewards</span>
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {achievedMilestones.length} of {milestones.length} Milestones Hit
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {milestones.map((m) => {
    const isHit = currentStreak >= m.days;
    const Icon = m.icon;
    return <button
      key={m.days}
      onClick={() => handleMilestoneClick(m)}
      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group ${isHit ? `${m.color.bg} ${m.color.border} hover:shadow-md hover:scale-[1.02]` : "bg-slate-50/60 border-slate-200 opacity-60 hover:opacity-80"}`}
    >
                {
      /* Hit Badge Stamp */
    }
                {isHit && <span className="absolute top-2 right-2 text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-2xs">
                    HIT!
                  </span>}

                <div>
                  <div
      className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 shadow-2xs ${isHit ? `bg-linear-to-tr ${m.color.gradient} text-white` : "bg-slate-200 text-slate-400"}`}
    >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-sm font-black font-mono text-slate-900">{m.days}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Days</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 truncate mt-0.5">{m.title}</h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{m.subtitle}</p>
                </div>

                <div className="mt-2.5 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                  <span className="font-bold text-amber-700">+{m.rewardXp} XP</span>
                  <span className={isHit ? "text-emerald-700 font-extrabold" : "text-slate-400 font-medium"}>
                    {isHit ? "Unlocked" : `${m.days - currentStreak}d to go`}
                  </span>
                </div>
              </button>;
  })}
        </div>
      </div>
    </div>;
};
export {
  ConsistencyStreak
};
