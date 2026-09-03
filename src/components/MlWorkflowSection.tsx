import React from 'react';
import { ArrowDown, Cpu, Sparkles, Database, Layers, CheckCircle2 } from 'lucide-react';

export const MlWorkflowSection: React.FC = () => {
  const inputs = [
    'Historical Train Behaviour',
    'Current Dynamic Delay',
    'Current Real-Time Speed',
    'Route Track Segment',
    'Sectional Congestion Index',
    'Micro-Weather & Fog Data',
    'Temporary Speed Restriction',
    'Unscheduled Precedence Stops',
    'Section Recovery Potential',
  ];

  return (
    <div className="w-full rounded-2xl neu-flat p-5 border border-white/70">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-300/40">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-blue-600 text-white neu-flat-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-800">
                How Dynamic ETA is Predicted
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold neu-pressed-sm">
                Prototype ML Simulation
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Architectural diagram of the continuous delay inference & propagation pipeline
            </p>
          </div>
        </div>
      </div>

      {/* Visual ML Pipeline Flow */}
      <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
        {/* Step 1: Input Multi-Feature Matrix */}
        <div className="w-full">
          <div className="text-center mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-600 bg-slate-200/80 px-3 py-1 rounded-full neu-pressed-sm">
              STEP 1 &bull; Real-Time Multi-Feature Ingestion Matrix
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-2xl neu-pressed bg-slate-100/60 border border-white">
            {inputs.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl neu-flat-sm bg-white text-xs font-bold text-slate-700 flex items-center gap-2 border border-slate-200/60"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></div>
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Down Arrow */}
        <div className="text-blue-600 p-1.5 rounded-full neu-pressed-sm animate-bounce">
          <ArrowDown className="w-5 h-5 stroke-[2.5]" />
        </div>

        {/* Step 2: Feature Engineering & Processing */}
        <div className="w-full p-4 rounded-2xl neu-flat bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white font-bold neu-pressed-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-800 uppercase tracking-wide">
                STEP 2 &bull; Feature Processing & Normalization
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                Temporal window slicing, speed delta vs section ceiling, rolling congestion score
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-200 text-blue-800">
            Real-Time Sliding Window
          </span>
        </div>

        {/* Down Arrow */}
        <div className="text-blue-600 p-1.5 rounded-full neu-pressed-sm animate-bounce">
          <ArrowDown className="w-5 h-5 stroke-[2.5]" />
        </div>

        {/* Step 3: Proposed Future ML Engine */}
        <div className="w-full p-4 rounded-2xl neu-flat bg-gradient-to-r from-indigo-100 via-blue-100 to-indigo-50 border-2 border-blue-500/50 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold neu-pressed">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                  STEP 3 &bull; Future ML Prediction Model
                  <span className="text-[9px] px-2 py-0.5 rounded-md bg-blue-700 text-white font-black">
                    LightGBM + LSTM
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">
                  Predicts sectional run-time variability and cumulative delay expansion/recovery probability
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Down Arrow */}
        <div className="text-blue-600 p-1.5 rounded-full neu-pressed-sm animate-bounce">
          <ArrowDown className="w-5 h-5 stroke-[2.5]" />
        </div>

        {/* Step 4: Output Synthesis */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl neu-pressed bg-slate-100/70 border border-white text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
              STEP 4 &bull; Inferred Output
            </span>
            <span className="text-sm font-extrabold text-slate-800">
              Predicted Arrival Delay: <span className="text-amber-700 font-mono">+10 min</span>
            </span>
          </div>

          <div className="p-3.5 rounded-2xl neu-flat bg-blue-600 text-white text-center border border-blue-400 shadow-md">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> STEP 5 &bull; Final Delivery
            </span>
            <span className="text-base font-black text-white font-mono">
              Dynamic ETA: 10:50 (Window 10:47–10:53)
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 rounded-xl neu-pressed bg-blue-50/50 border border-blue-200/40 text-center text-xs text-slate-600 font-medium">
        "The current frontend simulates the output of the proposed ML model. In the final system these features will be processed by a trained ETA prediction model."
      </div>
    </div>
  );
};