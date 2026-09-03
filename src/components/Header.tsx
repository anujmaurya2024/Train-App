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
    <header className="sticky top-0 z-30 mb-6 rounded-xl border border-[#233B52] bg-[#07111F]/90 pb-4 pt-3 px-3" style={{ boxShadow: 'none' }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl border border-[#233B52] bg-[#0D1B2A] flex items-center justify-center text-[#3BA7FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <Train className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <h1 className="text-2xl font-black tracking-tight text-[#F4F7FB] flex items-center gap-1.5">
                RAIL<span className="text-[#3BA7FF]">ETA</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#112438] text-[#3BA7FF] border border-[#233B52]">
                AI-POWERED RAILWAY OPERATIONS
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#20C997] bg-[#102a23] px-2 py-0.5 rounded-md border border-[#20C997]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#20C997] animate-pulse"></span>
                SYSTEM ONLINE
              </span>
            </div>
            <p className="text-xs font-medium text-[#9BAFC3] mt-0.5">
              Intelligent Dynamic Train ETA &nbsp; <span className="text-[#DCEAFB] font-semibold">Last updated: 18:34:12</span>
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-[#233B52] bg-[#0D1B2A] text-[11px] text-[#9BAFC3] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#3BA7FF]" />
            <span>Ministry of Railways Demo • Smart India Hackathon</span>
          </div>

          <button
            onClick={() => onViewChange('presentation')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
              currentView === 'presentation'
                ? 'text-[#3BA7FF] bg-[#112438] border-[#233B52]'
                : 'text-[#DCEAFB] bg-[#0D1B2A] border-[#233B52] hover:border-[#3BA7FF]/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5B942]" />
            Presentation Mode
          </button>

          <button
            onClick={onStartDemo}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all flex items-center gap-2 border ${
              isDemoActive
                ? 'bg-[#2F2415] text-[#F5B942] border-[#F5B942]/40'
                : 'rail-btn-primary'
            }`}
          >
            <Activity className={`w-4 h-4 ${isDemoActive ? 'animate-spin text-[#F5B942]' : 'text-white'}`} />
            {isDemoActive ? 'Guided Demo Running...' : 'Start Demo'}
          </button>
        </div>
      </div>

      <div className="mt-3 px-3 py-1.5 rounded-lg border border-[#233B52] bg-[#0D1B2A] flex items-center justify-between text-[11px] text-[#9BAFC3]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#3BA7FF] bg-[#112438] px-1.5 py-0.5 rounded text-[10px] tracking-wide border border-[#233B52]">
            LIVE FEED
          </span>
          <span>
            Prototype ML Simulation: live train data, speeds, weather disruptions and ETA metrics are dynamically simulated for concept demonstration.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-[#9BAFC3]">
          <Clock className="w-3 h-3 text-[#F5B942]" />
          <span>Evaluation Cycle: 10s intervals</span>
        </div>
      </div>
    </header>
  );
};