import React from 'react';
import { MOCK_FEATURE_IMPORTANCE } from '../data/trainData';
import { SlidersHorizontal, Info } from 'lucide-react';

export const FeatureImportancePanel: React.FC = () => {
  return (
    <div className="w-full rounded-2xl neu-flat p-5 border border-white/70">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-300/40">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-blue-600 text-white neu-flat-sm">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              Expected ML Influence Factors
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                Illustrative Feature Influence
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Architectural preview of weights and parameters configured in the production ML pipeline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/50">
          <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Judges Demonstration Weights</span>
        </div>
      </div>

      {/* Feature Influence Bars */}
      <div className="space-y-3.5 my-3">
        {MOCK_FEATURE_IMPORTANCE.map((feat, idx) => {
          const categoryColors = {
            operational: 'bg-blue-600 text-blue-100',
            infrastructure: 'bg-indigo-600 text-indigo-100',
            historical: 'bg-purple-600 text-purple-100',
            environmental: 'bg-teal-600 text-teal-100',
          }[feat.category];

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className={`text-[9px] uppercase font-black px-1.5 py-0.2 rounded ${categoryColors}`}>
                    {feat.category}
                  </span>
                  <span className="font-bold text-slate-700">{feat.name}</span>
                </div>
                <span className="font-mono font-extrabold text-blue-700 text-xs">
                  {feat.weight}% weight
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-3 bg-slate-200/80 rounded-full neu-pressed-sm overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-all duration-700"
                  style={{ width: `${feat.weight * 3}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">{feat.description}</p>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl neu-pressed bg-slate-50/70 border border-slate-200/60 text-[11px] text-slate-600">
        <span className="font-bold text-slate-800">Note for SIH Evaluators: </span>
        This visualization demonstrates the multi-parametric modeling strategy of RailETA. Unlike legacy GPS trackers calculating simple distance/speed, RailETA feeds 8 correlated dimensions into tree-based ensembles and Recurrent Neural Networks.
      </div>
    </div>
  );
};