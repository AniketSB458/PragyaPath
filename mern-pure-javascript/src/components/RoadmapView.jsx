import { useState } from "react";
import confetti from "canvas-confetti";
import { useApp } from "../context/AppContext";
import { ROADMAPS_DATABASE } from "../data/mockData";
import {
  Route,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FastForward
} from "lucide-react";
const RoadmapView = () => {
  const { profile, activeRoadmap, setActiveRoadmap, toggleTopicCompletion, setActiveTab, t } = useApp();
  const [expandedPhases, setExpandedPhases] = useState({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false
  });
  const [customGoalInput, setCustomGoalInput] = useState("");
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const togglePhase = (phaseNumber) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseNumber]: !prev[phaseNumber]
    }));
  };
  const allTopics = activeRoadmap.phases.flatMap((p) => p.topics);
  const completedTopicsCount = allTopics.filter((t2) => profile.completedTopicIds.includes(t2.id)).length;
  const progressPercent = allTopics.length > 0 ? Math.round(completedTopicsCount / allTopics.length * 100) : 0;
  const totalHours = allTopics.reduce((acc, t2) => acc + t2.estimatedHours, 0);
  const remainingHours = allTopics.filter((t2) => !profile.completedTopicIds.includes(t2.id)).reduce((acc, t2) => acc + t2.estimatedHours, 0);
  const handleToggleTopic = (topic) => {
    const isNowCompleted = !profile.completedTopicIds.includes(topic.id);
    toggleTopicCompletion(topic.id);
    if (isNowCompleted) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };
  const handleGenerateCustomRoadmap = async () => {
    if (!customGoalInput.trim()) return;
    setIsGeneratingRoadmap(true);
    try {
      const newRoadmap = {
        id: `custom_${Date.now()}`,
        goalId: customGoalInput,
        title: `${customGoalInput} Accelerated Pathway`,
        description: `Custom generated roadmap synthesized for ${customGoalInput} based on your ${profile.dailyHours}h daily schedule.`,
        totalWeeks: 24,
        phases: [
          {
            phaseNumber: 1,
            phaseName: "Phase 1: Foundational Tools & Core Principles",
            durationWeeks: 6,
            objective: `Establish core vocabulary and fundamental toolchains for ${customGoalInput}.`,
            topics: [
              {
                id: `ct-1-${Date.now()}`,
                title: "Foundational Theory & Environment Setup",
                estimatedHours: 20,
                description: "Core concepts, prerequisite mathematical tools, and foundational workflows.",
                coreConcepts: ["System Basics", "Command Line", "Core Mathematics"],
                pyqCount: 15,
                completed: false
              },
              {
                id: `ct-2-${Date.now()}`,
                title: "Primary Domain Building Blocks",
                estimatedHours: 24,
                description: "The core algorithms and principles of this discipline.",
                coreConcepts: ["Architecture Design", "Protocols", "Analysis"],
                pyqCount: 20,
                completed: false
              }
            ]
          },
          {
            phaseNumber: 2,
            phaseName: "Phase 2: Intermediate Implementation & Systems",
            durationWeeks: 8,
            objective: "Build end-to-end working systems and solve structured problem sets.",
            topics: [
              {
                id: `ct-3-${Date.now()}`,
                title: "Advanced Applied Systems",
                estimatedHours: 28,
                description: "Integrating multiple components under realistic operational constraints.",
                coreConcepts: ["Optimization", "Reliability", "Testing"],
                pyqCount: 25,
                completed: false
              }
            ]
          },
          {
            phaseNumber: 3,
            phaseName: "Phase 3: Real-World Portfolio & Examination Mastery",
            durationWeeks: 10,
            objective: "Targeted competitive questions, peer-reviewed projects, and mock reviews.",
            topics: [
              {
                id: `ct-4-${Date.now()}`,
                title: "Capstone Deployment & Speed Drills",
                estimatedHours: 35,
                description: "Timed full-length mock scenarios and end-to-end portfolio review.",
                coreConcepts: ["Time Management", "Error Reduction", "Edge Cases"],
                pyqCount: 30,
                completed: false
              }
            ]
          }
        ]
      };
      setActiveRoadmap(newRoadmap);
      setCustomGoalInput("");
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };
  return <div className="space-y-4">
      {
    /* Sleek Compact Glass Header */
  }
      <div className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 rounded-2xl">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Route className="w-5 h-5 text-indigo-600" />
            <span className="tracking-tight">{activeRoadmap.title}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeRoadmap.description}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs shrink-0">
          <div className="bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/80 text-slate-700 shadow-2xs">
            <span>{t("roadmap_duration_label")} </span>
            <strong className="text-slate-900">{activeRoadmap.totalWeeks} {t("roadmap_weeks")}</strong>
          </div>
          <div className="bg-emerald-50/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-200/80 text-emerald-800 shadow-2xs">
            <span>{t("roadmap_completion_label")} </span>
            <strong className="font-bold">{progressPercent}%</strong>
          </div>
        </div>
      </div>

      {
    /* Switch Roadmaps or Generate Custom Roadmap */
  }
      <div className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {
    /* Preset Selector */
  }
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Target Exam Pathways:</span>
          {Object.values(ROADMAPS_DATABASE).map((r) => <button
    key={r.id}
    onClick={() => setActiveRoadmap(r)}
    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeRoadmap.id === r.id ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xs border border-white/20" : "bg-white/60 text-slate-700 hover:bg-white/90 border border-white/70"}`}
  >
              {r.title.replace(" Master Pathway", "").replace(" Master Preparation Roadmap", "").replace(" Pathway", "")}
            </button>)}
        </div>

        {
    /* Custom AI Roadmap Generator Input */
  }
        <div className="flex items-center space-x-2 w-full lg:w-auto">
          <input
    type="text"
    value={customGoalInput}
    onChange={(e) => setCustomGoalInput(e.target.value)}
    placeholder="e.g. State PSC, NEET, JEE, Railway RRB, CLAT, Defense..."
    className="text-xs px-3.5 py-2 rounded-xl glass-input w-full sm:w-72"
  />
          <button
    onClick={handleGenerateCustomRoadmap}
    disabled={isGeneratingRoadmap || !customGoalInput.trim()}
    className="px-3.5 py-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold whitespace-nowrap shadow-xs border border-white/20 disabled:opacity-50 cursor-pointer flex items-center space-x-1"
  >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Roadmap</span>
          </button>
        </div>
      </div>

      {
    /* Progress Bar */
  }
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-slate-700">
            Roadmap Completion: {completedTopicsCount} of {allTopics.length} Topics
          </span>
          <span className="font-extrabold text-indigo-600">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
    style={{ width: `${progressPercent}%` }}
  />
        </div>
      </div>

      {
    /* Multi-Phase Accordion */
  }
      <div className="space-y-4">
        {activeRoadmap.phases.map((phase) => {
    const isExpanded = expandedPhases[phase.phaseNumber] ?? true;
    const phaseDoneCount = phase.topics.filter((t2) => profile.completedTopicIds.includes(t2.id)).length;
    const isPhaseDone = phaseDoneCount === phase.topics.length && phase.topics.length > 0;
    return <div
      key={phase.phaseNumber}
      className={`glass-card rounded-2xl transition-all ${isPhaseDone ? "border-emerald-300/80 bg-emerald-50/40 shadow-xs" : "hover:border-white shadow-xs"}`}
    >
              {
      /* Phase Header */
    }
              <div
      onClick={() => togglePhase(phase.phaseNumber)}
      className="p-5 flex items-center justify-between cursor-pointer select-none"
    >
                <div className="flex items-center space-x-3.5">
                  <div
      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${isPhaseDone ? "bg-emerald-500 text-white" : "bg-indigo-100 text-indigo-700"}`}
    >
                    {isPhaseDone ? <CheckCircle2 className="w-5 h-5" /> : `P${phase.phaseNumber}`}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-slate-900">{phase.phaseName}</h3>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {phase.durationWeeks} Weeks
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{phase.objective}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-semibold text-slate-600">
                    {phaseDoneCount} / {phase.topics.length} done
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {
      /* Topics List */
    }
              {isExpanded && <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100">
                  {phase.topics.map((topic) => {
      const isCompleted = profile.completedTopicIds.includes(topic.id);
      return <div
        key={topic.id}
        className={`p-4 rounded-xl border transition-all ${isCompleted ? "bg-slate-50/60 border-slate-200 text-slate-400" : "bg-white border-slate-200/90 text-slate-900 hover:border-indigo-300 shadow-2xs"}`}
      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start space-x-3">
                            <button
        onClick={() => handleToggleTopic(topic)}
        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors cursor-pointer ${isCompleted ? "bg-emerald-500 text-white" : "border-2 border-slate-300 hover:border-indigo-600"}`}
      >
                              {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </button>

                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <h4
        className={`text-xs font-bold ${isCompleted ? "line-through text-slate-400" : "text-slate-900"}`}
      >
                                  {topic.title}
                                </h4>
                                <span className="text-[10px] text-slate-500 flex items-center space-x-1">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span>{topic.estimatedHours} hrs</span>
                                </span>
                              </div>

                              <p className="text-xs text-slate-600 leading-relaxed">
                                {topic.description}
                              </p>

                              {
        /* Core Concept Tags */
      }
                              <div className="flex flex-wrap gap-1 pt-1">
                                {topic.coreConcepts.map((cc, cIdx) => <span
        key={cIdx}
        className="text-[10px] bg-indigo-50/70 text-indigo-700 px-1.5 py-0.5 rounded font-medium border border-indigo-100"
      >
                                    {cc}
                                  </span>)}
                              </div>
                            </div>
                          </div>

                          {
        /* Action Buttons on Right */
      }
                          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                            {
        /* Skip / Fast Forward Button */
      }
                            {!isCompleted && <button
        onClick={() => handleToggleTopic(topic)}
        className="inline-flex items-center space-x-1 text-[11px] font-semibold text-slate-500 hover:text-indigo-700 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50 transition-colors cursor-pointer"
        title="Already know this? Skip repetition and mark completed!"
      >
                                <FastForward className="w-3 h-3" />
                                <span>I already know this</span>
                              </button>}

                            {
        /* Open Free Resource */
      }
                            <button
        onClick={() => setActiveTab("resources")}
        className="inline-flex items-center space-x-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 px-2.5 py-1 rounded-lg bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200 transition-colors cursor-pointer"
      >
                              <BookOpen className="w-3 h-3" />
                              <span>Free Lecture</span>
                            </button>

                            {
        /* PYQ Count Badge */
      }
                            <button
        onClick={() => setActiveTab("practice")}
        className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
      >
                              <HelpCircle className="w-3 h-3 text-emerald-600" />
                              <span>{topic.pyqCount} PYQs</span>
                            </button>
                          </div>
                        </div>
                      </div>;
    })}
                </div>}
            </div>;
  })}
      </div>
    </div>;
};
export {
  RoadmapView
};
