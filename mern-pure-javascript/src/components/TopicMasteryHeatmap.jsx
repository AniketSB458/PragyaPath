import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell
} from "recharts";
import { useApp } from "../context/AppContext";
import {
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Layers,
  Zap,
  TrendingUp
} from "lucide-react";
const TopicMasteryHeatmap = () => {
  const { profile, setActiveTab, showToast } = useApp();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const masteryData = useMemo(() => {
    const isWeakInPolity = (profile.weakTopics || []).some((t) => t.toLowerCase().includes("polity"));
    const isWeakInQuant = (profile.weakTopics || []).some((t) => t.toLowerCase().includes("quant") || t.toLowerCase().includes("interpretation"));
    const isWeakInReasoning = (profile.weakTopics || []).some((t) => t.toLowerCase().includes("reasoning"));
    return [
      {
        subject: "Modern Indian History",
        shortSubject: "Modern History",
        masteryScore: 89,
        accuracy: 92,
        questionsTested: 42,
        status: "strength",
        color: "#10b981",
        // emerald
        subtopics: [
          { name: "1857 Revolt & British Expansion", score: 94, status: "strength", lastTested: "2 days ago" },
          { name: "Socio-Religious Reform Movements", score: 88, status: "strength", lastTested: "4 days ago" },
          { name: "Gandhian Mass Movements (1919-42)", score: 91, status: "strength", lastTested: "Yesterday" },
          { name: "Revolutionary Nationalism & Subhash Bose", score: 82, status: "strength", lastTested: "3 days ago" }
        ]
      },
      {
        subject: "General Science & Emerging Tech",
        shortSubject: "Gen Science",
        masteryScore: 84,
        accuracy: 86,
        questionsTested: 35,
        status: "strength",
        color: "#14b8a6",
        // teal
        subtopics: [
          { name: "ISRO Space Missions & Launchers", score: 92, status: "strength", lastTested: "3 days ago" },
          { name: "Biotechnology & Vaccines", score: 85, status: "strength", lastTested: "5 days ago" },
          { name: "AI, Quantum & Semiconductor Tech", score: 80, status: "strength", lastTested: "1 day ago" },
          { name: "Public Health, Nutrition & Immunology", score: 79, status: "moderate", lastTested: "6 days ago" }
        ]
      },
      {
        subject: "Environment & Ecology",
        shortSubject: "Environment",
        masteryScore: 81,
        accuracy: 83,
        questionsTested: 31,
        status: "strength",
        color: "#06b6d4",
        // cyan
        subtopics: [
          { name: "Biodiversity Hotspots & Biospheres", score: 88, status: "strength", lastTested: "4 days ago" },
          { name: "UNFCCC & International Treaties", score: 82, status: "strength", lastTested: "Yesterday" },
          { name: "Renewable Energy & Carbon Credits", score: 78, status: "moderate", lastTested: "5 days ago" },
          { name: "Pollution Control & Waste Management Rules", score: 76, status: "moderate", lastTested: "1 week ago" }
        ]
      },
      {
        subject: "Indian Economy & Macroeconomics",
        shortSubject: "Economy",
        masteryScore: 73,
        accuracy: 75,
        questionsTested: 38,
        status: "moderate",
        color: "#6366f1",
        // indigo
        subtopics: [
          { name: "RBI Monetary Policy & Repo Rates", score: 84, status: "strength", lastTested: "2 days ago" },
          { name: "Fiscal Deficit & Union Budget System", score: 74, status: "moderate", lastTested: "4 days ago" },
          { name: "Inflation Indices (CPI vs WPI)", score: 71, status: "moderate", lastTested: "Yesterday" },
          { name: "Balance of Payments & Forex Reserves", score: 63, status: "moderate", lastTested: "3 days ago" }
        ]
      },
      {
        subject: "Current Affairs & Schemes",
        shortSubject: "Current Affairs",
        masteryScore: 70,
        accuracy: 72,
        questionsTested: 29,
        status: "moderate",
        color: "#8b5cf6",
        // purple
        subtopics: [
          { name: "Key Central Welfare Schemes (DBT)", score: 78, status: "moderate", lastTested: "Today" },
          { name: "Multilateral Summits (G20, SCO, BRICS)", score: 74, status: "moderate", lastTested: "2 days ago" },
          { name: "Supreme Court Landmark Rulings 2026", score: 68, status: "moderate", lastTested: "3 days ago" },
          { name: "Defense Exercises & Bilateral Treaties", score: 60, status: "moderate", lastTested: "4 days ago" }
        ]
      },
      {
        subject: "Indian Polity & Governance",
        shortSubject: "Indian Polity",
        masteryScore: isWeakInPolity ? 59 : 76,
        accuracy: isWeakInPolity ? 61 : 78,
        questionsTested: 48,
        status: isWeakInPolity ? "weakness" : "moderate",
        color: isWeakInPolity ? "#f59e0b" : "#6366f1",
        // amber / warning
        subtopics: [
          { name: "Preamble & Fundamental Rights (Art 14-32)", score: 66, status: "moderate", lastTested: "Today" },
          { name: "Judicial Appointments & Review Powers", score: 58, status: "weakness", lastTested: "Yesterday" },
          { name: "Parliamentary Procedures & Money Bills", score: 56, status: "weakness", lastTested: "2 days ago" },
          { name: "Constitutional Bodies (Election Comm, CAG)", score: 54, status: "weakness", lastTested: "3 days ago" }
        ]
      },
      {
        subject: "General Intelligence & Reasoning",
        shortSubject: "Reasoning",
        masteryScore: isWeakInReasoning ? 54 : 74,
        accuracy: isWeakInReasoning ? 57 : 76,
        questionsTested: 36,
        status: isWeakInReasoning ? "weakness" : "moderate",
        color: isWeakInReasoning ? "#f97316" : "#6366f1",
        // orange
        subtopics: [
          { name: "Syllogisms & Venn Diagram Deductions", score: 65, status: "moderate", lastTested: "Yesterday" },
          { name: "Seating Arrangements & Complex Puzzles", score: 52, status: "weakness", lastTested: "Today" },
          { name: "Statement & Assumptions / Arguments", score: 51, status: "weakness", lastTested: "3 days ago" },
          { name: "Data Sufficiency & Analytical Reasoning", score: 48, status: "weakness", lastTested: "4 days ago" }
        ]
      },
      {
        subject: "Quantitative Aptitude & Data",
        shortSubject: "Quant & DI",
        masteryScore: isWeakInQuant ? 46 : 68,
        accuracy: isWeakInQuant ? 49 : 71,
        questionsTested: 50,
        status: isWeakInQuant ? "weakness" : "moderate",
        color: isWeakInQuant ? "#ef4444" : "#6366f1",
        // red / urgent remedial
        subtopics: [
          { name: "Percentages, Profit & Loss Equations", score: 54, status: "weakness", lastTested: "Today" },
          { name: "Time, Speed, Distance & Relative Motion", score: 45, status: "weakness", lastTested: "Yesterday" },
          { name: "Permutations, Combinations & Probability", score: 42, status: "weakness", lastTested: "2 days ago" },
          { name: "Data Interpretation Charts & Mixed Tables", score: 41, status: "weakness", lastTested: "Today" }
        ]
      }
    ];
  }, [profile.weakTopics]);
  const totalSubtopics = useMemo(() => {
    return masteryData.flatMap((s) => s.subtopics);
  }, [masteryData]);
  const strengthsCount = totalSubtopics.filter((t) => t.score >= 75).length;
  const moderateCount = totalSubtopics.filter((t) => t.score >= 60 && t.score < 75).length;
  const weaknessesCount = totalSubtopics.filter((t) => t.score < 60).length;
  const averageMastery = Math.round(
    masteryData.reduce((acc, s) => acc + s.masteryScore, 0) / (masteryData.length || 1)
  );
  const filteredChartData = useMemo(() => {
    let list = [...masteryData];
    if (selectedSubject !== "all") {
      list = list.filter((s) => s.subject === selectedSubject);
    }
    if (activeFilter === "strengths") {
      list = list.filter((s) => s.status === "strength");
    } else if (activeFilter === "weaknesses") {
      list = list.filter((s) => s.status === "weakness");
    } else if (activeFilter === "moderate") {
      list = list.filter((s) => s.status === "moderate");
    }
    return list;
  }, [masteryData, selectedSubject, activeFilter]);
  const matrixSubtopics = useMemo(() => {
    let list = [];
    masteryData.forEach((s) => {
      if (selectedSubject !== "all" && s.subject !== selectedSubject) return;
      s.subtopics.forEach((sub) => {
        if (activeFilter === "strengths" && sub.score < 75) return;
        if (activeFilter === "moderate" && (sub.score < 60 || sub.score >= 75)) return;
        if (activeFilter === "weaknesses" && sub.score >= 60) return;
        list.push({
          subject: s.subject,
          topic: sub.name,
          score: sub.score,
          status: sub.status,
          lastTested: sub.lastTested
        });
      });
    });
    return list.sort((a, b) => a.score - b.score);
  }, [masteryData, selectedSubject, activeFilter]);
  const getHeatmapColorClass = (score) => {
    if (score >= 85) return "bg-emerald-500 text-white border-emerald-600";
    if (score >= 75) return "bg-emerald-400 text-white border-emerald-500";
    if (score >= 65) return "bg-cyan-500 text-white border-cyan-600";
    if (score >= 60) return "bg-amber-400 text-amber-950 border-amber-500";
    if (score >= 50) return "bg-orange-500 text-white border-orange-600";
    return "bg-rose-500 text-white border-rose-600 animate-pulse";
  };
  const getHeatmapBgClass = (score) => {
    if (score >= 80) return "bg-emerald-50/90 border-emerald-200 text-emerald-950 hover:border-emerald-400";
    if (score >= 65) return "bg-cyan-50/90 border-cyan-200 text-cyan-950 hover:border-cyan-400";
    if (score >= 55) return "bg-amber-50/90 border-amber-200 text-amber-950 hover:border-amber-400";
    return "bg-rose-50/90 border-rose-200 text-rose-950 hover:border-rose-400";
  };
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 shadow-xl text-xs space-y-1.5 min-w-[220px]">
          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center justify-between">
            <span>{data.subject}</span>
            <span
        className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${data.status === "strength" ? "bg-emerald-100 text-emerald-800" : data.status === "moderate" ? "bg-blue-100 text-blue-800" : "bg-rose-100 text-rose-800"}`}
      >
              {data.status.toUpperCase()}
            </span>
          </div>
          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-slate-700">
              <span>Mastery Index:</span>
              <span className="font-bold font-mono text-sm text-indigo-700">{data.masteryScore}%</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Historical Accuracy:</span>
              <span className="font-bold font-mono">{data.accuracy}%</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Questions Evaluated:</span>
              <span className="font-mono">{data.questionsTested} PYQs</span>
            </div>
          </div>
          <div className="pt-1.5 border-t border-slate-100 text-[10px] text-slate-500">
            {data.status === "weakness" ? "\u26A0\uFE0F Recommended: Prioritize remedial PYQs & conceptual drills." : data.status === "strength" ? "\u2705 High Retention: Maintain mastery with periodic spaced quizzes." : "\u26A1 On Track: Convert to strength with timed mock test practice."}
          </div>
        </div>;
    }
    return null;
  };
  const handlePracticeTopic = (topicName) => {
    showToast(`Launching remedial drill for: ${topicName}`, "info");
    setActiveTab("practice");
  };
  return <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-6 border border-white/80 shadow-sm relative overflow-hidden">
      {
    /* Background Accent */
  }
      <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {
    /* Header with Title & Filter Tabs */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100/80 pb-4 relative z-10">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-indigo-600 to-rose-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                <span>Topic Mastery Heatmap</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {averageMastery}% Overall Index
                </span>
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visual breakdown of syllabus competency. Identifies high-yield strength zones and critical weakness areas requiring remedial focus.
          </p>
        </div>

        {
    /* Filter Controls */
  }
        <div className="flex flex-wrap items-center gap-2">
          {
    /* Status Filter Tabs */
  }
          <div className="flex items-center rounded-xl border border-slate-200/80 p-0.5 bg-slate-50/80 text-[11px] font-semibold">
            <button
    onClick={() => setActiveFilter("all")}
    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${activeFilter === "all" ? "bg-white text-indigo-700 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
  >
              All Topics ({totalSubtopics.length})
            </button>
            <button
    onClick={() => setActiveFilter("strengths")}
    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${activeFilter === "strengths" ? "bg-white text-emerald-700 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
  >
              Strengths ({strengthsCount})
            </button>
            <button
    onClick={() => setActiveFilter("moderate")}
    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${activeFilter === "moderate" ? "bg-white text-cyan-700 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
  >
              Developing ({moderateCount})
            </button>
            <button
    onClick={() => setActiveFilter("weaknesses")}
    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${activeFilter === "weaknesses" ? "bg-white text-rose-700 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
  >
              Weak Areas ({weaknessesCount})
            </button>
          </div>

          {
    /* Subject Filter Dropdown */
  }
          <select
    value={selectedSubject}
    onChange={(e) => setSelectedSubject(e.target.value)}
    className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-2xs"
  >
            <option value="all">All Subjects</option>
            {masteryData.map((s) => <option key={s.subject} value={s.subject}>
                {s.shortSubject}
              </option>)}
          </select>
        </div>
      </div>

      {
    /* KPI Diagnosis Strip */
  }
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold text-emerald-950 font-mono">
              {strengthsCount} <span className="text-xs font-normal text-slate-500">topics</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-800">Mastered Strengths (≥75%)</div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-cyan-50/70 border border-cyan-100 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-700 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold text-cyan-950 font-mono">
              {moderateCount} <span className="text-xs font-normal text-slate-500">topics</span>
            </div>
            <div className="text-[11px] font-bold text-cyan-800">Developing Competencies (60-74%)</div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-700 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold text-rose-950 font-mono">
              {weaknessesCount} <span className="text-xs font-normal text-slate-500">topics</span>
            </div>
            <div className="text-[11px] font-bold text-rose-800">Weakness Alerts (&lt;60%)</div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-700 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold text-indigo-950 font-mono">
              {averageMastery}%
            </div>
            <div className="text-[11px] font-bold text-indigo-800">Avg Exam Preparedness</div>
          </div>
        </div>
      </div>

      {
    /* Main Charts & Visualizations */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {
    /* Recharts Bar Chart: Subject Competency Heatmap Spectrum */
  }
        <div className="lg:col-span-6 rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Subject Mastery Spectrum (Recharts)</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Aggregated mastery indices across core subjects against 65% target cutoff.
              </p>
            </div>

            <button
    onClick={() => setActiveTab("practice")}
    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer"
  >
              <span>Solve PYQs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-72 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
    data={filteredChartData}
    layout="vertical"
    margin={{ top: 5, right: 25, left: 10, bottom: 5 }}
  >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />

                <XAxis
    type="number"
    domain={[0, 100]}
    tick={{ fill: "#64748b", fontSize: 11 }}
    axisLine={{ stroke: "#e2e8f0" }}
    tickLine={false}
    tickFormatter={(val) => `${val}%`}
  />

                <YAxis
    type="category"
    dataKey="shortSubject"
    tick={{ fill: "#334155", fontSize: 11, fontWeight: 500 }}
    axisLine={{ stroke: "#e2e8f0" }}
    tickLine={false}
    width={110}
  />

                <Tooltip content={<CustomBarTooltip />} />

                {
    /* Benchmark Lines */
  }
                <ReferenceLine
    x={65}
    stroke="#f59e0b"
    strokeDasharray="4 4"
    label={{
      value: "Cutoff 65%",
      fill: "#b45309",
      fontSize: 10,
      position: "top"
    }}
  />

                <ReferenceLine
    x={80}
    stroke="#10b981"
    strokeDasharray="3 3"
    label={{
      value: "Strength 80%",
      fill: "#059669",
      fontSize: 10,
      position: "top"
    }}
  />

                <Bar dataKey="masteryScore" radius={[0, 6, 6, 0]}>
                  {filteredChartData.map((entry, index) => <Cell key={`bar-${index}`} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {
    /* Color Legend */
  }
          <div className="flex flex-wrap items-center justify-between text-[11px] pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600">≥80% Strength</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span className="text-slate-600">65-79% Competent</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600">55-64% Attention</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-slate-600">&lt;55% Weakness</span>
              </div>
            </div>
          </div>
        </div>

        {
    /* Matrix Heatmap Grid: Subtopic Granular Cell Matrix */
  }
        <div className="lg:col-span-6 rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Subtopic Diagnostic Matrix</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Granular heat cells mapped by retention and question accuracy. Click to launch remedial drill.
                </p>
              </div>

              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {matrixSubtopics.length} Subtopics
              </span>
            </div>

            {
    /* Matrix Heat Cells */
  }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 sm:max-h-72 overflow-y-auto pr-1">
              {matrixSubtopics.map((item, idx) => <div
    key={idx}
    onClick={() => handlePracticeTopic(item.topic)}
    onMouseEnter={() => setHoveredTopic(item)}
    onMouseLeave={() => setHoveredTopic(null)}
    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${getHeatmapBgClass(
      item.score
    )}`}
  >
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-slate-500 truncate">
                      {item.subject.split("&")[0]}
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                      {item.topic}
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5">
                      Tested {item.lastTested}
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span
    className={`text-xs font-black font-mono px-2 py-0.5 rounded-lg border shadow-2xs ${getHeatmapColorClass(
      item.score
    )}`}
  >
                      {item.score}%
                    </span>
                    <span className="text-[9px] font-semibold text-slate-500 mt-1 capitalize">
                      {item.status}
                    </span>
                  </div>
                </div>)}
            </div>
          </div>

          {
    /* Quick Guidance Footer */
  }
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
            <span className="text-[11px]">
              💡 <strong>Action Insight:</strong> Focus on red cells to eliminate negative marking risks in prelims.
            </span>
            <button
    onClick={() => setActiveTab("practice")}
    className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 underline cursor-pointer shrink-0 ml-2"
  >
              Start Drill
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export {
  TopicMasteryHeatmap
};
