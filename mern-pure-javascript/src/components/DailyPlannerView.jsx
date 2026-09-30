import { useState } from "react";
import confetti from "canvas-confetti";
import { useApp } from "../context/AppContext";
import { formatTime12h, playReminderChime, requestNotificationPermission } from "../utils/sound";
import {
  CalendarCheck2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  CheckSquare,
  Bell,
  BellRing,
  Volume2,
  Zap
} from "lucide-react";
const DailyPlannerView = () => {
  const {
    profile,
    updateProfile,
    dailySessions,
    toggleDailySession,
    addDailySession,
    setTaskReminder,
    toggleTaskReminder,
    triggerStudyReminderToast,
    quickScheduleAllReminders,
    startFocusForSession,
    showToast,
    focusTimer,
    t
  } = useApp();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSubject, setNewTaskSubject] = useState("General Studies & Aptitude");
  const [newTaskDuration, setNewTaskDuration] = useState(45);
  const [newTaskType, setNewTaskType] = useState("Concept & Theory");
  const [newTaskPriority, setNewTaskPriority] = useState("high");
  const [newTaskReminderEnabled, setNewTaskReminderEnabled] = useState(true);
  const [newTaskReminderTime, setNewTaskReminderTime] = useState("09:00");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [reminderModalTime, setReminderModalTime] = useState("09:00");
  const [reminderModalEnabled, setReminderModalEnabled] = useState(true);
  const completedCount = dailySessions.filter((s) => s.completed).length;
  const totalCount = dailySessions.length;
  const progressPercent = totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0;
  const totalMinutes = dailySessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const completedMinutes = dailySessions.filter((s) => s.completed).reduce((acc, s) => acc + s.durationMinutes, 0);
  const activeRemindersCount = dailySessions.filter((s) => s.reminderEnabled && !s.completed).length;
  const handleToggleTask = (session) => {
    const isNowCompleted = !session.completed;
    toggleDailySession(session.id);
    if (isNowCompleted) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 }
      });
    }
  };
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addDailySession({
      title: newTaskTitle,
      subject: newTaskSubject,
      topic: newTaskSubject,
      durationMinutes: newTaskDuration,
      sessionType: newTaskType,
      priority: newTaskPriority,
      reminderTime: newTaskReminderEnabled ? newTaskReminderTime : void 0,
      reminderEnabled: newTaskReminderEnabled
    });
    setNewTaskTitle("");
    setShowAddModal(false);
  };
  const openReminderEditor = (session, e) => {
    if (e) e.stopPropagation();
    setEditingSession(session);
    setReminderModalTime(session.reminderTime || "09:00");
    setReminderModalEnabled(session.reminderEnabled ?? true);
  };
  const saveReminderChanges = () => {
    if (!editingSession) return;
    setTaskReminder(editingSession.id, reminderModalTime, reminderModalEnabled);
    setEditingSession(null);
  };
  const handleTestReminder = (session, e) => {
    if (e) e.stopPropagation();
    triggerStudyReminderToast(session);
  };
  const handleTestChimeOnly = () => {
    playReminderChime();
    showToast("Synthesized notification chime played!", "info");
  };
  const handleRequestBrowserPerm = async () => {
    const perm = await requestNotificationPermission();
    if (perm === "granted") {
      showToast("Desktop notifications enabled alongside toasts!", "success");
    } else {
      showToast("Browser notifications blocked. Toasts will continue to alert you in-app.", "info");
    }
  };
  const handleRebalanceSchedule = (hours) => {
    updateProfile({ dailyHours: hours });
    confetti({ particleCount: 30, spread: 45 });
  };
  const presetTimes = [
    { label: "Morning", time: "08:00", icon: "\u{1F305}" },
    { label: "Mid-Morning", time: "10:30", icon: "\u2600\uFE0F" },
    { label: "Afternoon", time: "14:00", icon: "\u{1F324}\uFE0F" },
    { label: "Evening", time: "18:00", icon: "\u{1F306}" },
    { label: "Night", time: "21:00", icon: "\u{1F319}" }
  ];
  return <div className="space-y-4">
      {
    /* Sleek Compact Glass Header */
  }
      <div className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 rounded-2xl">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <CalendarCheck2 className="w-5 h-5 text-indigo-600" />
            <span className="tracking-tight">{t("planner_banner_title")}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("planner_banner_desc")}
          </p>
        </div>

        {
    /* Daily Hours Selector */
  }
        <div className="flex items-center space-x-1.5 text-xs shrink-0">
          <span className="text-slate-500 font-medium hidden sm:inline">{t("planner_available_hours")}:</span>
          {[2, 3, 4, 6].map((hrs) => <button
    key={hrs}
    onClick={() => handleRebalanceSchedule(hrs)}
    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${profile.dailyHours === hrs ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xs border border-white/20" : "bg-white/60 hover:bg-white/90 text-slate-700 border border-white/80 backdrop-blur-md"}`}
  >
              {hrs}h
            </button>)}
        </div>
      </div>

      {
    /* Daily Study Reminders Control Bar */
  }
      <div className="glass-card rounded-2xl p-4 border border-indigo-200/70 bg-linear-to-r from-indigo-50/60 via-purple-50/40 to-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start sm:items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
            <BellRing className="w-5 h-5 animate-wiggle" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xs font-bold text-slate-900">Daily Study Reminders (Toast Notifications)</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                {activeRemindersCount} Active Today
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Scheduled tasks display interactive toast notifications with audio chimes and one-click Focus Sprint launch.
            </p>
          </div>
        </div>

        {
    /* Action Buttons */
  }
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
          <button
    onClick={() => {
      const pending = dailySessions.find((s) => !s.completed) || dailySessions[0];
      if (pending) {
        triggerStudyReminderToast(pending);
      }
    }}
    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
    title="Immediately trigger a live toast reminder for the next upcoming study task"
  >
            <Bell className="w-3.5 h-3.5" />
            <span>Test Reminder Toast</span>
          </button>

          <button
    onClick={quickScheduleAllReminders}
    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-indigo-600 border border-slate-200/80 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
    title="Auto-assign scheduled times across the day for all planned tasks"
  >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Quick Schedule All</span>
          </button>

          <button
    onClick={handleTestChimeOnly}
    className="p-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-600 hover:text-indigo-600 border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
    title="Test synthetic notification chime"
  >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {
    /* Main 2-Column: Left Tasks & Balance, Right Pomodoro Focus Suite */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {
    /* Left Column: Tasks List & Balance Breakdown */
  }
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-indigo-600" />
                  <span>{t("planner_today_schedule")}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {completedMinutes} of {totalMinutes} study minutes completed ({progressPercent}%)
                </p>
              </div>

              <button
    onClick={() => setShowAddModal(true)}
    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold shadow-xs border border-white/20 transition-all cursor-pointer"
  >
                <Plus className="w-3.5 h-3.5" />
                <span>{t("planner_btn_add_task")}</span>
              </button>
            </div>

            {
    /* Progress Bar */
  }
            <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
              <div
    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
    style={{ width: `${progressPercent}%` }}
  />
            </div>

            {
    /* 50/25/15/10 Rule Banner */
  }
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-4 text-xs text-slate-600">
              <div className="flex items-center justify-between font-bold text-[11px] text-slate-700 uppercase mb-1">
                <span>Cognitive Balance Allocation:</span>
                <span className="text-indigo-600">Active Recall Formula</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                <div className="bg-white p-1 rounded border border-slate-200">50% Theory</div>
                <div className="bg-white p-1 rounded border border-slate-200">25% PYQs</div>
                <div className="bg-white p-1 rounded border border-slate-200">15% Revision</div>
                <div className="bg-white p-1 rounded border border-slate-200">10% Quiz</div>
              </div>
            </div>

            {
    /* Task Items */
  }
            <div className="space-y-3">
              {dailySessions.map((session) => <div
    key={session.id}
    onClick={() => handleToggleTask(session)}
    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${session.completed ? "bg-slate-50/70 border-slate-200 text-slate-400" : "bg-white hover:bg-slate-50/80 border-slate-200/90 text-slate-900 shadow-2xs"}`}
  >
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <button
    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${session.completed ? "bg-emerald-500 text-white" : "border-2 border-slate-300 hover:border-indigo-600"}`}
  >
                      {session.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>

                    <div className="space-y-1 flex-1 min-w-0">
                      <p
    className={`text-xs font-bold leading-tight ${session.completed ? "line-through text-slate-400" : "text-slate-900"}`}
  >
                        {session.title}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                        <span className="font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                          {session.subject}
                        </span>
                        <span>•</span>
                        <span>{session.sessionType}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1 font-medium">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{session.durationMinutes}m</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {
    /* Right side: Reminder Pill + Priority + Actions */
  }
                  <div
    className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0"
    onClick={(e) => e.stopPropagation()}
  >
                    {
    /* Reminder Status Badge & Trigger */
  }
                    {session.reminderEnabled && session.reminderTime ? <button
    onClick={(e) => openReminderEditor(session, e)}
    className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer shadow-2xs ${session.completed ? "bg-slate-100 text-slate-400 border-slate-200" : "bg-emerald-50/90 hover:bg-emerald-100 text-emerald-800 border-emerald-200/80 group"}`}
    title="Click to edit reminder time or toggle"
  >
                        <Bell className="w-3 h-3 text-emerald-600 group-hover:scale-110 transition-transform" />
                        <span>{formatTime12h(session.reminderTime)}</span>
                      </button> : <button
    onClick={(e) => openReminderEditor(session, e)}
    className="flex items-center space-x-1 px-2 py-1 rounded-lg text-[10px] font-semibold text-slate-500 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition-all cursor-pointer"
    title="Set daily reminder"
  >
                        <Bell className="w-3 h-3" />
                        <span>+ Reminder</span>
                      </button>}

                    {
    /* Quick Test Toast for this task */
  }
                    {!session.completed && <button
    onClick={(e) => handleTestReminder(session, e)}
    className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors cursor-pointer"
    title="Trigger toast reminder now"
  >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>}

                    {
    /* Launch Focus Timer for this task */
  }
                    {!session.completed && <button
    onClick={() => startFocusForSession(session)}
    className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 transition-all cursor-pointer"
    title={`Start focus timer (${session.durationMinutes}m)`}
  >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>}

                    {
    /* Priority Badge */
  }
                    <span
    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${session.priority === "high" ? "bg-rose-50 text-rose-700 border border-rose-200" : session.priority === "medium" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-slate-100 text-slate-600"}`}
  >
                      {session.priority.toUpperCase()}
                    </span>
                  </div>
                </div>)}
            </div>
          </div>
        </div>

        {
    /* Right Column: Focus Timer & Scientific Recall Principles */
  }
        <div className="lg:col-span-5 space-y-6">
          {
    /* Integrated Pomodoro Deep Work Timer */
  }
          <div className="glass-card rounded-3xl p-6 shadow-sm text-center space-y-5 border border-white/80">
            <div>
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-white/70 px-2.5 py-1 rounded-full border border-indigo-200/80 shadow-2xs">
                Deep Work Mode
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                Integrated Pomodoro Focus Timer
              </h3>
              <p className="text-xs text-slate-500">
                Retain 40% more information with timed concentration sprints
              </p>
            </div>

            {
    /* Timer Dial Display */
  }
            <div className="py-4">
              <div className="w-48 h-48 mx-auto rounded-full border-8 border-indigo-200/60 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md shadow-inner">
                <span className="font-mono text-4xl font-extrabold tracking-tight text-indigo-950">
                  {String(focusTimer.minutes).padStart(2, "0")}:
                  {String(focusTimer.seconds).padStart(2, "0")}
                </span>
                <span className="text-[11px] font-bold text-slate-400 mt-1 uppercase">
                  {focusTimer.isRunning ? "Active Focus Sprint" : "Paused"}
                </span>
              </div>
            </div>

            {
    /* Quick Intervals */
  }
            <div className="flex items-center justify-center space-x-2">
              <button
    onClick={() => focusTimer.reset(25)}
    className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
  >
                25m Standard
              </button>
              <button
    onClick={() => focusTimer.reset(50)}
    className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
  >
                50m Deep Work
              </button>
              <button
    onClick={() => focusTimer.reset(5)}
    className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
  >
                5m Break
              </button>
            </div>

            {
    /* Timer Action Controls */
  }
            <div className="flex items-center justify-center space-x-3 pt-2">
              {focusTimer.isRunning ? <button
    onClick={focusTimer.pause}
    className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs shadow-md transition-all cursor-pointer"
  >
                  <Pause className="w-4 h-4 fill-slate-900" />
                  <span>Pause Timer</span>
                </button> : <button
    onClick={focusTimer.start}
    className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
  >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Focus Session</span>
                </button>}

              <button
    onClick={() => focusTimer.reset(25)}
    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
    title="Reset Timer"
  >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {
    /* Desktop Notification Opt-in Card */
  }
          <div className="bg-indigo-50/70 rounded-2xl border border-indigo-200/80 p-5 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-indigo-950 font-bold text-xs">
                <Bell className="w-4 h-4 text-indigo-600" />
                <span>Smart Study Reminders</span>
              </div>
              <button
    onClick={handleRequestBrowserPerm}
    className="text-[10px] font-bold text-indigo-700 hover:underline cursor-pointer"
  >
                Browser Permission
              </button>
            </div>
            <p className="text-xs text-indigo-950/80 leading-relaxed">
              PragyaPath delivers study reminders through in-app toast notifications. Keep this tab open or pinned in your browser to never miss your study slots.
            </p>
          </div>

          {
    /* Cognitive Science Study Tip */
  }
          <div className="bg-amber-50/70 rounded-2xl border border-amber-200/80 p-5 shadow-2xs">
            <div className="flex items-center space-x-2 text-amber-900 mb-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Pragya Pedagogical Principle: The Testing Effect
              </h4>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed">
              Passively re-reading notes creates an illusion of competence. Attempting 5 hard PYQs where you struggle produces up to <strong>300% higher neural retention</strong> than re-watching lecture videos.
            </p>
          </div>
        </div>
      </div>

      {
    /* Modal: Configure Study Reminder */
  }
      {editingSession && <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Set Daily Study Reminder</h3>
                  <p className="text-[11px] text-slate-500">Toast notification alert</p>
                </div>
              </div>
              <button
    onClick={() => setEditingSession(null)}
    className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
  >
                ×
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-bold text-slate-900 text-xs">{editingSession.title}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  {editingSession.subject} • {editingSession.durationMinutes} mins
                </div>
              </div>

              {
    /* Enable toggle */
  }
              <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <div>
                  <div className="font-bold text-indigo-950 text-xs">Enable Reminder Alert</div>
                  <div className="text-indigo-700/80 text-[11px]">Show toast notification at scheduled time</div>
                </div>
                <input
    type="checkbox"
    checked={reminderModalEnabled}
    onChange={(e) => setReminderModalEnabled(e.target.checked)}
    className="w-5 h-5 accent-indigo-600 cursor-pointer rounded"
  />
              </div>

              {
    /* Time Selector */
  }
              {reminderModalEnabled && <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Reminder Time (24-Hour / Local Clock)
                    </label>
                    <input
    type="time"
    value={reminderModalTime}
    onChange={(e) => setReminderModalTime(e.target.value)}
    className="w-full px-3 py-2 text-sm font-mono font-bold rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Formatted as: <strong className="text-slate-800">{formatTime12h(reminderModalTime)}</strong>
                    </p>
                  </div>

                  {
    /* Preset Buttons */
  }
                  <div>
                    <span className="block font-bold text-slate-700 mb-1.5">Quick Presets:</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {presetTimes.map((preset) => <button
    key={preset.time}
    type="button"
    onClick={() => setReminderModalTime(preset.time)}
    className={`p-2 rounded-lg text-center border transition-all cursor-pointer ${reminderModalTime === preset.time ? "bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs" : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80"}`}
  >
                          <div className="text-[11px]">{preset.icon} {preset.label}</div>
                          <div className="text-[10px] font-mono mt-0.5 opacity-90">{formatTime12h(preset.time)}</div>
                        </button>)}
                    </div>
                  </div>
                </div>}

              {
    /* Buttons */
  }
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
    type="button"
    onClick={() => handleTestReminder(editingSession)}
    className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer"
  >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Test Toast Alert Now</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
    type="button"
    onClick={() => setEditingSession(null)}
    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
  >
                    Cancel
                  </button>
                  <button
    type="button"
    onClick={saveReminderChanges}
    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer shadow-xs"
  >
                    Save Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {
    /* Modal: Add Custom Task */
  }
      {showAddModal && <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Add Custom Study Task</h3>
              <button
    onClick={() => setShowAddModal(false)}
    className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
  >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Task Title</label>
                <input
    type="text"
    required
    value={newTaskTitle}
    onChange={(e) => setNewTaskTitle(e.target.value)}
    placeholder="e.g. Solve 10 Paging & TLB Gate PYQs"
    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <input
    type="text"
    value={newTaskSubject}
    onChange={(e) => setNewTaskSubject(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration (Mins)</label>
                  <input
    type="number"
    min="10"
    max="180"
    value={newTaskDuration}
    onChange={(e) => setNewTaskDuration(Number(e.target.value))}
    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Session Type</label>
                  <select
    value={newTaskType}
    onChange={(e) => setNewTaskType(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
  >
                    <option value="Concept & Theory">Concept & Theory</option>
                    <option value="PYQ Practice">PYQ Practice</option>
                    <option value="Weak Topic Revision">Weak Topic Revision</option>
                    <option value="Adaptive Quiz">Adaptive Quiz</option>
                    <option value="Mock Test">Mock Test</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
    value={newTaskPriority}
    onChange={(e) => setNewTaskPriority(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              {
    /* Study Reminder Configuration in Add Modal */
  }
              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-indigo-950 font-bold">
                    <Bell className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Set Daily Study Reminder</span>
                  </div>
                  <input
    type="checkbox"
    checked={newTaskReminderEnabled}
    onChange={(e) => setNewTaskReminderEnabled(e.target.checked)}
    className="w-4 h-4 accent-indigo-600 cursor-pointer rounded"
  />
                </div>

                {newTaskReminderEnabled && <div className="pt-1">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Reminder Time ({formatTime12h(newTaskReminderTime)})
                    </label>
                    <input
    type="time"
    value={newTaskReminderTime}
    onChange={(e) => setNewTaskReminderTime(e.target.value)}
    className="w-full px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
  />
                  </div>}
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
    type="button"
    onClick={() => setShowAddModal(false)}
    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
  >
                  Cancel
                </button>
                <button
    type="submit"
    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
  >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  DailyPlannerView
};
