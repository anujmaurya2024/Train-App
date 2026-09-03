import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, X, Play, RotateCcw, CheckCircle2 } from 'lucide-react';

interface DemoModalProps {
  currentStep: number;
  totalSteps: number;
  stepData: {
    title: string;
    scenarioName: string;
    eta: string;
    delay: string;
    speed: string;
    congestion: string;
    description: string;
    highlight: string;
  };
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  onRestart: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  currentStep,
  totalSteps,
  stepData,
  onNext,
  onPrev,
  onClose,
  onRestart,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-3xl neu-flat-lg p-6 bg-[#e6ebf4] border-2 border-white shadow-2xl relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full neu-btn text-slate-500 hover:text-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-blue-600 text-white neu-pressed-sm">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-xs text-slate-500 font-bold">Guided SIH Walkthrough</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              {stepData.title}
            </h3>
          </div>
        </div>

        {/* Big Metrics Display for Current Step */}
        <div className="p-4 rounded-2xl neu-pressed bg-white border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Recalculated Dynamic ETA
            </span>
            <span className="text-2xl font-black font-mono text-blue-700 animate-eta-update">
              {stepData.eta}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-50 neu-flat-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Delay</span>
              <span className="font-extrabold text-amber-700 font-mono">{stepData.delay}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 neu-flat-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Speed</span>
              <span className="font-extrabold text-slate-800 font-mono">{stepData.speed}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 neu-flat-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Congestion</span>
              <span className="font-extrabold text-blue-700">{stepData.congestion}</span>
            </div>
          </div>
        </div>

        {/* Narrative Box */}
        <div className="p-3.5 rounded-xl neu-pressed-sm bg-blue-50/70 border border-blue-200/60 text-xs">
          <p className="font-bold text-slate-800 mb-1">
            {stepData.description}
          </p>
          <p className="text-[11px] text-blue-800 font-semibold italic">
            &bull; {stepData.highlight}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onRestart}
            className="neu-btn px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onPrev}
              disabled={currentStep === 1}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 ${
                currentStep === 1
                  ? 'opacity-40 cursor-not-allowed neu-pressed text-slate-400'
                  : 'neu-btn text-slate-700 hover:text-blue-600'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={onNext}
                className="neu-btn-primary px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="neu-btn-primary px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 bg-emerald-600"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Finish Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};