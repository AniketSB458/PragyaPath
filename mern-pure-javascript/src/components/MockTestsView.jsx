import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useApp } from "../context/AppContext";
import { MOCK_TESTS } from "../data/mockData";
import { api } from "../services/api";
import {
  Award,
  Clock,
  RotateCcw,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  History
} from "lucide-react";
const MockTestsView = () => {
  const { profile, updateProfile, addWeakTopic, resolveWeakTopic, setActiveTab, showToast, t, recentAttempts, refreshAttempts } = useApp();
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);
  useEffect(() => {
    let timer = null;
    if (isTestActive && timeRemainingSeconds > 0) {
      timer = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1e3);
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeRemainingSeconds]);
  const handleStartTest = (test) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setTestAnswers({});
    setTimeRemainingSeconds(test.durationMinutes * 60);
    setIsTestActive(true);
    setSubmissionResult(null);
    setIsMobilePaletteOpen(false);
    showToast(`Started timed mock: ${test.title} (${test.durationMinutes}m)`, "info");
  };
  const handleSelectOption = (optionIndex) => {
    setTestAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };
  const handleSubmitTest = () => {
    if (!activeTest) return;
    setIsTestActive(false);
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let totalScore = 0;
    const weakDetected = [];
    const strongDetected = [];
    activeTest.questions.forEach((q, idx) => {
      const ans = testAnswers[idx];
      if (ans === void 0) {
        unattemptedCount++;
      } else if (ans === q.correctAnswerIndex) {
        correctCount++;
        totalScore += 2;
        strongDetected.push(q.topic);
      } else {
        incorrectCount++;
        totalScore -= 2 * activeTest.negativeMarkRatio;
        weakDetected.push(q.topic);
        addWeakTopic(q.topic);
      }
    });
    totalScore = Math.max(0, Math.round(totalScore * 10) / 10);
    const accuracy = correctCount + incorrectCount > 0 ? Math.round(correctCount / (correctCount + incorrectCount) * 100) : 0;
    const timeSpent = activeTest.durationMinutes * 60 - timeRemainingSeconds;
    const result = {
      testId: activeTest.id,
      score: totalScore,
      totalMarks: activeTest.questions.length * 2,
      accuracyPercent: accuracy,
      timeSpentSeconds: timeSpent,
      correctCount,
      incorrectCount,
      unattemptedCount,
      strongAreas: Array.from(new Set(strongDetected)),
      weakAreas: Array.from(new Set(weakDetected)),
      actionRecommendation: accuracy >= 75 ? "Exceptional mastery demonstrated! Proceed with Phase 3 advanced topics." : "Focus on identified weak topics using the Daily Planner before attempting full-length mocks."
    };
    setSubmissionResult(result);
    showToast(`Test submitted! Scored ${totalScore}/${activeTest.questions.length * 2} (${accuracy}%)`, "success");
    const email = profile.email || "anyabandgar458@gmail.com";
    api.practice.saveAttempt({
      ...result,
      userId: email,
      testTitle: activeTest.title
    }).then(() => {
      refreshAttempts();
    }).catch((err) => {
      console.warn("Could not record attempt to MongoDB:", err);
    });
    updateProfile({
      questionsSolved: profile.questionsSolved + (correctCount + incorrectCount),
      correctAnswers: profile.correctAnswers + correctCount
    });
    if (accuracy >= 60) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    }
  };
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remSecs).padStart(2, "0")}`;
  };
  return <div className="space-y-4">
      {
    /* Sleek Compact Glass Header */
  }
      {!isTestActive && <div className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 rounded-2xl">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <span className="tracking-tight">{t("mocks_banner_title")}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t("mocks_banner_desc")}
            </p>
          </div>
        </div>}

      {
    /* View Mode 1: Active Test CBT Interface */
  }
      {isTestActive && activeTest ? <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-4 sm:p-6 space-y-6">
          {
    /* CBT Sticky Header */
  }
          <div className="sticky top-16 md:top-28 z-20 bg-white/95 backdrop-blur-md -mx-4 -mt-4 p-4 sm:p-0 sm:mx-0 sm:mt-0 sm:static border-b border-slate-100 sm:border-0 pb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-indigo-700 uppercase bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                {activeTest.exam} Simulation
              </span>
              <h2 className="text-xs sm:text-base font-bold text-slate-900 mt-0.5 line-clamp-1">
                {activeTest.title}
              </h2>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              {
    /* Timer Dial */
  }
              <div
    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold shadow-xs ${timeRemainingSeconds < 300 ? "bg-rose-600 text-white animate-pulse" : "bg-slate-900 text-white"}`}
  >
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>{formatTime(timeRemainingSeconds)}</span>
              </div>

              {
    /* Mobile Palette Toggle Button */
  }
              <button
    onClick={() => setIsMobilePaletteOpen(!isMobilePaletteOpen)}
    className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center space-x-1 text-xs font-semibold"
    title="Toggle Question Palette"
  >
                <LayoutGrid className="w-4 h-4 text-indigo-600" />
                <span className="hidden xs:inline">
                  {Object.keys(testAnswers).length}/{activeTest.questions.length}
                </span>
              </button>

              <button
    onClick={handleSubmitTest}
    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
  >
                Submit Test
              </button>
            </div>
          </div>

          {
    /* Question Palettes & Active Question */
  }
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {
    /* Question Workspace */
  }
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-slate-800">
                  Question {currentQuestionIndex + 1} of {activeTest.questions.length}
                </span>
                <span className="text-indigo-600 font-semibold text-[11px] sm:text-xs">
                  +2.0 Marks • Negative: -0.66
                </span>
              </div>

              {
    /* Current Question */
  }
              {(() => {
    const question = activeTest.questions[currentQuestionIndex];
    const selected = testAnswers[currentQuestionIndex];
    return <div className="space-y-4">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed font-sans">
                      {question.question}
                    </p>

                    <div className="space-y-2.5">
                      {question.options.map((opt, oIdx) => {
      const isChosen = selected === oIdx;
      return <button
        key={oIdx}
        onClick={() => handleSelectOption(oIdx)}
        className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-start space-x-3 transition-all cursor-pointer ${isChosen ? "bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-1 ring-indigo-600/30" : "bg-white hover:bg-slate-50 border-slate-200/90 text-slate-700"}`}
      >
                            <span
        className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${isChosen ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}
      >
                              {["A", "B", "C", "D"][oIdx]}
                            </span>
                            <span className="flex-1 mt-0.5 leading-relaxed">{opt}</span>
                          </button>;
    })}
                    </div>
                  </div>;
  })()}

              {
    /* Pagination Controls */
  }
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
    disabled={currentQuestionIndex === 0}
    onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
    className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer flex items-center space-x-1"
  >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
    onClick={() => {
      if (currentQuestionIndex < activeTest.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        handleSubmitTest();
      }
    }}
    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center space-x-1"
  >
                  <span>
                    {currentQuestionIndex === activeTest.questions.length - 1 ? "Submit Test" : "Next Question"}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {
    /* Right: Question Palette Grid (Always visible on desktop, toggleable on mobile) */
  }
            <div
    className={`lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-4 ${isMobilePaletteOpen ? "block" : "hidden lg:block"}`}
  >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Question Palette
                </h4>
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {Object.keys(testAnswers).length} / {activeTest.questions.length} Answered
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {activeTest.questions.map((_, qIdx) => {
    const isAnswered = testAnswers[qIdx] !== void 0;
    const isCurrent = currentQuestionIndex === qIdx;
    return <button
      key={qIdx}
      onClick={() => {
        setCurrentQuestionIndex(qIdx);
        setIsMobilePaletteOpen(false);
      }}
      className={`h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${isCurrent ? "ring-2 ring-indigo-600 ring-offset-1 bg-indigo-600 text-white" : isAnswered ? "bg-emerald-500 text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"}`}
    >
                      {qIdx + 1}
                    </button>;
  })}
              </div>

              <div className="pt-3 border-t border-slate-200 text-[11px] space-y-1.5 text-slate-600">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <span>Answered ({Object.keys(testAnswers).length})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-white border border-slate-300 shrink-0" />
                  <span>
                    Unattempted ({activeTest.questions.length - Object.keys(testAnswers).length})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> : submissionResult && activeTest ? (
    /* View Mode 2: Submission Diagnostics Report */
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                Diagnostic Assessment Report
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">{activeTest.title}</h2>
            </div>

            <button
      onClick={() => handleStartTest(activeTest)}
      className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
    >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Test</span>
            </button>
          </div>

          {
      /* Key Metrics */
    }
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
              <span className="text-[10px] font-bold text-indigo-700 uppercase">Your Score</span>
              <p className="text-xl sm:text-2xl font-extrabold text-indigo-950 mt-1">
                {submissionResult.score} / {submissionResult.totalMarks}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Accuracy</span>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-950 mt-1">
                {submissionResult.accuracyPercent}%
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-600 uppercase">Breakdown</span>
              <p className="text-xs font-bold text-slate-800 mt-1">
                ✅ {submissionResult.correctCount} Correct • ❌ {submissionResult.incorrectCount} Wrong
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-600 uppercase">Time Spent</span>
              <p className="text-lg sm:text-xl font-bold text-slate-800 mt-1">
                {formatTime(submissionResult.timeSpentSeconds)}
              </p>
            </div>
          </div>

          {
      /* Action Recommendation */
    }
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
              Pragya Strategic Feedback
            </h4>
            <p className="text-xs text-amber-950 leading-relaxed">
              {submissionResult.actionRecommendation}
            </p>
          </div>

          {
      /* Weak Topics Found */
    }
          {submissionResult.weakAreas.length > 0 && <div className="space-y-2">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                Topics Requiring Remediation
              </h4>
              <div className="flex flex-wrap gap-2">
                {submissionResult.weakAreas.map((topic, idx) => <span
      key={idx}
      className="text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg"
    >
                    {topic}
                  </span>)}
              </div>
            </div>}

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-end gap-2">
            <button
      onClick={() => setActiveTab("planner")}
      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs text-center cursor-pointer"
    >
              Add Weak Topics to Daily Planner →
            </button>
          </div>
        </div>
  ) : (
    /* View Mode 3: Test Directory */
    <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_TESTS.map((test) => <div
      key={test.id}
      className="glass-card rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-white transition-all flex flex-col justify-between"
    >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60 uppercase">
                      {test.exam}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{test.durationMinutes} Minutes</span>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">{test.title}</h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Full computer-based test simulation featuring official previous-year questions and high-yield exam patterns. Negative marking applied to emulate real testing conditions.
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                    <div>
                      <span className="text-slate-400 text-[10px] font-bold uppercase">Questions:</span>
                      <p className="font-bold text-slate-800">{test.questions.length} Items</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] font-bold uppercase">Total Marks:</span>
                      <p className="font-bold text-slate-800">{test.totalMarks} Marks</p>
                    </div>
                  </div>
                </div>

                <button
      onClick={() => handleStartTest(test)}
      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
    >
                  <span>Launch Timed Mock Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>)}
          </div>

          {
      /* Recent Attempt History Section */
    }
          {recentAttempts && recentAttempts.length > 0 && <div className="glass-card rounded-2xl p-5 border border-white/80 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <History className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Recent Test Attempts & Diagnostics ({recentAttempts.length})
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50/80 px-2.5 py-0.5 rounded-full border border-indigo-200/60 shadow-2xs">
                  Saved Attempts
                </span>
              </div>

              <div className="space-y-3">
                {recentAttempts.slice(0, 4).map((att, idx) => <div
      key={att.id || att._id || idx}
      className="p-3.5 rounded-xl bg-white/80 border border-slate-200/80 hover:border-indigo-300 transition-all text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
    >
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{att.testTitle}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5 flex items-center space-x-2">
                        <span>
                          {new Date(att.createdAt || Date.now()).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })}
                        </span>
                        <span>•</span>
                        <span>Duration: {Math.floor((att.timeSpentSeconds || 0) / 60)}m {(att.timeSpentSeconds || 0) % 60}s</span>
                      </div>
                      {att.weakAreas && att.weakAreas.length > 0 && <div className="flex items-center space-x-1 mt-1.5 flex-wrap gap-1">
                          <span className="text-[10px] font-bold text-amber-700">Diagnosed Weak Topics:</span>
                          {att.weakAreas.map((w, wi) => <span
      key={wi}
      className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] border border-amber-200 font-medium"
    >
                              {w}
                            </span>)}
                        </div>}
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="text-right">
                        <div className="text-base font-extrabold text-indigo-700">
                          {att.score} <span className="text-xs text-slate-400 font-normal">/ {att.totalMarks}</span>
                        </div>
                        <div className="text-[10px] font-bold text-slate-500">
                          {att.accuracyPercent}% Accuracy
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-xs">
                        ✓ {att.correctCount}
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}
        </div>
  )}
    </div>;
};
export {
  MockTestsView
};
