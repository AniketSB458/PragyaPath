import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
  TrendingUp,
  Clock,
  BarChart3,
  ArrowUpRight,
  Zap
} from "lucide-react";
const VisualPerformanceDashboard = () => {
  const { profile, dailySessions, recentAttempts, setActiveTab, t } = useApp();
  const [activeView, setActiveView] = useState("both");
  const [timeFilter, setTimeFilter] = useState("all");
  const mockTrendData = useMemo(() => {
    const defaultHistoricalMocks = [
      {
        name: "Mock 1: Diagnostic Baseline",
        shortName: "Mock 1",
        date: "Aug 15",
        score: 58,
        accuracy: 62,
        cutoff: 65,
        questions: 50
      },
      {
        name: "Mock 2: Quantitative & Aptitude Drill",
        shortName: "Mock 2",
        date: "Aug 24",
        score: 64,
        accuracy: 69,
        cutoff: 65,
        questions: 40
      },
      {
        name: "Mock 3: Indian Polity Sectional",
        shortName: "Mock 3",
        date: "Sep 02",
        score: 72,
        accuracy: 75,
        cutoff: 65,
        questions: 45
      },
      {
        name: "Mock 4: History & Culture Sprint",
        shortName: "Mock 4",
        date: "Sep 10",
        score: 76,
        accuracy: 78,
        cutoff: 65,
        questions: 50
      },
      {
        name: "Mock 5: Comprehensive Prelims Mock I",
        shortName: "Mock 5",
        date: "Sep 18",
        score: 81,
        accuracy: 84,
        cutoff: 65,
        questions: 60
      },
      {
        name: "Mock 6: Full Length Simulated Test",
        shortName: "Mock 6",
        date: "Sep 26",
        score: 86,
        accuracy: 89,
        cutoff: 65,
        questions: 75
      }
    ];
    if (recentAttempts && recentAttempts.length > 0) {
      const dynamicPoints = recentAttempts.map((attempt, idx) => {
        const scorePercent = attempt.totalQuestions > 0 ? Math.round(attempt.score / (attempt.totalQuestions * 2) * 100) : attempt.accuracyPercentage || 75;
        const dateStr = attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString([], { month: "short", day: "numeric" }) : `Recent ${idx + 1}`;
        return {
          name: attempt.testTitle || `Mock Test ${defaultHistoricalMocks.length + idx + 1}`,
          shortName: `Test ${defaultHistoricalMocks.length + idx + 1}`,
          date: dateStr,
          score: scorePercent,
          accuracy: attempt.accuracyPercentage || scorePercent,
          cutoff: 65,
          questions: attempt.totalQuestions || 25
        };
      });
      return [...defaultHistoricalMocks, ...dynamicPoints];
    }
    return defaultHistoricalMocks;
  }, [recentAttempts]);
  const filteredMockData = useMemo(() => {
    if (timeFilter === "recent") {
      return mockTrendData.slice(-3);
    }
    if (timeFilter === "month") {
      return mockTrendData.slice(-5);
    }
    return mockTrendData;
  }, [mockTrendData, timeFilter]);
  const topicTimeData = useMemo(() => {
    const subjectsMap = {
      "Indian Polity & Governance": { totalMins: 390, theory: 200, practice: 130, revision: 60, color: "#4f46e5" },
      // 6.5h
      "Quantitative Aptitude": { totalMins: 315, theory: 120, practice: 150, revision: 45, color: "#8b5cf6" },
      // 5.25h
      "History & Culture": { totalMins: 270, theory: 150, practice: 75, revision: 45, color: "#06b6d4" },
      // 4.5h
      "General Intelligence": { totalMins: 240, theory: 80, practice: 120, revision: 40, color: "#10b981" },
      // 4.0h
      "General Science": { totalMins: 210, theory: 110, practice: 70, revision: 30, color: "#f59e0b" },
      // 3.5h
      "Current Affairs & Schemes": { totalMins: 165, theory: 90, practice: 45, revision: 30, color: "#ec4899" }
      // 2.75h
    };
    dailySessions.forEach((s) => {
      const match = Object.keys(subjectsMap).find((k) => s.subject.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(s.subject.toLowerCase()));
      if (match) {
        subjectsMap[match].totalMins += s.durationMinutes;
        if (s.sessionType.includes("Practice") || s.sessionType.includes("PYQ")) {
          subjectsMap[match].practice += s.durationMinutes;
        } else if (s.sessionType.includes("Revision") || s.sessionType.includes("Quiz")) {
          subjectsMap[match].revision += s.durationMinutes;
        } else {
          subjectsMap[match].theory += s.durationMinutes;
        }
      }
    });
    return Object.entries(subjectsMap).map(([subject, stats]) => {
      const shortSubject = subject.length > 18 ? subject.split("&")[0].trim() : subject;
      return {
        subject,
        shortSubject,
        hours: parseFloat((stats.totalMins / 60).toFixed(1)),
        minutes: stats.totalMins,
        theoryMinutes: stats.theory,
        practiceMinutes: stats.practice,
        revisionMinutes: stats.revision,
        color: stats.color
      };
    }).sort((a, b) => b.hours - a.hours);
  }, [dailySessions]);
  const cognitiveFormulaData = useMemo(() => {
    let totalTheory = 0;
    let totalPractice = 0;
    let totalRevision = 0;
    let totalQuiz = 0;
    topicTimeData.forEach((t2) => {
      totalTheory += t2.theoryMinutes;
      totalPractice += t2.practiceMinutes;
      totalRevision += t2.revisionMinutes;
    });
    totalQuiz = Math.round(totalPractice * 0.35);
    const sum = totalTheory + totalPractice + totalRevision + totalQuiz;
    if (sum === 0) return [];
    return [
      { name: "Concept & Theory", value: Math.round(totalTheory / sum * 100), color: "#4f46e5", target: "50%" },
      { name: "PYQ Practice", value: Math.round(totalPractice / sum * 100), color: "#8b5cf6", target: "25%" },
      { name: "Weak Topic Revision", value: Math.round(totalRevision / sum * 100), color: "#06b6d4", target: "15%" },
      { name: "Adaptive Quizzes", value: Math.round(totalQuiz / sum * 100), color: "#10b981", target: "10%" }
    ];
  }, [topicTimeData]);
  const latestMock = filteredMockData[filteredMockData.length - 1];
  const initialMock = filteredMockData[0];
  const scoreImprovement = latestMock ? latestMock.score - initialMock.score : 0;
  const avgScore = Math.round(filteredMockData.reduce((acc, m) => acc + m.score, 0) / (filteredMockData.length || 1));
  const totalStudyHours = topicTimeData.reduce((acc, t2) => acc + t2.hours, 0).toFixed(1);
  const CustomScoreTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isAboveCutoff = data.score >= data.cutoff;
      return <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 shadow-xl text-xs space-y-1.5 min-w-[200px]">
          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
            <span>{data.name}</span>
            <span className="text-[10px] text-slate-400 font-normal">{data.date}</span>
          </div>
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-indigo-700 font-semibold">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Mock Score:</span>
              </span>
              <span className="font-bold font-mono text-sm">{data.score}%</span>
            </div>
            <div className="flex items-center justify-between text-emerald-700 font-semibold">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Question Accuracy:</span>
              </span>
              <span className="font-bold font-mono">{data.accuracy}%</span>
            </div>
            <div className="flex items-center justify-between text-amber-700 font-semibold">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Target Cut-off:</span>
              </span>
              <span className="font-bold font-mono">{data.cutoff}%</span>
            </div>
          </div>
          <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-500">{data.questions} questions tested</span>
            <span
        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${isAboveCutoff ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}
      >
              {isAboveCutoff ? "CLEARED CUTOFF" : "BELOW CUTOFF"}
            </span>
          </div>
        </div>;
    }
    return null;
  };
  const CustomTopicTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 shadow-xl text-xs space-y-1.5 min-w-[210px]">
          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5">
            {data.subject}
          </div>
          <div className="text-sm font-extrabold text-indigo-700 flex items-center justify-between pt-0.5">
            <span>Total Invested:</span>
            <span>{data.hours} hrs ({data.minutes} mins)</span>
          </div>
          <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-100">
            <div className="flex justify-between">
              <span>Concept & Theory:</span>
              <span className="font-bold text-slate-800">{Math.round(data.theoryMinutes / 60 * 10) / 10}h</span>
            </div>
            <div className="flex justify-between">
              <span>PYQ Practice:</span>
              <span className="font-bold text-slate-800">{Math.round(data.practiceMinutes / 60 * 10) / 10}h</span>
            </div>
            <div className="flex justify-between">
              <span>Revision & Drills:</span>
              <span className="font-bold text-slate-800">{Math.round(data.revisionMinutes / 60 * 10) / 10}h</span>
            </div>
          </div>
        </div>;
    }
    return null;
  };
  return <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-6 border border-white/80 shadow-sm">
      {
    /* Header with Title & Filter Controls */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100/80 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Visual Performance & Trend Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Historical progression of mock test scores and study time invested across key syllabus subjects.
          </p>
        </div>

        {
    /* View Mode & Range Filters */
  }
        <div className="flex flex-wrap items-center gap-2">
          {
    /* View Mode Tabs */
  }
          <div className="flex items-center rounded-xl border border-slate-200/80 p-0.5 bg-slate-50/80 text-[11px] font-semibold">
            <button
    onClick={() => setActiveView("both")}
    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${activeView === "both" ? "bg-white text-indigo-700 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
  >
              All Analytics
            </button>
            <button
    onClick={() => setActiveView("trends")}
    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${activeView === "trends" ? "bg-white text-indigo-700 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
  >
              Mock Trends
            </button>
            <button
    onClick={() => setActiveView("topics")}
    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${activeView === "topics" ? "bg-white text-indigo-700 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
  >
              Topic Hours
            </button>
          </div>

          {
    /* Time Filter */
  }
          <div className="flex items-center rounded-xl border border-slate-200/80 p-0.5 bg-slate-50/80 text-[11px] font-semibold">
            <button
    onClick={() => setTimeFilter("all")}
    className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${timeFilter === "all" ? "bg-white text-indigo-700 font-bold shadow-xs" : "text-slate-500 hover:text-slate-900"}`}
  >
              All Time
            </button>
            <button
    onClick={() => setTimeFilter("month")}
    className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${timeFilter === "month" ? "bg-white text-indigo-700 font-bold shadow-xs" : "text-slate-500 hover:text-slate-900"}`}
  >
              30 Days
            </button>
            <button
    onClick={() => setTimeFilter("recent")}
    className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${timeFilter === "recent" ? "bg-white text-indigo-700 font-bold shadow-xs" : "text-slate-500 hover:text-slate-900"}`}
  >
              Recent
            </button>
          </div>
        </div>
      </div>

      {
    /* KPI Highlight Strip */
  }
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
            Latest Mock Score
          </span>
          <div className="flex items-baseline space-x-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-indigo-950 font-mono">
              {latestMock?.score || 0}%
            </span>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{scoreImprovement}%</span>
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 truncate">
            {latestMock?.name || "Latest Test"}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
            Average Score
          </span>
          <div className="flex items-baseline space-x-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-purple-950 font-mono">
              {avgScore}%
            </span>
            <span className="text-[10px] text-purple-600 font-semibold">
              vs 65% Cutoff
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1">
            Across {filteredMockData.length} mock evaluations
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Total Study Invested
          </span>
          <div className="flex items-baseline space-x-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-mono">
              {totalStudyHours}h
            </span>
            <span className="text-[10px] font-bold text-emerald-600">
              Active Recall
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1">
            Across 6 key exam subjects
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
            Cutoff Clearance
          </span>
          <div className="flex items-baseline space-x-1 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-amber-950 font-mono">
              High
            </span>
            <span className="text-[10px] font-bold text-emerald-600 ml-1">
              (94% prob)
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1">
            Safe margin over baseline
          </span>
        </div>
      </div>

      {
    /* Main Charts Grid */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {
    /* Chart 1: Historical Trends of Mock Test Scores */
  }
        {(activeView === "trends" || activeView === "both") && <div
    className={`${activeView === "both" ? "lg:col-span-7" : "lg:col-span-12"} rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/80 shadow-2xs space-y-4`}
  >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  <span>Historical Mock Test Score Progression</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Progression over successive mock tests against the official 65% target cutoff benchmark.
                </p>
              </div>

              <button
    onClick={() => setActiveTab("mocks")}
    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer flex items-center space-x-1"
  >
                <span>Take Mock</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {
    /* Recharts Area Chart */
  }
            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredMockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="accuracyAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

                  <XAxis
    dataKey="shortName"
    tick={{ fill: "#64748b", fontSize: 11 }}
    axisLine={{ stroke: "#e2e8f0" }}
    tickLine={false}
  />

                  <YAxis
    domain={[40, 100]}
    tick={{ fill: "#64748b", fontSize: 11 }}
    axisLine={{ stroke: "#e2e8f0" }}
    tickLine={false}
    tickFormatter={(val) => `${val}%`}
  />

                  <Tooltip content={<CustomScoreTooltip />} />

                  {
    /* Benchmark Cutoff Line */
  }
                  <ReferenceLine
    y={65}
    stroke="#f59e0b"
    strokeDasharray="4 4"
    strokeWidth={1.5}
    label={{
      value: "Target Cutoff 65%",
      fill: "#b45309",
      fontSize: 10,
      position: "top"
    }}
  />

                  <Area
    type="monotone"
    dataKey="score"
    name="Score %"
    stroke="#4f46e5"
    strokeWidth={2.5}
    fillOpacity={1}
    fill="url(#scoreAreaGradient)"
    dot={{ fill: "#4f46e5", r: 4, strokeWidth: 2, stroke: "#fff" }}
    activeDot={{ r: 6, fill: "#4338ca", stroke: "#fff", strokeWidth: 2 }}
  />

                  <Area
    type="monotone"
    dataKey="accuracy"
    name="Accuracy %"
    stroke="#10b981"
    strokeWidth={2}
    strokeDasharray="2 2"
    fillOpacity={1}
    fill="url(#accuracyAreaGradient)"
    dot={{ fill: "#10b981", r: 3, strokeWidth: 1, stroke: "#fff" }}
  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {
    /* Sub-chart Legend & Callout */
  }
            <div className="flex flex-wrap items-center justify-between text-xs pt-2 border-t border-slate-100">
              <div className="flex items-center space-x-4 text-[11px]">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-1 bg-indigo-600 rounded-full" />
                  <span className="text-slate-600 font-medium">Mock Score %</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-1 bg-emerald-500 rounded-full" />
                  <span className="text-slate-600 font-medium">Question Accuracy %</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-0.5 border-t border-amber-500 border-dashed" />
                  <span className="text-slate-600 font-medium">65% Target Cut-off</span>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Growth: +{scoreImprovement}% from starting test
              </span>
            </div>
          </div>}

        {
    /* Chart 2: Time Spent on Topics & Subjects */
  }
        {(activeView === "topics" || activeView === "both") && <div
    className={`${activeView === "both" ? "lg:col-span-5" : "lg:col-span-12"} rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/80 shadow-2xs space-y-4`}
  >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>Time Spent on Topics</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Hours invested per syllabus subject & cognitive area.
                </p>
              </div>

              <button
    onClick={() => setActiveTab("planner")}
    className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors cursor-pointer flex items-center space-x-1"
  >
                <span>Planner</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {
    /* Recharts Bar Chart */
  }
            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
    data={topicTimeData}
    layout="vertical"
    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
  >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />

                  <XAxis
    type="number"
    tick={{ fill: "#64748b", fontSize: 11 }}
    axisLine={{ stroke: "#e2e8f0" }}
    tickLine={false}
    tickFormatter={(v) => `${v}h`}
  />

                  <YAxis
    type="category"
    dataKey="shortSubject"
    tick={{ fill: "#334155", fontSize: 11, fontWeight: 500 }}
    axisLine={{ stroke: "#e2e8f0" }}
    tickLine={false}
    width={110}
  />

                  <Tooltip content={<CustomTopicTooltip />} />

                  <Bar dataKey="hours" radius={[0, 6, 6, 0]}>
                    {topicTimeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {
    /* Topic Summary Badge */
  }
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-500">
                Top Subject: <strong className="text-slate-800">{topicTimeData[0]?.subject}</strong>
              </span>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                {totalStudyHours} total hours logged
              </span>
            </div>
          </div>}
      </div>

      {
    /* Cognitive Formula Breakdown Bar (50% Theory, 25% PYQs, 15% Revision, 10% Quizzes) */
  }
      <div className="p-4 rounded-2xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/80 border border-indigo-400/30 flex items-center justify-center text-white shrink-0">
            <Zap className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-xs font-bold text-white">Active Recall Retention Formula</h4>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                92% Optimal Balance
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Science recommends: 50% Concepts & Theory • 25% PYQs Practice • 15% Weak Topic Revision • 10% Quizzes.
            </p>
          </div>
        </div>

        {
    /* Current Allocation Mini Bars */
  }
        <div className="flex items-center space-x-2 shrink-0 text-center">
          {cognitiveFormulaData.map((item) => <div key={item.name} className="px-2.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-[10px] text-slate-300 truncate max-w-[70px]">{item.name.split(" ")[0]}</div>
              <div className="text-xs font-bold text-white mt-0.5 font-mono">{item.value}%</div>
            </div>)}
        </div>
      </div>
    </div>;
};
export {
  VisualPerformanceDashboard
};
