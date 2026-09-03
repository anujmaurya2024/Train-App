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
    <header className="sticky top-0 z-30 mb-6 bg-[#e6ebf4]/90 backdrop-blur-md pb-4 pt-3 transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl neu-flat flex items-center justify-center text-blue-600 border border-white/60">
            <Train className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-800 flex items-center gap-1.5">
                Rail<span className="text-blue-600">ETA</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100/80 text-blue-700 neu-pressed-sm border border-blue-200/50">
                SIH Prototype
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md neu-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                SIMULATED ML FEED
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              AI-Powered Dynamic Train ETA Forecasting &bull; <span className="text-slate-600 font-semibold italic">"Predicting how delays evolve, not just reporting current delay."</span>
            </p>
          </div>
        </div>

        {/* Right Actions & Prototype Notice Badge */}
        <div className="flex items-center flex-wrap gap-2.5">
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl neu-pressed text-[11px] text-slate-600 font-medium border border-white/50">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Ministry of Railways Demo &bull; Smart India Hackathon</span>
          </div>

          <button
            onClick={() => onViewChange('presentation')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentView === 'presentation'
                ? 'neu-pressed text-blue-700 font-extrabold bg-blue-50/50'
                : 'neu-btn text-slate-700 hover:text-blue-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Presentation Mode
          </button>

          <button
            onClick={onStartDemo}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              isDemoActive
                ? 'neu-pressed bg-amber-50 text-amber-700 border border-amber-300'
                : 'neu-btn-primary'
            }`}
          >
            <Activity className={`w-4 h-4 ${isDemoActive ? 'animate-spin text-amber-600' : 'text-white'}`} />
            {isDemoActive ? 'Guided Demo Running...' : 'Start SIH Interactive Demo'}
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="mt-3 px-3 py-1.5 rounded-xl neu-pressed-sm bg-blue-50/40 border border-blue-200/30 flex items-center justify-between text-[11px] text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-800 bg-blue-200/70 px-1.5 py-0.5 rounded text-[10px] tracking-wide">
            SIMULATION NOTICE
          </span>
          <span>
            Prototype ML Simulation: All live train data, speeds, weather disruptions and ETA metrics are dynamically simulated for concept demonstration.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-slate-500">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Evaluation Cycle: 10s intervals</span>
        </div>
      </div>
    </header>
  );
};