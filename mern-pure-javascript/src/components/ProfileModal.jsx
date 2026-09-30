import { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  User,
  X,
  Mail,
  GraduationCap,
  Target,
  ShieldCheck,
  Plus
} from "lucide-react";
const ProfileModal = ({ isOpen, onClose }) => {
  const { profile, updateProfile, showToast, t } = useApp();
  const [name, setName] = useState(profile.name || "Anya Bandgar");
  const [email, setEmail] = useState(profile.email || "anyabandgar458@gmail.com");
  const [educationStage, setEducationStage] = useState(profile.educationStage || "graduate_job_seeker");
  const [degreeOrStream, setDegreeOrStream] = useState(profile.degreeOrStream || "Bachelor Degree (Final Year / Graduate)");
  const [currentYear, setCurrentYear] = useState(profile.currentYear || "Final Year Aspirant");
  const [targetGoal, setTargetGoal] = useState(profile.targetGoal || "National & State Competitive Exams");
  const [targetYear, setTargetYear] = useState(profile.targetYear || "2026");
  const [dailyHours, setDailyHours] = useState(profile.dailyHours || 4);
  const [weakTopics, setWeakTopics] = useState(profile.weakTopics || []);
  const [newWeakTopic, setNewWeakTopic] = useState("");
  if (!isOpen) return null;
  const handleAddWeakTopic = () => {
    if (newWeakTopic.trim() && !weakTopics.includes(newWeakTopic.trim())) {
      setWeakTopics([...weakTopics, newWeakTopic.trim()]);
      setNewWeakTopic("");
    }
  };
  const handleRemoveWeakTopic = (topic) => {
    setWeakTopics(weakTopics.filter((t2) => t2 !== topic));
  };
  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || "Anya Bandgar",
      email: email.trim() || "anyabandgar458@gmail.com",
      educationStage,
      degreeOrStream,
      currentYear,
      targetGoal,
      targetYear,
      dailyHours,
      weakTopics
    });
    showToast("Your personal profile and learning plan have been saved!", "success");
    onClose();
  };
  return <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 my-8 max-h-[90vh] overflow-y-auto">
        {
    /* Header */
  }
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-extrabold text-slate-900">{t("profile_modal_title")}</h2>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                  {t("profile_single_mode")}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {t("profile_modal_subtitle")}
              </p>
            </div>
          </div>
          <button
    onClick={onClose}
    className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* User Account Verification Pill */
  }
        <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xs">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-slate-900">{name}</p>
              <p className="text-[11px] text-slate-600 flex items-center space-x-1">
                <Mail className="w-3 h-3 text-indigo-500 inline" />
                <span>{email}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dedicated Account</span>
          </div>
        </div>

        {
    /* Profile Edit Form */
  }
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {
    /* Personal Information */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
    type="text"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="e.g. Anya Bandgar"
    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
  />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Account Email</label>
              <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="e.g. anyabandgar458@gmail.com"
    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
  />
            </div>
          </div>

          {
    /* Academic Background */
  }
          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Academic Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Education Stage</label>
                <select
    value={educationStage}
    onChange={(e) => setEducationStage(e.target.value)}
    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
  >
                  <option value="ug_engineering">Undergraduate Engineering (B.Tech / B.E.)</option>
                  <option value="ug_general">Undergraduate General (B.Sc / BCA / B.Com)</option>
                  <option value="diploma">Polytechnic Diploma</option>
                  <option value="12th_science">12th Standard (Science / PCM)</option>
                  <option value="12th_commerce">12th Standard (Commerce)</option>
                  <option value="12th_arts">12th Standard (Arts / Humanities)</option>
                  <option value="graduate_job_seeker">Graduate (Job / Exam Aspirant)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Stream / Branch</label>
                <input
    type="text"
    value={degreeOrStream}
    onChange={(e) => setDegreeOrStream(e.target.value)}
    placeholder="e.g. B.Tech Computer Science & Engineering"
    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
  />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Current Academic Year</label>
                <input
    type="text"
    value={currentYear}
    onChange={(e) => setCurrentYear(e.target.value)}
    placeholder="e.g. 3rd Year (6th Semester)"
    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
  />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Examination Year</label>
                <input
    type="text"
    value={targetYear}
    onChange={(e) => setTargetYear(e.target.value)}
    placeholder="e.g. 2026"
    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
  />
              </div>
            </div>
          </div>

          {
    /* Goal & Daily Effort */
  }
          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Target Career & Daily Goal</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Primary Target Goal / Exam</label>
                <input
    type="text"
    required
    value={targetGoal}
    onChange={(e) => setTargetGoal(e.target.value)}
    placeholder="e.g. UPSC CSE, SSC CGL, Banking PO, State PSC, CAT, Defense, NEET, GATE..."
    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
  />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Committed Daily Study Hours</label>
                  <span className="font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-lg text-xs">
                    {dailyHours} Hours / Day
                  </span>
                </div>
                <input
    type="range"
    min="1"
    max="12"
    value={dailyHours}
    onChange={(e) => setDailyHours(Number(e.target.value))}
    className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
  />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>1 hr (Light)</span>
                  <span>4 hrs (Balanced)</span>
                  <span>8+ hrs (Intensive)</span>
                </div>
              </div>
            </div>
          </div>

          {
    /* Weak Topics Diagnostic List */
  }
          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Remedial & Weak Topics</span>
              <span className="text-[10px] text-slate-500 font-normal lowercase">
                ({weakTopics.length} topics flagged)
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 mb-2">
              PragyaPath schedules targeted PYQs and planner sessions based on these topics.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {weakTopics.map((topic, idx) => <span
    key={idx}
    className="inline-flex items-center space-x-1.5 bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg text-[11px] font-medium"
  >
                  <span>{topic}</span>
                  <button
    type="button"
    onClick={() => handleRemoveWeakTopic(topic)}
    className="hover:text-rose-950 p-0.5 cursor-pointer"
  >
                    <X className="w-3 h-3" />
                  </button>
                </span>)}
              {weakTopics.length === 0 && <span className="text-xs text-slate-400 italic">No weak topics flagged. All clear!</span>}
            </div>

            <div className="flex items-center space-x-2">
              <input
    type="text"
    value={newWeakTopic}
    onChange={(e) => setNewWeakTopic(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddWeakTopic();
      }
    }}
    placeholder="Add a topic needing revision (e.g. Cache Mapping, CIDR)..."
    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
              <button
    type="button"
    onClick={handleAddWeakTopic}
    className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-bold rounded-xl border border-slate-200 flex items-center space-x-1 cursor-pointer transition-colors"
  >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {
    /* Action Buttons */
  }
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
            <button
    type="button"
    onClick={onClose}
    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer transition-colors"
  >
              {t("profile_btn_cancel")}
            </button>
            <button
    type="submit"
    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20 cursor-pointer transition-all"
  >
              {t("profile_btn_save")}
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export {
  ProfileModal
};
