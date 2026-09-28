import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toast } from './components/Toast';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { CareerDiscoveryView } from './components/CareerDiscoveryView';
import { ExamEligibilityView } from './components/ExamEligibilityView';
import { RoadmapView } from './components/RoadmapView';
import { FreeResourcesView } from './components/FreeResourcesView';
import { DailyPlannerView } from './components/DailyPlannerView';
import { AdaptivePracticeView } from './components/AdaptivePracticeView';
import { MockTestsView } from './components/MockTestsView';
import { MentorChatView } from './components/MentorChatView';
import { MyLibraryView } from './components/MyLibraryView';
import { ProfileModal } from './components/ProfileModal';
import { Compass, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-linear-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Ambient Glassmorphic Background Glow Orbs */}
      <div className="fixed top-[-12%] left-[-8%] w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full ambient-glow-1 blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-[32%] right-[-12%] w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full ambient-glow-2 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-[-15%] left-[20%] w-[650px] sm:w-[800px] h-[650px] sm:h-[800px] rounded-full ambient-glow-3 blur-3xl pointer-events-none -z-10" />

      {/* Top Header */}
      <Header onOpenProfileModal={() => setIsProfileModalOpen(true)} />

      {/* Navigation (Sticky desktop bar + mobile top bar & bottom bar) */}
      <Navigation onOpenProfileModal={() => setIsProfileModalOpen(true)} />

      {/* Main Content Area with mobile safe bottom clearance */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-28 md:pb-8 relative z-0">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'careers' && <CareerDiscoveryView />}
        {activeTab === 'exams' && <ExamEligibilityView />}
        {activeTab === 'roadmap' && <RoadmapView />}
        {activeTab === 'resources' && <FreeResourcesView />}
        {activeTab === 'planner' && <DailyPlannerView />}
        {activeTab === 'practice' && <AdaptivePracticeView />}
        {activeTab === 'mocks' && <MockTestsView />}
        {activeTab === 'mentor' && <MentorChatView />}
        {activeTab === 'library' && <MyLibraryView />}
      </main>

      {/* Profile Settings Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Global Toast Notification System */}
      <Toast />

      {/* Glassmorphic Footer */}
      <footer className="glass-card border-x-0 border-b-0 mt-12 py-8 text-xs text-slate-500 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-slate-900 text-sm">PragyaPath</span>
            <span className="text-slate-300">|</span>
            <span>{t('tagline')}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-slate-600 font-medium">
            <button onClick={() => setActiveTab('careers')} className="hover:text-indigo-600 cursor-pointer">
              {t('nav_careers')}
            </button>
            <button onClick={() => setActiveTab('exams')} className="hover:text-indigo-600 cursor-pointer">
              {t('nav_exams')}
            </button>
            <button onClick={() => setActiveTab('roadmap')} className="hover:text-indigo-600 cursor-pointer">
              {t('nav_roadmap')}
            </button>
            <button onClick={() => setActiveTab('resources')} className="hover:text-indigo-600 cursor-pointer">
              {t('nav_resources')}
            </button>
            <button onClick={() => setActiveTab('practice')} className="hover:text-indigo-600 cursor-pointer">
              {t('nav_practice')}
            </button>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-400 text-center sm:text-left">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Sourced from Official Gazettes & IISc / UPSC / SSC Notifications</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
