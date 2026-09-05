import React from 'react';
import { TrainData } from '../types/train';
import { Layers, AlertCircle, ShieldAlert, ArrowUpRight, CheckCircle2, TrendingDown, Clock } from 'lucide-react';

interface OperationsViewProps {
  trains: TrainData[];
  onSelectTrain: (train: TrainData) => void;
  onOpenLivePrediction: (train: TrainData) => void;
}

export const OperationsView: React.FC<OperationsViewProps> = ({
  trains,
  onSelectTrain,
  onOpenLivePrediction,
}) => {
  return (
    <div className="space-y-6">
      {/* Operations Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-300/40">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white neu-flat-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
              Railway Operations Dispatch Dashboard
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold neu-pressed-sm">
                Control Center
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Sectional controller monitoring, delay mitigation priorities & corridor dispatch overview
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Active Sector:</span>
          <span className="px-3 py-1 rounded-xl text-xs font-extrabold neu-pressed bg-blue-50 text-blue-800 border border-blue-200">
            Delhi - Agra - Jhansi Section
          </span>
        </div>
      </div>

      {/* Train Operations Table */}
      <div className="rounded-2xl neu-flat p-5 border border-white/80">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-300/80 text-slate-500 text-[10px] uppercase tracking-wider font-extrabold">
                <th className="py-3 px-3">Train Number & Name</th>
                <th className="py-3 px-3">Current Section</th>
                <th className="py-3 px-3">Current Delay</th>
                <th className="py-3 px-3">Predicted Final Delay</th>
                <th className="py-3 px-3">Dynamic ETA</th>
                <th className="py-3 px-3">Confidence</th>
                <th className="py-3 px-3">Risk Assessment</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 font-medium">
              {trains.map((train) => {
                const riskBadge = {
                  Low: 'bg-emerald-100/80 text-emerald-800 border-emerald-300',
                  Medium: 'bg-amber-100/80 text-amber-800 border-amber-300',
                  High: 'bg-rose-100/80 text-rose-800 border-rose-300',
                  Recovering: 'bg-blue-100/80 text-blue-800 border-blue-300',
                }[train.risk];

                return (
                  <tr key={train.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-black text-slate-900 bg-slate-200/70 px-1.5 py-0.5 rounded text-[11px]">
                          {train.number}
                        </span>
                        <div>
                          <div className="font-extrabold text-slate-800 text-xs">{train.name}</div>
                          <div className="text-[10px] text-slate-500">{train.type}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-mono font-bold text-slate-700">
                      {train.currentSection}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="font-mono font-extrabold text-amber-700">
                        +{train.currentDelayMin} min
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1 font-mono font-black text-slate-800">
                        <span>+{train.predictedFinalDelayMin} min</span>
                        {train.predictedFinalDelayMin < train.currentDelayMin && (
                          <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-mono font-black text-blue-700 text-sm">
                      {train.dynamicEta}
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-slate-700">{train.confidenceScore}%</span>
                        <div className="w-12 h-2 rounded-full bg-slate-200 overflow-hidden neu-pressed-sm">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${train.confidenceScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border neu-sm ${riskBadge}`}>
                        {train.risk}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => {
                          onSelectTrain(train);
                          onOpenLivePrediction(train);
                        }}
                        className="neu-btn px-3 py-1 rounded-xl text-[11px] font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
                      >
                        View live
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Controller Strategy Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl neu-flat bg-slate-50/70 border border-white">
          <div className="flex items-center space-x-2 text-emerald-700 font-extrabold text-xs mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Optimal Dispatch Corridor</span>
          </div>
          <p className="text-[11px] text-slate-600 font-medium">
            Train 12001 (Rajdhani) & 12002 (Shatabdi) maintaining nominal headroom. Block headway buffer: 8.4 km.
          </p>
        </div>

        <div className="p-4 rounded-2xl neu-flat bg-slate-50/70 border border-white">
          <div className="flex items-center space-x-2 text-rose-700 font-extrabold text-xs mb-1">
            <AlertCircle className="w-4 h-4" />
            <span>High Risk Bottleneck Flag</span>
          </div>
          <p className="text-[11px] text-slate-600 font-medium">
            Train 12621 (Southern Express) traversing Gwalior-Agra segment with +20m delay and heavy freight queue.
          </p>
        </div>

        <div className="p-4 rounded-2xl neu-flat bg-slate-50/70 border border-white">
          <div className="flex items-center space-x-2 text-blue-700 font-extrabold text-xs mb-1">
            <TrendingDown className="w-4 h-4" />
            <span>Dynamic Recovery Window</span>
          </div>
          <p className="text-[11px] text-slate-600 font-medium">
            Train 12951 recovering 3 minutes through automated block signal clearing in Jhansi sector.
          </p>
        </div>
      </div>
    </div>
  );
};