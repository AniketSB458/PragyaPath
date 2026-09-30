import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { formatTime12h } from "../utils/sound";
import {
  Flame,
  Compass,
  Settings2,
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Zap,
  Download
} from "lucide-react";
const Header = ({ onOpenProfileModal }) => {
  const {
    profile,
    language,
    setLanguage,
    activeExam,
    dailySessions,
    toggleTaskReminder,
    triggerStudyReminderToast,
    quickScheduleAllReminders,
    setActiveTab
  } = useApp();
  const [reminderMenuOpen, setReminderMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const activeReminders = dailySessions.filter((s) => s.reminderEnabled && !s.completed);
  const activeRemindersCount = activeReminders.length;
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setReminderMenuOpen(false);
      }
    }
    if (reminderMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [reminderMenuOpen]);
  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };
  return <>
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {
    /* Logo & Active Goal */
  }
            <div className="flex items-center space-x-3 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 border border-white/30 shrink-0">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight bg-linear-to-r from-slate-900 via-indigo-950 to-indigo-800 bg-clip-text text-transparent">
                  PragyaPath
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/60 backdrop-blur-md text-indigo-700 border border-indigo-200/80 shadow-2xs">
                  {activeExam?.name || profile.targetGoal}
                </span>
              </div>
            </div>

            {
    /* Right: Daily Reminder Bell + Streak + Language Toggle + Profile */
  }
            <div className="flex items-center space-x-2 sm:space-x-3">
              {
    /* Daily Study Reminder Notification Bell */
  }
              <div className="relative" ref={dropdownRef}>
                <button
    onClick={() => setReminderMenuOpen(!reminderMenuOpen)}
    className={`relative p-2 rounded-xl border transition-all cursor-pointer shadow-2xs ${reminderMenuOpen ? "bg-indigo-50 border-indigo-300 text-indigo-700" : "bg-white/60 hover:bg-white/90 border-white/80 text-slate-700 hover:text-indigo-600 backdrop-blur-md"}`}
    title="Daily Study Reminders & Alerts"
  >
                  <Bell className="w-4 h-4" />
                  {activeRemindersCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-white text-[9px] font-extrabold shadow-xs">
                      {activeRemindersCount}
                    </span>}
                </button>

                {
    /* Reminders Popover Menu */
  }
                {reminderMenuOpen && <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200/90 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          <Bell className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">Daily Study Reminders</h3>
                          <p className="text-[10px] text-slate-500">Toast notification alerts</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                        {activeRemindersCount} Active
                      </span>
                    </div>

                    {
    /* Task Reminder List */
  }
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {dailySessions.length === 0 ? <p className="text-xs text-slate-400 py-3 text-center">No planned tasks for today yet.</p> : dailySessions.map((session) => <div
    key={session.id}
    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all ${session.completed ? "bg-slate-50 border-slate-200 opacity-60" : session.reminderEnabled ? "bg-indigo-50/40 border-indigo-200/80" : "bg-white border-slate-200"}`}
  >
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                              <button
    onClick={() => toggleTaskReminder(session.id)}
    className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer shrink-0 ${session.reminderEnabled ? "bg-indigo-600 text-white" : "border border-slate-300 hover:border-indigo-500"}`}
    title="Toggle reminder alert"
  >
                                {session.reminderEnabled && <CheckCircle2 className="w-3 h-3" />}
                              </button>

                              <div className="flex-1 min-w-0">
                                <p
    className={`text-xs font-bold truncate ${session.completed ? "line-through text-slate-400" : "text-slate-900"}`}
  >
                                  {session.title}
                                </p>
                                <div className="text-[10px] text-slate-500 flex items-center space-x-1.5 mt-0.5">
                                  <Clock className="w-2.5 h-2.5" />
                                  <span>{session.durationMinutes}m</span>
                                  <span>•</span>
                                  <span className="font-semibold text-indigo-700">
                                    {session.reminderTime ? formatTime12h(session.reminderTime) : "Not set"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {!session.completed && <button
    onClick={() => triggerStudyReminderToast(session)}
    className="p-1.5 rounded-lg bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200/60 shadow-2xs transition-colors cursor-pointer shrink-0"
    title="Trigger Toast Alert"
  >
                                <Sparkles className="w-3 h-3" />
                              </button>}
                          </div>)}
                    </div>

                    {
    /* Popover Footer Actions */
  }
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
    onClick={() => {
      quickScheduleAllReminders();
    }}
    className="inline-flex items-center space-x-1 text-slate-600 hover:text-indigo-600 font-semibold cursor-pointer"
    title="Auto-assign scheduled times across the day"
  >
                        <Zap className="w-3 h-3 text-amber-500" />
                        <span>Quick Schedule</span>
                      </button>

                      <button
    onClick={() => {
      setReminderMenuOpen(false);
      setActiveTab("planner");
    }}
    className="inline-flex items-center space-x-1 font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
  >
                        <span>Open Planner</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>}
              </div>

              {
    /* Streak */
  }
              <div
    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-amber-50/70 backdrop-blur-md text-amber-900 text-xs font-semibold border border-amber-200/70 shadow-2xs"
    title="Daily Continuous Streak"
  >
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{profile.streakDays}d</span>
              </div>

              {
    /* Language Selector */
  }
              <div className="flex items-center rounded-xl border border-white/80 p-0.5 bg-white/50 backdrop-blur-md shadow-2xs text-[11px] font-medium">
                <button
    onClick={() => setLanguage("en")}
    className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${language === "en" ? "bg-white/95 text-indigo-700 font-bold shadow-xs border border-white/60" : "text-slate-600 hover:text-slate-900"}`}
  >
                  EN
                </button>
                <button
    onClick={() => setLanguage("hi")}
    className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${language === "hi" ? "bg-white/95 text-indigo-700 font-bold shadow-xs border border-white/60" : "text-slate-600 hover:text-slate-900"}`}
  >
                  हिन्दी
                </button>
                <button
    onClick={() => setLanguage("mr")}
    className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${language === "mr" ? "bg-white/95 text-indigo-700 font-bold shadow-xs border border-white/60" : "text-slate-600 hover:text-slate-900"}`}
  >
                  मराठी
                </button>
              </div>

              {
    /* MERN Pure JavaScript ZIP Download */
  }
              <a
    href="/pragyapath-mern-pure-javascript.zip"
    download="pragyapath-mern-pure-javascript.zip"
    className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer border border-emerald-500/30"
    title="Download complete MERN Stack Project (Pure JavaScript, No TSX)"
  >
                <Download className="w-3.5 h-3.5" />
                <span>MERN ZIP</span>
              </a>

              {
    /* User Profile */
  }
              <button
    onClick={onOpenProfileModal}
    className="flex items-center space-x-1.5 p-1 sm:px-2.5 sm:py-1 rounded-xl border border-white/80 bg-white/60 backdrop-blur-md hover:bg-white/90 hover:border-indigo-300 shadow-2xs transition-all cursor-pointer group"
    title="Profile & Settings"
  >
                <div className="w-6 h-6 rounded-lg bg-linear-to-tr from-indigo-600 to-purple-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs border border-white/20">
                  {getInitials(profile.name)}
                </div>
                <span className="text-xs font-semibold text-slate-800 hidden sm:inline group-hover:text-indigo-600 transition-colors">
                  {profile.name.split(" ")[0]}
                </span>
                <Settings2 className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 transition-colors hidden sm:inline" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>;
};
export {
  Header
};
