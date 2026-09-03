import React from 'react';
import { Clock, TrendingUp, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

interface EtaComparisonCardProps {
  scheduledEta: string;
  staticEta: string;
  dynamicEta: string;
  confidenceScore: number;
  arrivalWindow: {
    from: string;
    to: string;
  };
  currentDelayMin: number;
  predictedFinalDelayMin: number;
  previousDynamicEta?: string;
}

export const EtaComparisonCard: React.FC<EtaComparisonCardProps> = ({
  scheduledEta,
  staticEta,
  dynamicEta,
  confidenceScore,
  arrivalWindow,
  currentDelayMin,
  predictedFinalDelayMin,
  previousDynamicEta,
}) => {
  const isDelayRecovered = predictedFinalDelayMin < currentDelayMin;
  const isDelayExpanded = predictedFinalDelayMin > currentDelayMin;

  return (
    <div className="w-full rounded-xl border border-[#233B52] bg-[#0D1B2A] p-5 relative overflow-hidden" style={{ boxShadow: 'none' }}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#233B52]">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-[#112438] text-[#3BA7FF] border border-[#233B52]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#F4F7FB]">
              Core ETA Intelligence Comparison
            </h2>
            <p className="text-[11px] text-[#9BAFC3] font-medium">
              Scheduled vs Linear Static vs RailETA Dynamic ML Forecast
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#9BAFC3]">Model Confidence:</span>
          <div className="px-3 py-1 rounded-lg bg-[#112B25] text-[#20C997] font-extrabold text-xs flex items-center gap-1.5 border border-[#20C997]/20">
            <CheckCircle className="w-3.5 h-3.5 text-[#20C997]" />
            <span>{confidenceScore}% Highly Confident</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="rounded-xl p-4 bg-[#112438] border border-[#233B52]">
          <div className="flex items-center justify-between text-[#9BAFC3] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Official Timetable</span>
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-medium text-[#9BAFC3]">Scheduled ETA</div>
          <div className="text-3xl font-black text-[#F4F7FB] my-1 font-mono tracking-tight">
            {scheduledEta}
          </div>
          <div className="text-[11px] text-[#9BAFC3] font-medium">
            Published working timetable (WTT)
          </div>
        </div>

        <div className="rounded-xl p-4 bg-[#1C2E41] border border-[#F5B942]/30">
          <div className="flex items-center justify-between text-[#F5B942] mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Conventional Logic</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2F2415] font-bold">Static</span>
          </div>
          <div className="text-xs font-medium text-[#DCEAFB]">Static ETA</div>
          <div className="text-3xl font-black text-[#F5B942] my-1 font-mono tracking-tight">
            {staticEta}
          </div>
          <div className="text-[11px] text-[#F5B942] font-medium">
            Scheduled + Current Delay (+{currentDelayMin}m)
          </div>
          <div className="text-[10px] text-[#9BAFC3] mt-1 italic">
            Assumes static delay with zero future variability
          </div>
        </div>

        <div className="rounded-xl p-4 bg-[#0F2036] border-2 border-[#3BA7FF]/40 relative group">
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#3BA7FF] text-[#07111F] flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> RailETA
            </span>
          </div>
          <div className="text-xs font-bold text-[#3BA7FF]">Dynamic ETA (ML Forecast)</div>

          <div className="flex items-baseline gap-2 my-1">
            <span className="text-3xl sm:text-4xl font-black text-[#3BA7FF] font-mono tracking-tight animate-eta-update">
              {dynamicEta}
            </span>
            {previousDynamicEta && previousDynamicEta !== dynamicEta && (
              <span className="text-xs font-bold text-[#64798E] line-through font-mono">
                {previousDynamicEta}
              </span>
            )}
          </div>

          <div className="text-[11px] font-bold text-[#DCEAFB] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#3BA7FF]" />
            <span>
              Expected Window: {arrivalWindow.from} – {arrivalWindow.to}
            </span>
          </div>
          <div className="text-[10px] text-[#9BAFC3] mt-1 font-medium">
            Predicted final delay: <span className="font-extrabold text-[#3BA7FF]">+{predictedFinalDelayMin} min</span>
            {isDelayRecovered && <span className="text-[#20C997] font-bold ml-1">(Reclaiming {currentDelayMin - predictedFinalDelayMin}m)</span>}
            {isDelayExpanded && <span className="text-[#EF5350] font-bold ml-1">(+ {predictedFinalDelayMin - currentDelayMin}m propagation)</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
        <div className="p-3 rounded-lg bg-[#112438] border border-[#233B52]">
          <div className="font-extrabold text-[#F4F7FB] flex items-center gap-1.5 mb-0.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#F5B942]" />
            Why Static ETA Fails:
          </div>
          <p className="text-[11px] text-[#9BAFC3]">
            Calculates <span className="font-mono text-[#DCEAFB]">Scheduled Arrival + Current Delay</span>. It assumes railway networks are frozen in time, ignoring section clearance, high-speed recovery corridors, and downstream bottlenecks.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-[#112438] border border-[#233B52]">
          <div className="font-extrabold text-[#F4F7FB] flex items-center gap-1.5 mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-[#3BA7FF]" />
            Why RailETA Dynamic ETA Wins:
          </div>
          <p className="text-[11px] text-[#9BAFC3]">
            Dynamically synthesizes track section congestion, speed restrictions, weather gradient, and priority recovery buffers to forecast how delay actively compresses or expands.
          </p>
        </div>
      </div>
    </div>
  );
};