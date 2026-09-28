import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { DailyStudySession } from '../types';
import {
  CalendarCheck2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  CheckCircle2,
  Sparkles,
  Flame,
  AlertCircle,
  Lightbulb,
  CheckSquare,
  Layers,
} from 'lucide-react';

export const DailyPlannerView: React.FC = () => {
  const {
    profile,
    updateProfile,
    dailySessions,
    toggleDailySession,
    addDailySession,
    focusTimer,
    t,
  } = useApp();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('General Studies & Aptitude');
  const [newTaskDuration, setNewTaskDuration] = useState(45);
  const [newTaskType, setNewTaskType] = useState<DailyStudySession['sessionType']>('Concept & Theory');
  const [newTaskPriority, setNewTaskPriority] = useState<DailyStudySession['priority']>('high');
  const [showAddModal, setShowAddModal] = useState(false);

  const completedCount = dailySessions.filter((s) => s.completed).length;
  const totalCount = dailySessions.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const totalMinutes = dailySessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const completedMinutes = dailySessions
    .filter((s) => s.completed)
    .reduce((acc, s) => acc + s.durationMinutes, 0);

  const handleToggleTask = (session: DailyStudySession) => {
    const isNowCompleted = !session.completed;
    toggleDailySession(session.id);

    if (isNowCompleted) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
      });
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addDailySession({
      title: newTaskTitle,
      subject: newTaskSubject,
      topic: newTaskSubject,
      durationMinutes: newTaskDuration,
      sessionType: newTaskType,
      priority: newTaskPriority,
    });

    setNewTaskTitle('');
    setShowAddModal(false);
  };

  // Re-balance study schedule according to hours
  const handleRebalanceSchedule = (hours: number) => {
    updateProfile({ dailyHours: hours });
    confetti({ particleCount: 30, spread: 45 });
  };

  return (
    <div className="space-y-4">
      {/* Sleek Compact Glass Header */}
      <div className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 rounded-2xl">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <CalendarCheck2 className="w-5 h-5 text-indigo-600" />
            <span className="tracking-tight">{t('planner_banner_title')}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('planner_banner_desc')}
          </p>
        </div>

        {/* Daily Hours Selector */}
        <div className="flex items-center space-x-1.5 text-xs shrink-0">
          <span className="text-slate-500 font-medium hidden sm:inline">{t('planner_available_hours')}:</span>
          {[2, 3, 4, 6].map((hrs) => (
            <button
              key={hrs}
              onClick={() => handleRebalanceSchedule(hrs)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                profile.dailyHours === hrs
                  ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xs border border-white/20'
                  : 'bg-white/60 hover:bg-white/90 text-slate-700 border border-white/80 backdrop-blur-md'
              }`}
            >
              {hrs}h
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column: Left Tasks & Balance, Right Pomodoro Focus Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Tasks List & Balance Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-indigo-600" />
                  <span>{t('planner_today_schedule')}</span>
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
                <span>{t('planner_btn_add_task')}</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* 50/25/15/10 Rule Banner */}
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

            {/* Task Items */}
            <div className="space-y-3">
              {dailySessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => handleToggleTask(session)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    session.completed
                      ? 'bg-slate-50/70 border-slate-200 text-slate-400'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200/90 text-slate-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <button
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        session.completed
                          ? 'bg-emerald-500 text-white'
                          : 'border-2 border-slate-300 hover:border-indigo-600'
                      }`}
                    >
                      {session.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>

                    <div className="space-y-1">
                      <p
                        className={`text-xs font-bold ${
                          session.completed ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}
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
                          <span>{session.durationMinutes} mins</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      session.priority === 'high'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : session.priority === 'medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {session.priority.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Focus Timer & Scientific Recall Principles */}
        <div className="lg:col-span-5 space-y-6">
          {/* Integrated Pomodoro Deep Work Timer */}
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

            {/* Timer Dial Display */}
            <div className="py-4">
              <div className="w-48 h-48 mx-auto rounded-full border-8 border-indigo-200/60 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md shadow-inner">
                <span className="font-mono text-4xl font-extrabold tracking-tight text-indigo-950">
                  {String(focusTimer.minutes).padStart(2, '0')}:
                  {String(focusTimer.seconds).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-bold text-slate-400 mt-1 uppercase">
                  {focusTimer.isRunning ? 'Active Focus Sprint' : 'Paused'}
                </span>
              </div>
            </div>

            {/* Quick Intervals */}
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

            {/* Timer Action Controls */}
            <div className="flex items-center justify-center space-x-3 pt-2">
              {focusTimer.isRunning ? (
                <button
                  onClick={focusTimer.pause}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Pause className="w-4 h-4 fill-slate-900" />
                  <span>Pause Timer</span>
                </button>
              ) : (
                <button
                  onClick={focusTimer.start}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Focus Session</span>
                </button>
              )}

              <button
                onClick={() => focusTimer.reset(25)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cognitive Science Study Tip */}
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

      {/* Modal: Add Custom Task */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Add Custom Study Task</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
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
                    onChange={(e) => setNewTaskType(e.target.value as any)}
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
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
