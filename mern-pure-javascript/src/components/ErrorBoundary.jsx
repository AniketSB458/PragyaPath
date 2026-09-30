import { Component } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };
  static getDerivedStateFromError(error) {
    return { hasError: true, error, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }
  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };
  handleClearStorageAndReload = () => {
    try {
      localStorage.removeItem("pragyapath_user_profile");
      localStorage.removeItem("pragyapath_daily_sessions");
      localStorage.removeItem("pragyapath_notes");
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };
  render() {
    if (this.state.hasError) {
      return <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Something went wrong
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                PragyaPath caught an unexpected rendering error. Your data and progress are safe.
              </p>
            </div>

            {this.state.error && <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left overflow-auto max-h-32 text-[11px] font-mono text-slate-700">
                {this.state.error.message}
              </div>}

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
        onClick={this.handleReset}
        className="w-full sm:flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
      >
                <RotateCcw className="w-4 h-4" />
                <span>Reload App</span>
              </button>

              <button
        onClick={this.handleClearStorageAndReload}
        className="w-full sm:flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
      >
                <span>Reset Cache</span>
              </button>
            </div>
          </div>
        </div>;
    }
    return this.props.children;
  }
}
export {
  ErrorBoundary
};
