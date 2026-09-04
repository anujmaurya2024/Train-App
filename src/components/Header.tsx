import React from 'react';
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
  return (
    <header className="sticky top-0 z-30 mb-6 rounded-xl border border-slate-200 bg-white/90 pb-4 pt-3 px-3" style={{ boxShadow: 'none' }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-blue-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <Train className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                RAIL<span className="text-blue-600">ETA</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-blue-600 border border-sky-200">
                AI-POWERED RAILWAY OPERATIONS
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                SYSTEM ONLINE
              </span>
            </div>
            <p className="text-xs font-medium text-slate-600 mt-0.5">
              Intelligent Dynamic Train ETA &nbsp; <span className="text-slate-800 font-semibold">Last updated: 18:34:12</span>
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[11px] text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Ministry of Railways Demo • Smart India Hackathon</span>
          </div>

          <button
            onClick={() => onViewChange('presentation')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
              currentView === 'presentation'
                ? 'text-blue-600 bg-sky-50 border-sky-200'
                : 'text-slate-700 bg-white border-slate-200 hover:border-blue-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Presentation Mode
          </button>

          <button
            onClick={onStartDemo}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all flex items-center gap-2 border ${
              isDemoActive
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-500'
            }`}
          >
            <Activity className={`w-4 h-4 ${isDemoActive ? 'animate-spin text-amber-600' : 'text-white'}`} />
            {isDemoActive ? 'Guided Demo Running...' : 'Start Demo'}
          </button>
        </div>
      </div>

      <div className="mt-3 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-600 bg-sky-50 px-1.5 py-0.5 rounded text-[10px] tracking-wide border border-sky-200">
            LIVE FEED
          </span>
          <span>
            Prototype ML Simulation: live train data, speeds, weather disruptions and ETA metrics are dynamically simulated for concept demonstration.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-slate-500">
          <Clock className="w-3 h-3 text-amber-500" />
          <span>Evaluation Cycle: 10s intervals</span>
        </div>
      </div>
    </header>
  );
};