import React from 'react';
import { TrainData } from '../types/train';
import { TrendingDown, Sparkles, BarChart2 } from 'lucide-react';

interface DelayEvolutionChartProps {
  train: TrainData;
}

export const DelayEvolutionChart: React.FC<DelayEvolutionChartProps> = ({ train }) => {
  const points = train.delayProgression;
  const maxDelay = Math.max(...points.map(p => p.predictedDelay), 20);

  return (
    <div className="w-full rounded-2xl neu-flat p-5 border border-white/70">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-300/40">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-blue-600 text-white neu-flat-sm">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">
              Predicted Delay Evolution
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Station-by-station delay compression forecast along the corridor
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg neu-pressed">
          Delay Recovery Active
        </span>
      </div>

      {/* Visual Bar Graph of Delay Progression */}
      <div className="space-y-3 my-4">
        {points.map((pt, idx) => {
          const widthPercent = Math.max(12, Math.min(100, (pt.predictedDelay / maxDelay) * 100));
          const isFinal = idx === points.length - 1;

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  {pt.station}
                </span>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-blue-700 font-bold">ETA {pt.dynamicEta}</span>
                  <span className="text-amber-700 font-extrabold">+{pt.predictedDelay} min</span>
                </div>
              </div>

              {/* Bar line */}
              <div className="w-full h-3.5 bg-slate-200/80 rounded-full neu-pressed-sm overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isFinal
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : 'bg-gradient-to-r from-amber-500 via-blue-500 to-indigo-600'
                  }`}
                  style={{ width: `${widthPercent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl neu-pressed bg-slate-100/60 border border-white text-xs text-slate-600">
        <span className="font-extrabold text-slate-800">Core Insight: </span>
        "The train may recover accumulated delay on favorable route sections (e.g. high-speed Jhansi–Bina double chord track), reducing final terminus delay from <span className="font-bold text-amber-700">+{train.currentDelayMin}m</span> to <span className="font-bold text-emerald-700">+{train.predictedFinalDelayMin}m</span>."
      </div>
    </div>
  );
};