import { useState } from "react";
import confetti from "canvas-confetti";
import { useApp } from "../context/AppContext";
import { PYQ_BANK } from "../data/mockData";
import {
  CheckCircle2,
  XCircle,
  Bookmark,
  Sparkles,
  Star,
  BrainCircuit,
  Languages,
  Filter,
  RotateCcw,
  Loader2
} from "lucide-react";
const AdaptivePracticeView = () => {
  const {
    profile,
    updateProfile,
    toggleBookmarkQuestion,
    addWeakTopic,
    setActiveTab,
    showToast,
    t
  } = useApp();
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState({});
  const [conceptExplanation, setConceptExplanation] = useState(null);
  const [loadingExplanationKey, setLoadingExplanationKey] = useState(null);
  const [aiQuestions, setAiQuestions] = useState([]);
  const [isGeneratingAiQuestions, setIsGeneratingAiQuestions] = useState(false);
  const [generatingTopic, setGeneratingTopic] = useState("");
  const combinedQuestions = [...aiQuestions, ...PYQ_BANK];
  const dynamicSubjects = Array.from(/* @__PURE__ */ new Set(["All", ...combinedQuestions.map((q) => q.subject)]));
  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const filteredQuestions = combinedQuestions.filter((q) => {
    const matchSubject = selectedSubject === "All" || q.subject === selectedSubject;
    const matchDiff = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    return matchSubject && matchDiff;
  });
  const handleSelectOption = (question, optionIndex) => {
    if (selectedAnswers[question.id] !== void 0) return;
    setSelectedAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [question.id]: true }));
    const isCorrect = optionIndex === question.correctAnswerIndex;
    const newSolved = profile.questionsSolved + 1;
    const newCorrect = isCorrect ? profile.correctAnswers + 1 : profile.correctAnswers;
    updateProfile({
      questionsSolved: newSolved,
      correctAnswers: newCorrect
    });
    if (isCorrect) {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
    } else {
      addWeakTopic(question.topic);
    }
  };
  const handleExplainInLanguage = async (topic, lang) => {
    const key = `${topic}-${lang}`;
    setLoadingExplanationKey(key);
    try {
      const res = await fetch("/api/explain/concept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, language: lang })
      });
      const data = await res.json();
      if (data && data.explanation) {
        setConceptExplanation({
          topic,
          text: data.explanation,
          lang: lang === "hi" ? "\u0939\u093F\u0928\u094D\u0926\u0940 (Hindi)" : "\u092E\u0930\u093E\u0920\u0940 (Marathi)"
        });
      } else {
        showToast("Could not fetch explanation. Please try again.", "error");
      }
    } catch (e) {
      console.error(e);
      showToast("Network error while retrieving explanation.", "error");
    } finally {
      setLoadingExplanationKey(null);
    }
  };
  const handleGenerateAiPractice = async (weakTopic) => {
    setIsGeneratingAiQuestions(true);
    setGeneratingTopic(weakTopic);
    try {
      const res = await fetch("/api/practice/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: weakTopic,
          difficulty: "Medium",
          count: 2
        })
      });
      const data = await res.json();
      if (data && data.questions && Array.isArray(data.questions)) {
        const mapped = data.questions.map((q, i) => ({
          id: `ai-gen-${Date.now()}-${i}`,
          exam: "Pragya Adaptive AI Generator",
          year: 2026,
          subject: q.subject || "Target Remedial Drill",
          topic: weakTopic,
          difficulty: q.difficulty || "Medium",
          question: q.question,
          options: q.options || [
            "Mutual Exclusion invariant",
            "Progress invariant",
            "Bounded waiting",
            "Starvation avoidance"
          ],
          correctAnswerIndex: typeof q.correctAnswerIndex === "number" ? q.correctAnswerIndex : 0,
          explanation: q.explanation || "Detailed concept derivation.",
          keyConcept: q.keyConcept || weakTopic,
          frequencyRating: 5
        }));
        setAiQuestions((prev) => [...mapped, ...prev]);
        showToast(`Generated 2 remedial questions for "${weakTopic}"`, "success");
        confetti({ particleCount: 40, spread: 60 });
      } else {
        showToast("Could not formulate questions. Retrying with fallback.", "warning");
      }
    } catch (e) {
      console.error(e);
      showToast("Error connecting to AI service.", "error");
    } finally {
      setIsGeneratingAiQuestions(false);
      setGeneratingTopic("");
    }
  };
  const handleResetFilters = () => {
    setSelectedSubject("All");
    setSelectedDifficulty("All");
  };
  return <div className="space-y-4">
      {
    /* Sleek Compact Glass Header */
  }
      <div className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 rounded-2xl">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-indigo-600" />
            <span className="tracking-tight">{t("practice_banner_title")}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("practice_banner_desc")}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs shrink-0">
          <div className="bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/80 text-slate-700 shadow-2xs">
            <span>{t("practice_total_solved")}: </span>
            <strong className="text-slate-900">{profile.questionsSolved}</strong>
          </div>
          <div className="bg-emerald-50/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-200/80 text-emerald-800 shadow-2xs">
            <span>{t("practice_accuracy_rate")}: </span>
            <strong className="font-bold">
              {profile.questionsSolved > 0 ? Math.round(profile.correctAnswers / profile.questionsSolved * 100) : 0}
              %
            </strong>
          </div>
        </div>
      </div>

      {
    /* Filter Bar & AI Generator Trigger */
  }
      <div className="glass-card rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {
    /* Subject Filters */
  }
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {dynamicSubjects.map((sub) => <button
    key={sub}
    onClick={() => setSelectedSubject(sub)}
    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${selectedSubject === sub ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xs border border-white/20" : "bg-white/60 text-slate-700 hover:bg-white/90 border border-white/70"}`}
  >
                {sub}
              </button>)}
          </div>

          {
    /* Difficulty Filter */
  }
          <div className="flex items-center space-x-1 border border-white/80 rounded-xl p-0.5 bg-white/50 backdrop-blur-md text-xs shrink-0 self-end md:self-auto shadow-2xs">
            {difficulties.map((diff) => <button
    key={diff}
    onClick={() => setSelectedDifficulty(diff)}
    className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${selectedDifficulty === diff ? "bg-white text-indigo-700 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
  >
                {diff}
              </button>)}
          </div>
        </div>
      </div>

      {
    /* Loading AI State Banner */
  }
      {isGeneratingAiQuestions && <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center space-x-3 text-indigo-900 animate-pulse">
          <Loader2 className="w-5 h-5 text-indigo-600 animate-spin shrink-0" />
          <div>
            <p className="text-xs font-bold">
              Synthesizing targeted practice drill for "{generatingTopic}"...
            </p>
            <p className="text-[11px] text-indigo-700">
              Formulating authentic exam-pattern options and rigorous step-by-step derivations.
            </p>
          </div>
        </div>}

      {
    /* Empty State when Filter returns 0 */
  }
      {filteredQuestions.length === 0 && !isGeneratingAiQuestions && <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              No questions found for the selected criteria
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              We couldn't find any questions matching subject "{selectedSubject}" with difficulty "{selectedDifficulty}".
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
    onClick={handleResetFilters}
    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
  >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>

            <button
    onClick={() => handleGenerateAiPractice(selectedSubject === "All" ? "Computer Networks" : selectedSubject)}
    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
  >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate AI Practice on {selectedSubject === "All" ? "Target Topic" : selectedSubject}</span>
            </button>
          </div>
        </div>}

      {
    /* Questions Feed */
  }
      <div className="space-y-6">
        {filteredQuestions.map((q) => {
    const userAnswer = selectedAnswers[q.id];
    const hasAnswered = userAnswer !== void 0;
    const isCorrect = userAnswer === q.correctAnswerIndex;
    const isBookmarked = profile.bookmarkedQuestionIds.includes(q.id);
    return <div
      key={q.id}
      className="glass-card rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all space-y-4"
    >
              {
      /* Question Header Meta */
    }
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/60">
                    {q.exam} {q.year}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {q.subject} • {q.topic}
                  </span>
                  <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${q.difficulty === "Easy" ? "bg-emerald-100 text-emerald-800" : q.difficulty === "Medium" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"}`}
    >
                    {q.difficulty}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-amber-400" title="Historical PYQ Frequency Weightage">
                    {Array.from({ length: q.frequencyRating || 4 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                  </div>

                  <button
      onClick={() => toggleBookmarkQuestion(q.id)}
      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
      title={isBookmarked ? "Remove Bookmark" : "Save to My Library"}
    >
                    <Bookmark
      className={`w-4 h-4 ${isBookmarked ? "fill-indigo-600 text-indigo-600" : ""}`}
    />
                  </button>
                </div>
              </div>

              {
      /* Question Prompt */
    }
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed font-sans">
                {q.question}
              </p>

              {
      /* Multiple Choice Options */
    }
              <div className="space-y-2">
                {q.options.map((opt, optIndex) => {
      let optionClass = "border-slate-200/90 bg-slate-50/50 hover:bg-indigo-50/40 hover:border-indigo-300 text-slate-800";
      if (hasAnswered) {
        if (optIndex === q.correctAnswerIndex) {
          optionClass = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold";
        } else if (userAnswer === optIndex) {
          optionClass = "border-rose-500 bg-rose-50 text-rose-950 font-bold";
        } else {
          optionClass = "border-slate-200 opacity-60 text-slate-500";
        }
      }
      const optionLabels = ["A", "B", "C", "D"];
      return <button
        key={optIndex}
        disabled={hasAnswered}
        onClick={() => handleSelectOption(q, optIndex)}
        className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-start space-x-3 transition-all cursor-pointer ${optionClass}`}
      >
                      <span
        className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${hasAnswered && optIndex === q.correctAnswerIndex ? "bg-emerald-600 text-white" : hasAnswered && userAnswer === optIndex ? "bg-rose-600 text-white" : "bg-white border border-slate-300 text-slate-700"}`}
      >
                        {optionLabels[optIndex]}
                      </span>
                      <span className="flex-1 mt-0.5 leading-relaxed">{opt}</span>
                    </button>;
    })}
              </div>

              {
      /* Feedback and Rigorous Derivation Explanation */
    }
              {hasAnswered && <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                  <div
      className={`p-4 rounded-xl border flex items-start space-x-3 ${isCorrect ? "bg-emerald-50/70 border-emerald-200 text-emerald-900" : "bg-rose-50/70 border-rose-200 text-rose-900"}`}
    >
                    {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}

                    <div className="space-y-1">
                      <p className="text-xs font-bold">
                        {isCorrect ? "Correct Solution! +1 Mark" : `Incorrect! Option ${["A", "B", "C", "D"][q.correctAnswerIndex]} was the correct answer.`}
                      </p>
                      <p className="text-xs leading-relaxed opacity-95">{q.explanation}</p>
                      <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
                        <span className="text-indigo-800">Core Conceptual Principle:</span>
                        <span className="bg-white/80 px-2 py-0.5 rounded text-indigo-950 border border-indigo-200">
                          {q.keyConcept}
                        </span>
                      </div>
                    </div>
                  </div>

                  {
      /* Remedial Triggers & Multilingual Action Bar */
    }
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
      onClick={() => handleExplainInLanguage(q.topic, "hi")}
      disabled={loadingExplanationKey === `${q.topic}-hi`}
      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-semibold transition-colors cursor-pointer disabled:opacity-60"
    >
                        {loadingExplanationKey === `${q.topic}-hi` ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Languages className="w-3.5 h-3.5" />}
                        <span>{t("practice_btn_explain_hindi")}</span>
                      </button>

                      <button
      onClick={() => handleExplainInLanguage(q.topic, "mr")}
      disabled={loadingExplanationKey === `${q.topic}-mr`}
      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-semibold transition-colors cursor-pointer disabled:opacity-60"
    >
                        {loadingExplanationKey === `${q.topic}-mr` ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Languages className="w-3.5 h-3.5" />}
                        <span>{t("practice_btn_explain_marathi")}</span>
                      </button>
                    </div>

                    {!isCorrect && <button
      onClick={() => handleGenerateAiPractice(q.topic)}
      disabled={isGeneratingAiQuestions}
      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Generate 2 AI Practice Questions</span>
                      </button>}
                  </div>
                </div>}
            </div>;
  })}
      </div>

      {
    /* Multilingual Explanation Modal */
  }
      {conceptExplanation && <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Languages className="w-5 h-5 text-indigo-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  Concept Primer in {conceptExplanation.lang}
                </h3>
              </div>
              <button
    onClick={() => setConceptExplanation(null)}
    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold"
  >
                ×
              </button>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-serif max-h-[60vh] overflow-y-auto">
              {conceptExplanation.text}
            </div>

            <div className="flex justify-end pt-1">
              <button
    onClick={() => setConceptExplanation(null)}
    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all cursor-pointer"
  >
                Got It! Return to Practice
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  AdaptivePracticeView
};
