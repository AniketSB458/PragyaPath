import { useState } from "react";
import { useApp } from "../context/AppContext";
import { FREE_RESOURCES_DATABASE, PYQ_BANK } from "../data/mockData";
import {
  BookmarkCheck,
  BookOpen,
  HelpCircle,
  FileText,
  Trash2,
  Plus,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";
const MyLibraryView = () => {
  const {
    profile,
    toggleBookmarkResource,
    toggleBookmarkQuestion,
    customSavedResources,
    notes,
    addNote,
    deleteNote,
    setActiveTab,
    t
  } = useApp();
  const [activeSubTab, setActiveSubTab] = useState("resources");
  const [newNoteTopic, setNewNoteTopic] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [copiedNoteId, setCopiedNoteId] = useState(null);
  const allKnownResources = [...FREE_RESOURCES_DATABASE, ...customSavedResources || []];
  const uniqueResourcesMap = /* @__PURE__ */ new Map();
  allKnownResources.forEach((r) => uniqueResourcesMap.set(r.id, r));
  const bookmarkedResources = Array.from(uniqueResourcesMap.values()).filter(
    (r) => profile.bookmarkedResourceIds.includes(r.id)
  );
  const bookmarkedQuestions = PYQ_BANK.filter(
    (q) => profile.bookmarkedQuestionIds.includes(q.id)
  );
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteTopic.trim() || !newNoteContent.trim()) return;
    addNote(newNoteTopic, newNoteContent);
    setNewNoteTopic("");
    setNewNoteContent("");
  };
  const handleCopyNote = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedNoteId(id);
    setTimeout(() => setCopiedNoteId(null), 2e3);
  };
  return <div className="space-y-4">
      {
    /* Sleek Compact Glass Header */
  }
      <div className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 rounded-2xl">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <BookmarkCheck className="w-5 h-5 text-indigo-600" />
            <span className="tracking-tight">{t("library_banner_title")}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("library_banner_desc")}
          </p>
        </div>

        {
    /* Sub Tabs */
  }
        <div className="flex items-center space-x-1.5 bg-white/50 backdrop-blur-md p-1 rounded-xl border border-white/70 shadow-2xs shrink-0">
          <button
    onClick={() => setActiveSubTab("resources")}
    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeSubTab === "resources" ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xs border border-white/20" : "text-slate-600 hover:text-slate-900"}`}
  >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Saved Resources ({bookmarkedResources.length})</span>
          </button>

          <button
    onClick={() => setActiveSubTab("questions")}
    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeSubTab === "questions" ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xs border border-white/20" : "text-slate-600 hover:text-slate-900"}`}
  >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>PYQs ({bookmarkedQuestions.length})</span>
          </button>

          <button
    onClick={() => setActiveSubTab("notes")}
    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeSubTab === "notes" ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xs border border-white/20" : "text-slate-600 hover:text-slate-900"}`}
  >
            <FileText className="w-3.5 h-3.5" />
            <span>Notes ({notes.length})</span>
          </button>
        </div>
      </div>

      {
    /* Content Panes */
  }
      {activeSubTab === "resources" && <div>
          {bookmarkedResources.length === 0 ? <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 space-y-3">
              <p className="text-sm">You haven't bookmarked any free learning resources yet.</p>
              <button
    onClick={() => setActiveTab("resources")}
    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700"
  >
                Browse Free Resources Hub →
              </button>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedResources.map((res) => <div
    key={res.id}
    className="glass-card rounded-2xl p-5 flex flex-col justify-between hover:border-white hover:shadow-lg transition-all"
  >
                  <div>
                    {res.thumbnailUrl && <div className="relative mb-3 rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-100">
                        <img
    src={res.thumbnailUrl}
    alt={res.title}
    className="w-full h-full object-cover"
  />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                          <span className="text-[10px] font-bold text-white bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs flex items-center space-x-1">
                            <span>YouTube Video</span>
                          </span>
                        </div>
                      </div>}

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {res.stepCategory} • {res.platform}
                      </span>
                      <button
    onClick={() => toggleBookmarkResource(res.id)}
    className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
  >
                        Remove
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mb-1">{res.title}</h3>
                    <p className="text-xs text-indigo-600 font-semibold mb-2">
                      Source / Educator: {res.instructorOrEntity}
                    </p>
                    <p className="text-xs text-slate-600 mb-3">{res.description}</p>
                  </div>

                  <a
    href={res.linkUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
  >
                    <span>{res.platform?.toLowerCase().includes("youtube") ? "Watch on YouTube" : "Open Resource"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>)}
            </div>}
        </div>}

      {activeSubTab === "questions" && <div className="space-y-4">
          {bookmarkedQuestions.length === 0 ? <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 space-y-3">
              <p className="text-sm">No PYQs bookmarked yet.</p>
              <button
    onClick={() => setActiveTab("practice")}
    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700"
  >
                Go to Adaptive Practice & PYQs →
              </button>
            </div> : bookmarkedQuestions.map((q) => <div
    key={q.id}
    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3"
  >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                    {q.exam} {q.year} • {q.subject}
                  </span>
                  <button
    onClick={() => toggleBookmarkQuestion(q.id)}
    className="text-xs font-bold text-rose-600 hover:text-rose-800"
  >
                    Remove Bookmark
                  </button>
                </div>

                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed font-sans">
                  {q.question}
                </p>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-950 space-y-1">
                  <p className="font-bold">Correct Solution:</p>
                  <p>{q.explanation}</p>
                  <p className="font-semibold text-indigo-900 pt-1">
                    Key Principle: {q.keyConcept}
                  </p>
                </div>
              </div>)}
        </div>}

      {activeSubTab === "notes" && <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {
    /* Notes List */
  }
          <div className="lg:col-span-7 space-y-4">
            {notes.map((note) => <div
    key={note.id}
    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 relative group"
  >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900">{note.topic}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-slate-400">{note.createdAt}</span>
                    <button
    onClick={() => handleCopyNote(note.id, note.content)}
    className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
    title="Copy to clipboard"
  >
                      {copiedNoteId === note.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
    onClick={() => deleteNote(note.id)}
    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
    title="Delete Note"
  >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {note.content}
                </p>
              </div>)}
          </div>

          {
    /* Add Note Form */
  }
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4 sticky top-32">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>Add Quick Revision Note / Formula</span>
              </h3>

              <form onSubmit={handleAddNote} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Concept / Formula Name</label>
                  <input
    type="text"
    required
    value={newNoteTopic}
    onChange={(e) => setNewNoteTopic(e.target.value)}
    placeholder="e.g. Master Theorem Case 2 Formula"
    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Note Content & Derivations</label>
                  <textarea
    required
    rows={4}
    value={newNoteContent}
    onChange={(e) => setNewNoteContent(e.target.value)}
    placeholder="Write key equations, common traps, or exam shortcuts..."
    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
                </div>

                <button
    type="submit"
    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
  >
                  Save Note to Vault
                </button>
              </form>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  MyLibraryView
};
