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
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 relative overflow-hidden shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-sky-50 text-blue-600 border border-sky-200">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              Core ETA Intelligence Comparison
            </h2>
            <p className="text-[11px] text-slate-600 font-medium">
              Scheduled vs Linear Static vs RailETA Dynamic ML Forecast
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Model Confidence:</span>
          <div className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-extrabold text-xs flex items-center gap-1.5 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{confidenceScore}% Highly Confident</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="rounded-xl p-4 bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-slate-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Official Timetable</span>
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-medium text-slate-600">Scheduled ETA</div>
          <div className="text-3xl font-black text-slate-900 my-1 font-mono tracking-tight">
            {scheduledEta}
          </div>
          <div className="text-[11px] text-slate-600 font-medium">
            Published working timetable (WTT)
          </div>
        </div>

        <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Conventional Logic</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 font-bold text-amber-700">Static</span>
          </div>
          <div className="text-xs font-medium text-slate-700">Static ETA</div>
          <div className="text-3xl font-black text-amber-700 my-1 font-mono tracking-tight">
            {staticEta}
          </div>
          <div className="text-[11px] text-amber-700 font-medium">
            Scheduled + Current Delay (+{currentDelayMin}m)
          </div>
          <div className="text-[10px] text-slate-600 mt-1 italic">
            Assumes static delay with zero future variability
          </div>
        </div>

        <div className="rounded-xl p-4 bg-sky-50 border-2 border-blue-200 relative group">
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> RailETA
            </span>
          </div>
          <div className="text-xs font-bold text-blue-600">Dynamic ETA (ML Forecast)</div>

          <div className="flex items-baseline gap-2 my-1" aria-live="polite">
            <span key={dynamicEta} className="text-3xl sm:text-4xl font-black text-blue-600 font-mono tracking-tight animate-eta-update">
              {dynamicEta}
            </span>
            {previousDynamicEta && previousDynamicEta !== dynamicEta && (
              <span className="text-xs font-bold text-slate-400 line-through font-mono">
                {previousDynamicEta}
              </span>
            )}
          </div>

          <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>
              Expected Window: {arrivalWindow.from} – {arrivalWindow.to}
            </span>
          </div>
          <div className="text-[10px] text-slate-600 mt-1 font-medium">
            Predicted final delay: <span className="font-extrabold text-blue-600">+{predictedFinalDelayMin} min</span>
            {isDelayRecovered && <span className="text-emerald-600 font-bold ml-1">(Reclaiming {currentDelayMin - predictedFinalDelayMin}m)</span>}
            {isDelayExpanded && <span className="text-red-600 font-bold ml-1">(+ {predictedFinalDelayMin - currentDelayMin}m propagation)</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <div className="font-extrabold text-slate-900 flex items-center gap-1.5 mb-0.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            Why Static ETA Fails:
          </div>
          <p className="text-[11px] text-slate-600">
            Calculates <span className="font-mono text-slate-800">Scheduled Arrival + Current Delay</span>. It assumes railway networks are frozen in time, ignoring section clearance, high-speed recovery corridors, and downstream bottlenecks.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <div className="font-extrabold text-slate-900 flex items-center gap-1.5 mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Why RailETA Dynamic ETA Wins:
          </div>
          <p className="text-[11px] text-slate-600">
            Dynamically synthesizes track section congestion, speed restrictions, weather gradient, and priority recovery buffers to forecast how delay actively compresses or expands.
          </p>
        </div>
      </div>
    </div>
  );
};
