import { useApp } from "../context/AppContext";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  AlertCircle,
  Bell,
  X,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";
const Toast = () => {
  const { toast, dismissToast } = useApp();
  if (!toast) return null;
  const isReminder = toast.type === "reminder";
  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />,
    info: <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />,
    reminder: <div className="relative shrink-0 mt-0.5">
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600" />
        </span>
        <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25">
          <Bell className="w-4 h-4 text-white animate-wiggle" />
        </div>
      </div>
  };
  const bgStyles = {
    success: "bg-emerald-50/95 border-emerald-200 text-emerald-950",
    info: "bg-indigo-50/95 border-indigo-200 text-indigo-950",
    warning: "bg-amber-50/95 border-amber-200 text-amber-950",
    error: "bg-rose-50/95 border-rose-200 text-rose-950",
    reminder: "bg-white/95 border-indigo-300/80 text-slate-900 shadow-2xl"
  };
  return <div
    role="status"
    aria-live="polite"
    className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-300"
  >
      <div
    className={`p-4 rounded-2xl border shadow-xl backdrop-blur-xl relative overflow-hidden ${bgStyles[toast.type] || bgStyles.info}`}
  >
        {isReminder && <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-600 via-purple-500 to-amber-400" />}

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            {icons[toast.type] || icons.info}

            <div className="flex-1 min-w-0">
              {isReminder ? <>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/80">
                      Study Task Reminder
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center space-x-1">
                      <Clock className="w-3 h-3 inline text-slate-400" />
                      <span>{(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2">
                    {toast.title || toast.message}
                  </h4>

                  {toast.subtitle && <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{toast.subtitle}</p>}

                  {!toast.title && toast.message && toast.subtitle && <p className="text-xs text-slate-500 mt-1">{toast.message}</p>}

                  {
    /* Reminder Action Buttons */
  }
                  {(toast.action || toast.secondaryAction) && <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                      {toast.action && <button
    onClick={() => {
      toast.action?.onClick();
      dismissToast();
    }}
    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
  >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{toast.action.label}</span>
                          <ArrowRight className="w-3 h-3 ml-0.5" />
                        </button>}

                      {toast.secondaryAction && <button
    onClick={() => {
      toast.secondaryAction?.onClick();
      dismissToast();
    }}
    className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
  >
                          <span>{toast.secondaryAction.label}</span>
                        </button>}
                    </div>}
                </> : <div>
                  {toast.title && <h4 className="text-xs font-bold text-slate-900 mb-0.5">{toast.title}</h4>}
                  <p className="text-xs font-semibold leading-relaxed">{toast.message}</p>
                  {toast.action && <button
    onClick={() => {
      toast.action?.onClick();
      dismissToast();
    }}
    className="mt-2 text-xs font-bold text-indigo-700 hover:text-indigo-900 underline flex items-center space-x-1 cursor-pointer"
  >
                      <span>{toast.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>}
                </div>}
            </div>
          </div>

          <button
    onClick={dismissToast}
    aria-label="Close notification"
    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
  >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>;
};
export {
  Toast
};
