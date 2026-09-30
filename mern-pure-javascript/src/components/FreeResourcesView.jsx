import { useState, useEffect, useCallback } from "react";
import { useApp } from "../context/AppContext";
import { FREE_RESOURCES_DATABASE } from "../data/mockData";
import {
  Search,
  Bookmark,
  ExternalLink,
  Star,
  Play,
  Globe,
  Youtube,
  Layers,
  Loader2,
  X,
  PlusCircle
} from "lucide-react";
const FreeResourcesView = () => {
  const { profile, activeExam, toggleBookmarkResource, addDailySession, t } = useApp();
  const [viewMode, setViewMode] = useState("live");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [liveQuery, setLiveQuery] = useState("Indian Constitution Fundamental Rights & Articles");
  const [liveSource, setLiveSource] = useState("all");
  const [liveResults, setLiveResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sourceUsed, setSourceUsed] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedVideoModal, setSelectedVideoModal] = useState(null);
  const stepCategories = ["All", "Learn", "Understand", "Practice", "Evaluate"];
  const languages = ["All", "English", "Hindi", "Bilingual"];
  const quickTopicChips = [
    "Indian Constitution & Fundamental Rights",
    "Quantitative Aptitude & Percentages",
    "Logical Reasoning & Syllogisms",
    "Modern Indian Freedom Movement",
    "Macroeconomics & Inflation",
    "Data Interpretation & Bar Charts",
    "General Science in Daily Life",
    "English Grammar 120 Rules"
  ];
  const handleLiveSearch = useCallback(
    async (queryOverride, sourceOverride) => {
      const q = (queryOverride !== void 0 ? queryOverride : liveQuery).trim();
      const s = sourceOverride !== void 0 ? sourceOverride : liveSource;
      if (!q) return;
      setIsSearching(true);
      try {
        const response = await fetch("/api/resources/live-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: q,
            source: s,
            exam: activeExam?.name || profile.targetGoal || "Competitive Exam",
            subject: activeExam?.fullName || "General Studies, Aptitude & Core Syllabus",
            language: profile.language
          })
        });
        if (response.ok) {
          const data = await response.json();
          setLiveResults(data.resources || []);
          setSourceUsed(data.sourceUsed || "api");
          setHasSearched(true);
        }
      } catch (err) {
        console.error("Error fetching live resources:", err);
      } finally {
        setIsSearching(false);
      }
    },
    [liveQuery, liveSource, activeExam, profile]
  );
  useEffect(() => {
    if (!hasSearched && liveResults.length === 0) {
      handleLiveSearch();
    }
  }, [hasSearched, liveResults.length, handleLiveSearch]);
  const handleChipClick = (topic) => {
    setLiveQuery(topic);
    handleLiveSearch(topic, liveSource);
  };
  const filteredCuratedResources = FREE_RESOURCES_DATABASE.filter((res) => {
    const matchesCategory = activeCategory === "All" || res.stepCategory.toLowerCase() === activeCategory.toLowerCase();
    const matchesLang = selectedLanguage === "All" || res.language.toLowerCase() === selectedLanguage.toLowerCase();
    const matchesQuery = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || res.subject.toLowerCase().includes(searchQuery.toLowerCase()) || res.topic.toLowerCase().includes(searchQuery.toLowerCase()) || res.instructorOrEntity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLang && matchesQuery;
  });
  return <div className="space-y-4">
      {
    /* Glassmorphic Header with Mode Switcher */
  }
      <div className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 rounded-2xl">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-xs shadow-red-500/50 animate-pulse" />
            <span className="tracking-tight">{t("resources_banner_title")}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("resources_live_desc")}
          </p>
        </div>

        {
    /* Mode Switcher Pills */
  }
        <div className="flex items-center space-x-1 bg-white/50 backdrop-blur-md p-1 rounded-xl border border-white/70 shadow-2xs shrink-0">
          <button
    onClick={() => setViewMode("live")}
    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === "live" ? "bg-linear-to-r from-red-600 to-rose-600 text-white shadow-sm shadow-red-500/25 border border-white/30" : "text-slate-600 hover:text-slate-900"}`}
  >
            <Youtube className="w-3.5 h-3.5" />
            <span>{t("resources_tab_live")}</span>
          </button>
          <button
    onClick={() => setViewMode("curated")}
    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === "curated" ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-sm shadow-indigo-500/25 border border-white/30" : "text-slate-600 hover:text-slate-900"}`}
  >
            <Layers className="w-3.5 h-3.5" />
            <span>{t("resources_tab_curated")}</span>
          </button>
        </div>
      </div>

      {
    /* ========================================================== */
  }
      {
    /* MODE 1: LIVE INTERNET & YOUTUBE API SEARCH                */
  }
      {
    /* ========================================================== */
  }
      {viewMode === "live" && <div className="space-y-4">
          {
    /* Frosted Glass Search Controls */
  }
          <div className="glass-card rounded-2xl p-4 sm:p-5 space-y-3">
            <form
    onSubmit={(e) => {
      e.preventDefault();
      handleLiveSearch();
    }}
    className="flex flex-col sm:flex-row items-center gap-2.5"
  >
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
    type="text"
    value={liveQuery}
    onChange={(e) => setLiveQuery(e.target.value)}
    placeholder={t("resources_search_placeholder")}
    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl glass-input font-medium text-slate-900"
  />
              </div>

              <select
    value={liveSource}
    onChange={(e) => {
      const s = e.target.value;
      setLiveSource(s);
      handleLiveSearch(liveQuery, s);
    }}
    className="w-full sm:w-auto text-xs px-3.5 py-2.5 rounded-xl glass-input font-semibold text-slate-700 cursor-pointer"
  >
                <option value="all">{t("resources_source_all")}</option>
                <option value="youtube">{t("resources_source_yt")}</option>
                <option value="web">{t("resources_source_web")}</option>
              </select>

              <button
    type="submit"
    disabled={isSearching}
    className="w-full sm:w-auto flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap shadow-md shadow-red-500/20 border border-white/20"
  >
                {isSearching ? <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>{t("resources_searching")}</span>
                  </> : <>
                    <Search className="w-3.5 h-3.5" />
                    <span>{t("resources_search_btn")}</span>
                  </>}
              </button>
            </form>

            {
    /* Quick Chips */
  }
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pt-1">
              <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                {t("resources_quick_topics_label")}:
              </span>
              {quickTopicChips.map((chip, i) => <button
    key={i}
    onClick={() => handleChipClick(chip)}
    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/60 hover:bg-red-50 hover:text-red-700 hover:border-red-200/80 border border-white/80 whitespace-nowrap transition-all cursor-pointer shadow-2xs backdrop-blur-md"
  >
                  + {chip}
                </button>)}
            </div>
          </div>

          {
    /* Results Status Header */
  }
          <div className="flex items-center justify-between text-xs text-slate-600 px-1 font-medium">
            <span>
              {liveResults.length} {t("resources_live_results_count")} for "{liveQuery}"
            </span>
            {sourceUsed && <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50/80 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-emerald-200/80 shadow-2xs">
                {sourceUsed.replace("_", " ")}
              </span>}
          </div>

          {
    /* Loading */
  }
          {isSearching && <div className="p-10 text-center glass-card rounded-2xl space-y-2">
              <Loader2 className="w-7 h-7 animate-spin text-red-600 mx-auto" />
              <p className="text-xs font-semibold text-slate-700">{t("resources_searching")}</p>
            </div>}

          {
    /* Glass Grid */
  }
          {!isSearching && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveResults.map((res) => {
    const isBookmarked = profile.bookmarkedResourceIds.includes(res.id);
    const isYouTube = res.platform?.toLowerCase().includes("youtube") || res.sourceType === "youtube" || !!res.videoId;
    return <div
      key={res.id}
      className="glass-card rounded-2xl p-4.5 hover:shadow-lg hover:border-white transition-all flex flex-col justify-between group"
    >
                    <div>
                      {
      /* Video Thumbnail */
    }
                      {res.thumbnailUrl && <div
      onClick={() => {
        if (res.videoId) setSelectedVideoModal(res);
      }}
      className={`relative mb-3 rounded-xl overflow-hidden aspect-video bg-slate-900 border border-white/20 shadow-sm ${res.videoId ? "cursor-pointer" : ""}`}
    >
                          <img
      src={res.thumbnailUrl}
      alt={res.title}
      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
    />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            {res.videoId && <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg shadow-red-600/40 border border-white/30 backdrop-blur-xs group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 fill-white ml-0.5" />
                              </div>}
                          </div>
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-bold text-white">
                            <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 flex items-center space-x-1">
                              {isYouTube ? <Youtube className="w-3 h-3 text-red-500 inline mr-1" /> : <Globe className="w-3 h-3 text-emerald-400 inline mr-1" />}
                              <span>{res.platform}</span>
                            </span>
                            <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-amber-300">
                              ★ {res.rating?.toFixed(1) || "4.8"}
                            </span>
                          </div>
                        </div>}

                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-red-700 bg-red-50/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-red-200/70 uppercase">
                          {res.stepCategory || "Learn"}
                        </span>

                        <button
      onClick={() => toggleBookmarkResource(res.id, res)}
      className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white/60 transition-colors cursor-pointer"
      title={isBookmarked ? "Remove" : "Save"}
    >
                          <Bookmark
      className={`w-3.5 h-3.5 ${isBookmarked ? "fill-indigo-600 text-indigo-600" : ""}`}
    />
                        </button>
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 line-clamp-2">
                        {res.title}
                      </h3>

                      <p className="text-[11px] text-red-600 font-semibold mb-1.5">
                        {res.instructorOrEntity}
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                        {res.description}
                      </p>
                    </div>

                    {
      /* Actions */
    }
                    <div className="pt-2.5 border-t border-slate-200/50 flex items-center space-x-2">
                      {res.videoId ? <button
      onClick={() => setSelectedVideoModal(res)}
      className="flex-1 inline-flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white text-red-700 border border-white/80 text-xs font-bold transition-all cursor-pointer shadow-2xs backdrop-blur-md"
    >
                          <Play className="w-3 h-3 fill-red-600" />
                          <span>{t("resources_preview_video")}</span>
                        </button> : null}

                      <a
      href={res.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl text-white text-xs font-bold transition-all shadow-xs border border-white/20 ${res.videoId ? "bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md" : "w-full bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"}`}
    >
                        <span>{isYouTube ? t("resources_watch_yt") : "Open"}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>;
  })}
            </div>}
        </div>}

      {
    /* ========================================================== */
  }
      {
    /* MODE 2: CURATED SYLLABUS HUB                               */
  }
      {
    /* ========================================================== */
  }
      {viewMode === "curated" && <div className="space-y-4">
          {
    /* Filter Bar */
  }
          <div className="glass-card rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto no-scrollbar">
              {stepCategories.map((cat) => <button
    key={cat}
    onClick={() => setActiveCategory(cat)}
    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${activeCategory === cat ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xs border border-white/20" : "bg-white/60 text-slate-700 hover:bg-white/90 border border-white/60"}`}
  >
                  {cat === "All" ? "All Steps" : cat}
                </button>)}
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder={t("resources_search_placeholder")}
    className="w-full pl-8 pr-2 py-1.5 text-xs rounded-lg glass-input"
  />
              </div>

              <select
    value={selectedLanguage}
    onChange={(e) => setSelectedLanguage(e.target.value)}
    className="text-xs px-2.5 py-1.5 rounded-lg glass-input font-medium cursor-pointer"
  >
                {languages.map((l) => <option key={l} value={l}>
                    {l === "All" ? "All Lang" : l}
                  </option>)}
              </select>
            </div>
          </div>

          {
    /* Curated Grid */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCuratedResources.map((res) => {
    const isBookmarked = profile.bookmarkedResourceIds.includes(res.id);
    return <div
      key={res.id}
      className="glass-card rounded-2xl p-4.5 hover:shadow-lg hover:border-white transition-all flex flex-col justify-between"
    >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-indigo-200/70">
                        {res.stepCategory} • {res.platform}
                      </span>

                      <button
      onClick={() => toggleBookmarkResource(res.id, res)}
      className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white/60 cursor-pointer transition-colors"
    >
                        <Bookmark
      className={`w-3.5 h-3.5 ${isBookmarked ? "fill-indigo-600 text-indigo-600" : ""}`}
    />
                      </button>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">{res.title}</h3>
                    <p className="text-[11px] text-indigo-600 font-semibold mb-1">
                      {res.instructorOrEntity}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">{res.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-200/50">
                    <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{res.rating.toFixed(1)}</span>
                    </div>

                    <a
      href={res.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold shadow-xs border border-white/20"
    >
                      <span>{t("resources_btn_watch")}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>;
  })}
          </div>
        </div>}

      {
    /* Embedded Video Player Glass Modal */
  }
      {selectedVideoModal && <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
          <div className="glass-dark rounded-3xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/10 text-white">
              <div className="flex items-center space-x-2 truncate">
                <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold truncate">
                  {selectedVideoModal.title}
                </h3>
              </div>
              <button
    onClick={() => setSelectedVideoModal(null)}
    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
  >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              {selectedVideoModal.videoId ? <iframe
    src={`https://www.youtube-nocookie.com/embed/${selectedVideoModal.videoId}?autoplay=1&rel=0`}
    title={selectedVideoModal.title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="w-full h-full border-0"
  /> : null}
            </div>

            <div className="p-3.5 bg-white/5 border-t border-white/10 flex items-center justify-between text-white gap-2">
              <span className="text-xs text-slate-300 truncate">
                {selectedVideoModal.instructorOrEntity}
              </span>
              <div className="flex items-center space-x-2 shrink-0">
                <button
    onClick={() => {
      addDailySession({
        title: `Video: ${selectedVideoModal.title.slice(0, 30)}...`,
        subject: selectedVideoModal.subject || "Core Subject",
        topic: selectedVideoModal.topic || "General Lecture",
        durationMinutes: 45,
        sessionType: "Concept & Theory",
        priority: "high"
      });
    }}
    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-xs border border-white/20"
  >
                  <PlusCircle className="w-3 h-3" />
                  <span>Plan</span>
                </button>
                <a
    href={selectedVideoModal.linkUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold shadow-xs border border-white/20"
  >
                  <span>{t("resources_watch_yt")}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  FreeResourcesView
};
