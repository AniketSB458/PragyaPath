import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  GraduationCap,
  HelpCircle,
  Route,
  BotMessageSquare,
  BookmarkCheck,
  LayoutDashboard,
  Compass,
  FileCheck2,
  CalendarCheck2,
  Award,
  ChevronDown,
  X
} from "lucide-react";
const Navigation = () => {
  const { activeTab, setActiveTab, t } = useApp();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const primaryNavItems = [
    { id: "resources", label: t("nav_resources"), icon: GraduationCap },
    { id: "practice", label: t("nav_practice"), icon: HelpCircle },
    { id: "roadmap", label: t("nav_roadmap"), icon: Route },
    { id: "mentor", label: t("nav_mentor"), icon: BotMessageSquare },
    { id: "library", label: t("nav_library"), icon: BookmarkCheck }
  ];
  const secondaryNavItems = [
    { id: "dashboard", label: t("nav_dashboard"), icon: LayoutDashboard },
    { id: "planner", label: t("nav_planner"), icon: CalendarCheck2 },
    { id: "mocks", label: t("nav_mocks"), icon: Award },
    { id: "careers", label: t("nav_careers"), icon: Compass },
    { id: "exams", label: t("nav_exams"), icon: FileCheck2 }
  ];
  const activeSecondaryItem = secondaryNavItems.find((item) => item.id === activeTab);
  return <>
      {
    /* Sleek Compact Frosted Glass Desktop Navigation */
  }
      <nav className="bg-white/60 backdrop-blur-xl border-b border-white/50 sticky top-14 z-30 hidden md:block shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-1">
              {primaryNavItems.map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return <button
      key={item.id}
      onClick={() => setActiveTab(item.id)}
      className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isActive ? "bg-linear-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white shadow-sm shadow-indigo-500/25 border border-white/20 font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-white/60"}`}
    >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </button>;
  })}

              {
    /* Compact "More Tools" Dropdown */
  }
              <div className="relative" ref={dropdownRef}>
                <button
    onClick={() => setIsMoreOpen(!isMoreOpen)}
    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeSecondaryItem ? "bg-indigo-50/80 backdrop-blur-md text-indigo-700 font-bold border border-indigo-200/80 shadow-2xs" : "text-slate-600 hover:text-slate-900 hover:bg-white/60"}`}
  >
                  {activeSecondaryItem ? <>
                      <activeSecondaryItem.icon className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{activeSecondaryItem.label}</span>
                    </> : <span>{t("all_modules")}</span>}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isMoreOpen && <div className="absolute left-0 mt-2 w-52 glass-card rounded-2xl shadow-xl border border-white/80 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {secondaryNavItems.map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return <button
      key={item.id}
      onClick={() => {
        setActiveTab(item.id);
        setIsMoreOpen(false);
      }}
      className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${isActive ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xs" : "text-slate-700 hover:bg-white/70"}`}
    >
                          <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                          <span>{item.label}</span>
                        </button>;
  })}
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {
    /* Mobile Bottom Navigation Bar (Glassmorphic 5 Clean Icons) */
  }
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/75 backdrop-blur-xl border-t border-white/60 px-3 py-1 flex items-center justify-around safe-area-pb shadow-lg">
        {primaryNavItems.slice(0, 4).map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return <button
      key={item.id}
      onClick={() => setActiveTab(item.id)}
      className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl cursor-pointer ${isActive ? "text-indigo-600 font-bold bg-indigo-50/60" : "text-slate-500"}`}
    >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>;
  })}

        {
    /* More Button */
  }
        <button
    onClick={() => setIsMobileMoreOpen(true)}
    className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl cursor-pointer ${activeSecondaryItem || activeTab === "library" ? "text-indigo-600 font-bold bg-indigo-50/60" : "text-slate-500"}`}
  >
          <BookmarkCheck className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">
            {activeSecondaryItem ? activeSecondaryItem.label : t("all_modules")}
          </span>
        </button>
      </div>

      {
    /* Mobile Drawer */
  }
      {isMobileMoreOpen && <div
    className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end"
    onClick={() => setIsMobileMoreOpen(false)}
  >
          <div
    className="glass-card rounded-t-3xl p-5 space-y-3 shadow-2xl border border-white/80 animate-in slide-in-from-bottom duration-200"
    onClick={(e) => e.stopPropagation()}
  >
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
              <span className="text-sm font-bold text-slate-900">{t("all_modules")}</span>
              <button
    onClick={() => setIsMobileMoreOpen(false)}
    className="p-1.5 rounded-xl bg-white/60 text-slate-400 hover:text-slate-700"
  >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
    onClick={() => {
      setActiveTab("library");
      setIsMobileMoreOpen(false);
    }}
    className={`flex items-center space-x-2 p-2.5 rounded-xl border text-xs font-semibold ${activeTab === "library" ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white border-white/30 shadow-xs" : "bg-white/60 text-slate-700 border-white/80"}`}
  >
                <BookmarkCheck className="w-4 h-4" />
                <span>{t("nav_library")}</span>
              </button>

              {secondaryNavItems.map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return <button
      key={item.id}
      onClick={() => {
        setActiveTab(item.id);
        setIsMobileMoreOpen(false);
      }}
      className={`flex items-center space-x-2 p-2.5 rounded-xl border text-xs font-semibold ${isActive ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white border-white/30 shadow-xs" : "bg-white/60 text-slate-700 border-white/80"}`}
    >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>;
  })}
            </div>
          </div>
        </div>}
    </>;
};
export {
  Navigation
};
