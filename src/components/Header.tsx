import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Compass, Settings2 } from 'lucide-react';

interface HeaderProps {
  onOpenProfileModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfileModal }) => {
  const { profile, language, setLanguage, activeExam, t } = useApp();

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Active Goal */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 border border-white/30 shrink-0">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight bg-linear-to-r from-slate-900 via-indigo-950 to-indigo-800 bg-clip-text text-transparent">
                PragyaPath
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/60 backdrop-blur-md text-indigo-700 border border-indigo-200/80 shadow-2xs">
                {activeExam?.name || profile.targetGoal}
              </span>
            </div>
          </div>

          {/* Right: Streak + Language Toggle + Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Streak */}
            <div
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-amber-50/70 backdrop-blur-md text-amber-900 text-xs font-semibold border border-amber-200/70 shadow-2xs"
              title="Daily Continuous Streak"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{profile.streakDays}d</span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center rounded-xl border border-white/80 p-0.5 bg-white/50 backdrop-blur-md shadow-2xs text-[11px] font-medium">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white/95 text-indigo-700 font-bold shadow-xs border border-white/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-white/95 text-indigo-700 font-bold shadow-xs border border-white/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'mr'
                    ? 'bg-white/95 text-indigo-700 font-bold shadow-xs border border-white/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                मराठी
              </button>
            </div>

            {/* User Profile */}
            <button
              onClick={onOpenProfileModal}
              className="flex items-center space-x-1.5 p-1 sm:px-2.5 sm:py-1 rounded-xl border border-white/80 bg-white/60 backdrop-blur-md hover:bg-white/90 hover:border-indigo-300 shadow-2xs transition-all cursor-pointer group"
              title="Profile & Settings"
            >
              <div className="w-6 h-6 rounded-lg bg-linear-to-tr from-indigo-600 to-purple-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs border border-white/20">
                {getInitials(profile.name)}
              </div>
              <span className="text-xs font-semibold text-slate-800 hidden sm:inline group-hover:text-indigo-600 transition-colors">
                {profile.name.split(' ')[0]}
              </span>
              <Settings2 className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 transition-colors hidden sm:inline" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
