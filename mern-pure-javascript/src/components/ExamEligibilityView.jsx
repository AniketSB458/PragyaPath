import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { EXAMS_DATABASE, ROADMAPS_DATABASE } from "../data/mockData";
import { evaluateEligibility } from "../utils/eligibilityEngine";
import {
  FileCheck2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck
} from "lucide-react";
const ExamEligibilityView = () => {
  const { profile, updateProfile, activeExam, setActiveExam, setActiveTab, setActiveRoadmap, t } = useApp();
  const [selectedExamId, setSelectedExamId] = useState(activeExam?.id || EXAMS_DATABASE[0]?.id || "upsc_cse");
  const [educationLevel, setEducationLevel] = useState(
    profile.educationStage || "graduate_job_seeker"
  );
  const [degreeOrBranch, setDegreeOrBranch] = useState(profile.degreeOrStream || "Bachelor Degree (Final Year / Graduate)");
  const [graduationStatus, setGraduationStatus] = useState("completed");
  const [age, setAge] = useState(22);
  const [category, setCategory] = useState("General");
  const [nationality, setNationality] = useState("Indian");
  const [aggregatePercentage, setAggregatePercentage] = useState(72);
  const currentExam = useMemo(() => {
    return EXAMS_DATABASE.find((e) => e.id === selectedExamId) || EXAMS_DATABASE[0];
  }, [selectedExamId]);
  const evaluation = useMemo(() => {
    return evaluateEligibility({
      examId: selectedExamId,
      educationLevel,
      degreeOrBranch,
      graduationStatus,
      age,
      category,
      nationality,
      aggregatePercentage
    });
  }, [
    selectedExamId,
    educationLevel,
    degreeOrBranch,
    graduationStatus,
    age,
    category,
    nationality,
    aggregatePercentage
  ]);
  const handleSelectExamAsGoal = (exam) => {
    setActiveExam(exam);
    updateProfile({
      targetGoal: exam.name,
      targetExamId: exam.id
    });
    const matchingRoadmap = ROADMAPS_DATABASE[`roadmap_${exam.id}`] || Object.values(ROADMAPS_DATABASE)[0];
    if (matchingRoadmap) {
      setActiveRoadmap(matchingRoadmap);
    }
    setActiveTab("roadmap");
  };
  return <div className="space-y-4">
      {
    /* Sleek Compact Glass Header */
  }
      <div className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 rounded-2xl">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-indigo-600" />
            <span className="tracking-tight">{t("exams_banner_title")}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("exams_banner_desc")}
          </p>
        </div>
      </div>

      {
    /* Select Exam Tabs */
  }
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {EXAMS_DATABASE.map((exam) => {
    const isSelected = exam.id === selectedExamId;
    return <button
      key={exam.id}
      onClick={() => {
        setSelectedExamId(exam.id);
        setActiveExam(exam);
      }}
      className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${isSelected ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-sm shadow-indigo-600/25 border border-white/20" : "bg-white/60 text-slate-700 border border-white/80 hover:bg-white/90 backdrop-blur-md shadow-2xs"}`}
    >
              {exam.name}
            </button>;
  })}
      </div>

      {
    /* Main 2-Column: Left = Interactive Eligibility Engine, Right = Exam Official Specs */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {
    /* Left: Interactive Eligibility Checker */
  }
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  <span>Check Your Eligibility for {currentExam.name}</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Instant real-time rule engine calculation
                </p>
              </div>

              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Verified: {currentExam.verifiedDate}
              </span>
            </div>

            {
    /* Input Form */
  }
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Education Level
                  </label>
                  <select
    value={educationLevel}
    onChange={(e) => setEducationLevel(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
  >
                    <option value="ug_engineering">Undergraduate Engineering (B.Tech/B.E.)</option>
                    <option value="ug_general">Undergraduate General (B.Sc, BCA, B.Com, B.A.)</option>
                    <option value="diploma">Polytechnic Diploma (3-Year)</option>
                    <option value="12th_science">12th Standard Science (PCM/PCB)</option>
                    <option value="graduate_job_seeker">Completed Bachelor Degree (Graduate)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Degree / Branch
                  </label>
                  <input
    type="text"
    value={degreeOrBranch}
    onChange={(e) => setDegreeOrBranch(e.target.value)}
    placeholder="e.g. Computer Science, Mechanical"
    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Year of Study
                  </label>
                  <select
    value={graduationStatus}
    onChange={(e) => setGraduationStatus(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
  >
                    <option value="pre_final_year">3rd Year (Pre-Final)</option>
                    <option value="final_year">4th Year (Final Year)</option>
                    <option value="completed">Completed / Graduated</option>
                    <option value="pursuing_early">1st / 2nd Year</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Current Age: <strong className="text-indigo-600">{age} yrs</strong>
                  </label>
                  <input
    type="range"
    min="15"
    max="45"
    value={age}
    onChange={(e) => setAge(Number(e.target.value))}
    className="w-full accent-indigo-600 cursor-pointer"
  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Social Category
                  </label>
                  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
  >
                    <option value="General">General (Unreserved)</option>
                    <option value="OBC-NCL">OBC-NCL</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">EWS</option>
                    <option value="PwD">PwD (Persons with Benchmark Disabilities)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Graduation / School Aggregate: <strong className="text-indigo-600">{aggregatePercentage}%</strong>
                  </label>
                  <input
    type="range"
    min="40"
    max="100"
    value={aggregatePercentage}
    onChange={(e) => setAggregatePercentage(Number(e.target.value))}
    className="w-full accent-indigo-600 cursor-pointer"
  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nationality / Citizenship
                  </label>
                  <select
    value={nationality}
    onChange={(e) => setNationality(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
  >
                    <option value="Indian">Citizen of India</option>
                    <option value="Other">Non-Indian / Foreign National</option>
                  </select>
                </div>
              </div>
            </div>

            {
    /* Verdict Box */
  }
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div
    className={`p-4 rounded-xl border flex items-start space-x-3 ${evaluation.isEligible === "eligible" ? "bg-emerald-50/80 border-emerald-200 text-emerald-900" : evaluation.isEligible === "conditionally_eligible" ? "bg-amber-50/80 border-amber-200 text-amber-900" : "bg-rose-50/80 border-rose-200 text-rose-900"}`}
  >
                {evaluation.isEligible === "eligible" ? <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" /> : evaluation.isEligible === "conditionally_eligible" ? <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" /> : <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />}

                <div className="flex-1">
                  <h3 className="text-sm font-bold">{evaluation.headline}</h3>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">{evaluation.summary}</p>
                  <p className="text-xs mt-2 font-semibold">{evaluation.actionAdvice}</p>
                </div>
              </div>

              {
    /* Systematic Criteria Breakdown */
  }
              <div className="mt-4 space-y-2.5">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Detailed Verification Audit
                </h4>

                {evaluation.checks.map((check, cIdx) => <div
    key={cIdx}
    className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/60 flex items-start justify-between gap-3 text-xs"
  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        {check.passed === true ? <span className="w-2 h-2 rounded-full bg-emerald-500" /> : check.passed === false ? <span className="w-2 h-2 rounded-full bg-rose-500" /> : <span className="w-2 h-2 rounded-full bg-amber-500" />}
                        <p className="font-bold text-slate-900">{check.category}</p>
                      </div>
                      <p className="text-slate-600 text-[11px]">{check.explanation}</p>
                    </div>

                    <span
    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${check.passed === true ? "bg-emerald-100 text-emerald-800" : check.passed === false ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"}`}
  >
                      {check.passed === true ? "PASSED" : check.passed === false ? "FAILED" : "CONDITIONAL"}
                    </span>
                  </div>)}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">
                  Official Rule Source: <strong>{evaluation.officialClause}</strong>
                </span>
                <a
    href={evaluation.officialSourceLink}
    target="_blank"
    rel="noopener noreferrer"
    className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
  >
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {
    /* Right: Comprehensive Official Exam Dossier */
  }
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60 uppercase">
                  {currentExam.conductingBody}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  {currentExam.fullName}
                </h2>
              </div>

              <button
    onClick={() => handleSelectExamAsGoal(currentExam)}
    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
  >
                Set as My Goal & Build Roadmap →
              </button>
            </div>

            {
    /* Quick Specs Grid */
  }
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Notification Window
                </span>
                <p className="font-bold text-slate-900 mt-0.5">{currentExam.notificationPeriod}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Examination Schedule
                </span>
                <p className="font-bold text-slate-900 mt-0.5">{currentExam.examDates}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Age Rules (General)
                </span>
                <p className="font-bold text-slate-900 mt-0.5">{currentExam.ageCriteriaGeneral}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Category Relaxations
                </span>
                <p className="font-bold text-slate-900 mt-0.5">
                  OBC: {currentExam.ageRelaxations.obc} • SC/ST: {currentExam.ageRelaxations.scSt}
                </p>
              </div>
            </div>

            {
    /* Official Qualification Clause */
  }
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Official Eligibility Mandate
              </h3>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/70 leading-relaxed">
                {currentExam.educationalQualification}
              </p>
            </div>

            {
    /* Exam Pattern & Stages */
  }
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Exam Stages & Marking Pattern
              </h3>
              <div className="space-y-2">
                {currentExam.examStages.map((stage, sIdx) => <div
    key={sIdx}
    className="p-3 rounded-lg border border-slate-200 bg-white space-y-1 text-xs"
  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-indigo-900">{stage.stageName}</p>
                      <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {stage.marks} Marks • {stage.duration}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{stage.format}</p>
                    <p className="text-rose-700 font-medium text-[11px]">
                      <strong>Negative Marking:</strong> {stage.negativeMarking}
                    </p>
                  </div>)}
              </div>
            </div>

            {
    /* Subject Weightage Breakdown */
  }
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Historical Subject Weightage Distribution
              </h3>

              <div className="space-y-2.5">
                {currentExam.subjectWeightage.map((sub, sIdx) => <div key={sIdx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{sub.subject}</span>
                      <span className="font-bold text-indigo-600">{sub.weightagePercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
    className="bg-indigo-600 h-1.5 rounded-full"
    style={{ width: `${sub.weightagePercentage * 4}%` }}
  />
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Key Topics: {sub.keyTopics.join(", ")}
                    </p>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export {
  ExamEligibilityView
};
