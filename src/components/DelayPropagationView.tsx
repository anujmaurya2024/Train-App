import React from 'react';
import { Network, ArrowRight, AlertTriangle, Clock, Layers, Sparkles } from 'lucide-react';

export const DelayPropagationView: React.FC = () => {
  const steps = [
    {
      title: 'Train 12001 Delayed (+12 min)',
      sub: 'Encountered caution order on Mathura-Agra',
      color: 'bg-rose-50 border-rose-200 text-rose-800',
      badge: 'Primary Event',
    },
    {
      title: 'Track Section Occupied Longer',
      sub: 'Automatic block section release delayed by 8 mins',
      color: 'bg-amber-50 border-amber-200 text-amber-800',
      badge: 'Infrastructure Block',
    },
    {
      title: 'Congestion Density Increases',
      sub: 'Section headways compress below safe spacing limit',
      color: 'bg-orange-50 border-orange-200 text-orange-800',
      badge: 'Flow Cascading',
    },
    {
      title: 'Trailing Train 12002 Affected',
      sub: 'Forced speed reduction to double-yellow signal aspect',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      badge: 'Secondary Impact',
    },
    {
      title: 'Predicted ETA Updated (12:14 -> 12:19)',
      sub: 'RailETA proactively warns controllers 45 mins before arrival',
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      badge: 'Proactive Alert',
    },
  ];

  return (
    <div className="w-full rounded-2xl neu-flat p-6 border border-white/80 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-300/40">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white neu-flat-sm">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-800">
                Network Delay Propagation
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold neu-pressed-sm">
                Conceptual Network-Aware Delay Analysis
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Simulating downstream ripple effects of sectional track occupancy across adjacent train paths
            </p>
          </div>
        </div>
      </div>

      {/* Cascading Chain Visual with Nodes */}
      <div className="relative py-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 relative">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className={`flex-1 p-4 rounded-2xl neu-flat ${step.color} border transition-all hover:scale-105 duration-300 relative group`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded neu-pressed-sm bg-white/70">
                    {step.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                </div>
                <h4 className="text-xs font-extrabold text-slate-800 leading-snug">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 font-medium leading-relaxed">
                  {step.sub}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center text-blue-600 py-1 lg:py-0">
                  <ArrowRight className="w-5 h-5 rotate-90 lg:rotate-0 stroke-[2.5] animate-pulse" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Network Intelligence Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
        <div className="p-4 rounded-2xl neu-pressed bg-slate-100/70 border border-white">
          <div className="flex items-center space-x-2 text-slate-800 font-extrabold mb-1">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Legacy Isolated Tracking vs Network-Aware ETA</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
            Conventional apps track each train in complete isolation. In real railway operations, one train delayed in a block directly causes yellow/red signal aspects for trailing trains.
          </p>
        </div>

        <div className="p-4 rounded-2xl neu-flat bg-blue-50/80 border border-blue-200">
          <div className="flex items-center space-x-2 text-blue-900 font-extrabold mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Future Graph Neural Network (GNN) Enhancement</span>
          </div>
          <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
            RailETA's planned Stage 2 integrates Spatio-Temporal Graph Neural Networks (ST-GNN) where stations and junctions form network nodes and train tracks form edges.
          </p>
        </div>
      </div>
    </div>
  );
};