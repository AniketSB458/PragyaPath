import { useApp } from "../context/AppContext";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  CalendarCheck2,
  ShieldAlert,
  Bell
} from "lucide-react";
import { formatTime12h } from "../utils/sound";
import { VisualPerformanceDashboard } from "./VisualPerformanceDashboard";
import { TopicMasteryHeatmap } from "./TopicMasteryHeatmap";
import { Badges } from "./Badges";
import { ConsistencyStreak } from "./ConsistencyStreak";
import { FocusTimer } from "./FocusTimer";
const DashboardView = () => {
  const {
    profile,
    setActiveTab,
    dailySessions,
    toggleDailySession,
    activeRoadmap,
    t,
    focusTimer
  } = useApp();
  const completedSessions = dailySessions.filter((s) => s.completed).length;
  const totalSessions = dailySessions.length;
  const progressPercent = totalSessions > 0 ? Math.round(completedSessions / totalSessions * 100) : 0;
  const allTopics = activeRoadmap.phases.flatMap((p) => p.topics);
  const completedTopicsCount = allTopics.filter((t2) => profile.completedTopicIds.includes(t2.id)).length;
  const roadmapPercent = allTopics.length > 0 ? Math.round(completedTopicsCount / allTopics.length * 100) : 0;
  const accuracy = profile.questionsSolved > 0 ? Math.round(profile.correctAnswers / profile.questionsSolved * 100) : 0;
  return <div className="space-y-4">
      {
    /* Sleek Compact Glass Header */
  }
      <div className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 rounded-2xl">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="tracking-tight">{t("dash_welcome")}, {profile.name}!</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("dash_intro_1")} <strong className="text-slate-800">{profile.targetGoal}</strong>. {t("dash_intro_2")}
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
    onClick={() => setActiveTab("resources")}
    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs border border-white/20"
  >
            <span>{t("nav_resources")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
    onClick={() => setActiveTab("practice")}
    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs border border-white/20"
  >
            <span>{t("dash_btn_pyq")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {
    /* The PragyaPath 8-Step Navigation Continuum */
  }
      <div className="glass-card rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t("dash_continuum_title")}
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">{t("dash_continuum_subtitle")}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
    { step: t("dash_step_1"), tab: "careers", desc: t("dash_step_1_desc") },
    { step: t("dash_step_2"), tab: "exams", desc: t("dash_step_2_desc") },
    { step: t("dash_step_3"), tab: "roadmap", desc: t("dash_step_3_desc") },
    { step: t("dash_step_4"), tab: "resources", desc: t("dash_step_4_desc") },
    { step: t("dash_step_5"), tab: "planner", desc: t("dash_step_5_desc") },
    { step: t("dash_step_6"), tab: "practice", desc: t("dash_step_6_desc") },
    { step: t("dash_step_7"), tab: "mocks", desc: t("dash_step_7_desc") },
    { step: t("dash_step_8"), tab: "mentor", desc: t("dash_step_8_desc") }
  ].map((item, idx) => <button
    key={idx}
    onClick={() => setActiveTab(item.tab)}
    className="group text-left p-2.5 rounded-xl border border-white/70 hover:border-indigo-400 bg-white/50 hover:bg-white/90 backdrop-blur-md transition-all cursor-pointer shadow-2xs"
  >
              <div className="text-[11px] font-bold text-indigo-700 group-hover:text-indigo-900 flex items-center justify-between">
                <span>{item.step}</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">{item.desc}</p>
            </button>)}
        </div>
      </div>

      {
    /* Visual Performance Dashboard: Historical Mock Test Scores & Topic Study Time */
  }
      <VisualPerformanceDashboard />

      {
    /* Topic Mastery Heatmap: Recharts Subject Spectrum & Subtopic Diagnostic Matrix */
  }
      <TopicMasteryHeatmap />

      {
    /* Consistency Streak Tracker with Milestone Shields & Rolling Calendar */
  }
      <ConsistencyStreak />

      {
    /* Motivational Achievement Badges: Consistency King, Early Bird, etc. */
  }
      <Badges />

      {
    /* Main 3-Column Dashboard Content */
  }
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {
    /* Left Column: Today's Action Items & Focus Timer */
  }
        <div className="lg:col-span-2 space-y-6">
          {
    /* Today's Study Planner Card */
  }
          <div className="glass-card rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <CalendarCheck2 className="w-5 h-5 text-indigo-600" />
                  <span>{t("today_plan")}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t("dash_allocated_hours")}: {profile.dailyHours} hours
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                  {completedSessions} of {totalSessions} {t("dash_completed_of")} ({progressPercent}%)
                </span>
                <button
    onClick={() => setActiveTab("planner")}
    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
  >
                  {t("dash_full_timetable")}
                </button>
              </div>
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
    /* List of Today's Sessions */
  }
            <div className="space-y-2.5">
              {dailySessions.map((session) => <div
    key={session.id}
    onClick={() => toggleDailySession(session.id)}
    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${session.completed ? "bg-slate-50/70 border-slate-200 text-slate-400" : "bg-white hover:bg-slate-50/80 border-slate-200/80 text-slate-900 shadow-2xs"}`}
  >
                  <div className="flex items-center space-x-3">
                    <button
    className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${session.completed ? "bg-emerald-500 text-white" : "border-2 border-slate-300 hover:border-indigo-600"}`}
  >
                      {session.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>

                    <div>
                      <p
    className={`text-xs font-bold ${session.completed ? "line-through text-slate-400" : "text-slate-800"}`}
  >
                        {session.title}
                      </p>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-indigo-600">{session.subject}</span>
                        <span>•</span>
                        <span>{session.sessionType}</span>
                        <span>•</span>
                        <span>{session.durationMinutes} mins</span>
                        {session.reminderEnabled && session.reminderTime && <>
                            <span>•</span>
                            <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                              <Bell className="w-2.5 h-2.5" />
                              <span>{formatTime12h(session.reminderTime)}</span>
                            </span>
                          </>}
                      </div>
                    </div>
                  </div>

                  <span
    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${session.priority === "high" ? "bg-red-50 text-red-700 border border-red-200/60" : "bg-slate-100 text-slate-600"}`}
  >
                    {session.priority.toUpperCase()}
                  </span>
                </div>)}
            </div>
          </div>

          {
    /* Dedicated Active Focus Timer Component with Performance Sync */
  }
          <FocusTimer />

          {
    /* Active Roadmap Overview Card */
  }
          <div className="glass-card rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span>{activeRoadmap.title}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t("dash_roadmap_progress")}: {roadmapPercent}% • {completedTopicsCount} of {allTopics.length} {t("dash_topics_mastered")}
                </p>
              </div>

              <button
    onClick={() => setActiveTab("roadmap")}
    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
  >
                {t("dash_expand_roadmap")}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeRoadmap.phases.slice(0, 4).map((phase) => {
    const phaseDoneCount = phase.topics.filter((t2) => profile.completedTopicIds.includes(t2.id)).length;
    const isComplete = phaseDoneCount === phase.topics.length && phase.topics.length > 0;
    return <div
      key={phase.phaseNumber}
      className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 transition-all"
    >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                        Phase {phase.phaseNumber} • {phase.durationWeeks} Weeks
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {phaseDoneCount}/{phase.topics.length} topics
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{phase.phaseName}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{phase.objective}</p>

                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3 overflow-hidden">
                      <div
      className={`h-1.5 rounded-full ${isComplete ? "bg-emerald-500" : "bg-indigo-600"}`}
      style={{
        width: `${phase.topics.length > 0 ? phaseDoneCount / phase.topics.length * 100 : 0}%`
      }}
    />
                    </div>
                  </div>;
  })}
            </div>
          </div>
        </div>

        {
    /* Right Column: Weakness Detection & Diagnostics */
  }
        <div className="space-y-6">
          {
    /* Continuous Weakness Detection Engine Card */
  }
          <div className="glass-card rounded-2xl p-5 border-rose-300/60 bg-rose-50/30 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-300/60 flex items-center justify-center text-rose-600">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                    {t("weak_areas")}
                  </h3>
                  <p className="text-[11px] text-rose-600 font-medium">
                    {t("dash_weak_card_subtitle")}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full border border-rose-200">
                {profile.weakTopics.length} detected
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              {t("dash_weak_card_desc")}
            </p>

            <div className="space-y-2">
              {profile.weakTopics.map((topic, i) => <div
    key={i}
    className="p-3 rounded-xl bg-white/70 backdrop-blur-xs border border-rose-200/80 flex items-start justify-between gap-2 shadow-2xs"
  >
                  <div>
                    <p className="text-xs font-bold text-slate-900">{topic}</p>
                    <p className="text-[10px] text-rose-700 mt-0.5">
                      Accuracy &lt; 60% in recent question tests
                    </p>
                  </div>
                  <button
    onClick={() => setActiveTab("practice")}
    className="shrink-0 text-[10px] font-bold bg-white text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 shadow-2xs transition-colors cursor-pointer"
  >
                    Solve PYQs →
                  </button>
                </div>)}
            </div>

            <div className="mt-4 pt-3 border-t border-rose-200/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">{t("dash_need_guidance")}</span>
              <button
    onClick={() => setActiveTab("mentor")}
    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
  >
                {t("dash_discuss_mentor")}
              </button>
            </div>
          </div>

          {
    /* Strong Foundations Card */
  }
          <div className="glass-card rounded-2xl p-5 border-emerald-300/60 bg-emerald-50/20 shadow-xs">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-300/60 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {t("strong_areas")}
                </h3>
                <p className="text-[11px] text-emerald-600 font-medium">{t("dash_high_accuracy")}</p>
              </div>
            </div>

            <div className="space-y-2">
              {profile.strongTopics.map((topic, i) => <div
    key={i}
    className="p-2.5 rounded-xl bg-white/70 backdrop-blur-xs border border-emerald-200/80 flex items-center justify-between shadow-2xs"
  >
                  <span className="text-xs font-semibold text-slate-800">{topic}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                    {t("dash_mastered_badge")}
                  </span>
                </div>)}
            </div>
          </div>

          {
    /* Official Eligibility Status Badge */
  }
          <div className="glass-card rounded-2xl p-5 border-indigo-200/80 bg-linear-to-br from-white/70 to-indigo-50/40 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                {t("dash_eligibility_title")}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {t("dash_eligibility_badge")}
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">
              {t("dash_eligibility_status_verified")}
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
              {t("dash_eligibility_desc")} ({profile.degreeOrStream})
            </p>
            <button
    onClick={() => setActiveTab("exams")}
    className="w-full py-2 text-center text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-xl transition-all shadow-2xs cursor-pointer"
  >
              {t("dash_run_deep_check")}
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export {
  DashboardView
};
