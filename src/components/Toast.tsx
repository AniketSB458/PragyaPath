import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />,
    info: <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />,
  };

  const bgStyles = {
    success: 'bg-emerald-50/95 border-emerald-200 text-emerald-950',
    info: 'bg-indigo-50/95 border-indigo-200 text-indigo-950',
    warning: 'bg-amber-50/95 border-amber-200 text-amber-950',
    error: 'bg-rose-50/95 border-rose-200 text-rose-950',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div
        className={`p-3.5 rounded-2xl border shadow-xl backdrop-blur-md flex items-start justify-between gap-3 ${
          bgStyles[toast.type] || bgStyles.info
        }`}
      >
        <div className="flex items-start space-x-2.5">
          {icons[toast.type] || icons.info}
          <p className="text-xs font-semibold leading-relaxed">{toast.message}</p>
        </div>

        <button
          onClick={dismissToast}
          aria-label="Close notification"
          className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
