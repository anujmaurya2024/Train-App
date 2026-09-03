import React from 'react';
import { ScenarioLog } from '../types/train';
import { History, ArrowRight, Sparkles, Clock, AlertCircle } from 'lucide-react';

interface EtaEventHistoryProps {
  logs: ScenarioLog[];
  onClearLogs?: () => void;
}

export const EtaEventHistory: React.FC<EtaEventHistoryProps> = ({ logs, onClearLogs }) => {
  return (
    <div className="w-full rounded-2xl neu-flat p-5 border border-white/70">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300/40">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-blue-600 text-white neu-flat-sm">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">
              ETA Prediction Event Log & Progression
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Audit trail of operational updates and dynamic ETA recalculations
            </p>
          </div>
        </div>

        {onClearLogs && (
          <button
            onClick={onClearLogs}
            className="text-[11px] font-bold text-slate-500 hover:text-rose-600 neu-btn px-2.5 py-1 rounded-lg"
          >
            Clear Log
          </button>
        )}
      </div>

      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {logs.map((log) => {
          const typeColors = {
            info: 'border-l-blue-500 bg-blue-50/40',
            warning: 'border-l-amber-500 bg-amber-50/40',
            alert: 'border-l-rose-500 bg-rose-50/40',
            success: 'border-l-emerald-500 bg-emerald-50/40',
          }[log.type];

          return (
            <div
              key={log.id}
              className={`p-3 rounded-xl neu-pressed text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-l-4 ${typeColors} transition-all`}
            >
              <div className="flex items-start space-x-2.5 min-w-0">
                <div className="p-1 rounded bg-white text-slate-600 neu-flat-sm shrink-0 mt-0.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-700 text-[11px]">
                      {log.timestamp}
                    </span>
                    <span className="font-extrabold text-slate-800 text-xs truncate">
                      {log.event}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {log.detail}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center">
                {log.delayChange && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                    {log.delayChange}
                  </span>
                )}
                <div className="px-2.5 py-1 rounded-lg neu-flat bg-white font-mono font-black text-blue-700 text-xs flex items-center gap-1 border border-blue-200">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <span>ETA {log.dynamicEta}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};