import React, { useEffect, useState } from 'react';
import { Train, Sparkles, Activity, ShieldCheck, Clock } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onStartDemo: () => void;
  isDemoActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onStartDemo,
  isDemoActive,
}) => {
  const [lastUpdated, setLastUpdated] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 10_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <header className="sticky top-3 z-30 mb-5 rounded-2xl border border-slate-200/90 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Train className="h-6 w-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                Rail<span className="text-blue-600">ETA</span>
              </h1>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                Live Ops
              </span>
              <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                System online
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Intelligent ETA monitoring for railway operations
              <span className="ml-2 font-semibold text-slate-800" aria-live="polite">Updated: {lastUpdated}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600 lg:flex">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Rail operations dashboard
          </div>

          <button
            onClick={() => onViewChange('presentation')}
            className={`rounded-lg border px-3.5 py-2 text-xs font-bold transition-all ${
              currentView === 'presentation'
                ? 'border-sky-200 bg-sky-50 text-blue-600'
                : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-slate-900'
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Presentation mode
            </span>
          </button>

          <button
            onClick={onStartDemo}
            className={`rounded-lg border px-4 py-2 text-xs font-extrabold transition-all ${
              isDemoActive
                ? 'border-amber-200 bg-amber-50 text-amber-700'
                : 'border-blue-600 bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Activity className={`h-4 w-4 ${isDemoActive ? 'animate-spin text-amber-600' : 'text-white'}`} />
              {isDemoActive ? 'Demo running' : 'Start demo'}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
            Live feed
          </span>
          <span className="hidden sm:inline">Operational model updated with real-time delay, weather, and speed data.</span>
          <span className="sm:hidden">Predictions are updating in real time.</span>
        </div>
        <div className="hidden items-center gap-1 text-[10px] font-semibold text-slate-500 sm:flex">
          <Clock className="h-3 w-3 text-amber-500" />
          Evaluation cycle: 10s interval
        </div>
      </div>
    </header>
  );
};
