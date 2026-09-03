import React from 'react';
import { TrainData, ScenarioType } from '../types/train';
import { Sparkles, Gauge, Activity, TrendingUp, Layers, Sliders, Presentation, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PresentationModeProps {
  train: TrainData;
  currentScenario: ScenarioType;
  onSelectScenario: (scenario: ScenarioType) => void;
  onStartDemo: () => void;
  isDemoActive: boolean;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  train,
  currentScenario,
  onSelectScenario,
  onStartDemo,
  isDemoActive,
}) => {
  return (
    <div className="w-full space-y-6">
      {/* PPT Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl neu-flat bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-xl border border-blue-800/40">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-blue-600 text-white neu-pressed">
            <Presentation className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                RailETA &bull; Executive Presentation Dashboard
              </h2>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-500 text-white">
                SIH Jury View
              </span>
            </div>
            <p className="text-xs text-blue-200 font-medium mt-0.5">
              High-impact single-screen overview designed for pitch deck slides and live jury demonstration
            </p>
          </div>
        </div>

        <button
          onClick={onStartDemo}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            isDemoActive
              ? 'neu-pressed bg-amber-400 text-slate-900'
              : 'bg-white text-blue-900 hover:bg-blue-50 shadow-md font-bold'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          {isDemoActive ? 'Guided Demo Playing...' : 'Play 5-Step Demo Script'}
        </button>
      </div>

      {/* Main Single-Screen Showcase Card */}
      <div className="rounded-3xl neu-flat-lg p-6 border-2 border-white/90 bg-[#e6ebf4] space-y-6">
        {/* Top Train Summary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-300/60">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-black font-mono text-slate-900 px-3 py-0.5 rounded-xl neu-pressed bg-slate-100">
                {train.number}
              </span>
              <h3 className="text-2xl font-black text-blue-800">
                {train.name}
              </h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold neu-flat-sm text-blue-700 bg-blue-50">
                Section: {train.currentSection}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Corridor: Delhi &rarr; Mathura &rarr; <span className="text-blue-700 font-extrabold">Agra (NEXT)</span> &rarr; Gwalior &rarr; Jhansi &rarr; Bina &rarr; Bhopal
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl neu-pressed bg-slate-50 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Speed</span>
              <span className="text-base font-black text-slate-800 font-mono">{train.speedKmh} km/h</span>
            </div>
            <div className="p-2.5 rounded-xl neu-pressed bg-amber-50 text-center min-w-[100px] border border-amber-200">
              <span className="text-[10px] uppercase font-bold text-amber-700 block">Current Delay</span>
              <span className="text-base font-black text-amber-800 font-mono">+{train.currentDelayMin} min</span>
            </div>
            <div className="p-2.5 rounded-xl neu-pressed bg-blue-50 text-center min-w-[100px] border border-blue-200">
              <span className="text-[10px] uppercase font-bold text-blue-700 block">Congestion</span>
              <span className="text-base font-black text-blue-900">{train.congestion}</span>
            </div>
          </div>
        </div>

        {/* Triple ETA Benchmark Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Scheduled */}
          <div className="p-4 rounded-2xl neu-pressed bg-slate-100/70 border border-white text-center">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">1. Scheduled ETA</span>
            <div className="text-3xl font-black text-slate-700 font-mono my-1">{train.scheduledEta}</div>
            <span className="text-[10px] text-slate-500 font-medium">Timetable baseline arrival</span>
          </div>

          {/* Static ETA */}
          <div className="p-4 rounded-2xl neu-flat-sm bg-amber-50/50 border border-amber-300/60 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] uppercase font-extrabold text-amber-800">
              <span>2. Static ETA</span>
              <span className="text-[9px] bg-amber-200 px-1 rounded">(Legacy)</span>
            </div>
            <div className="text-3xl font-black text-amber-700 font-mono my-1">{train.staticEta}</div>
            <span className="text-[10px] text-amber-900 font-medium">Scheduled + Current Delay (+{train.currentDelayMin}m)</span>
          </div>

          {/* Dynamic ETA */}
          <div className="p-4 rounded-2xl neu-flat bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center shadow-lg border-2 border-blue-400">
            <div className="flex items-center justify-center gap-1.5 text-[11px] uppercase font-black text-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>3. RailETA Dynamic Forecast</span>
            </div>
            <div className="text-4xl font-black font-mono my-1 animate-eta-update text-white">
              {train.dynamicEta}
            </div>
            <span className="text-[10px] text-blue-100 font-bold">
              Confidence: {train.confidenceScore}% &bull; Window: {train.arrivalWindow.from}–{train.arrivalWindow.to}
            </span>
          </div>
        </div>

        {/* Middle Logic Diagram */}
        <div className="p-4 rounded-2xl neu-pressed bg-slate-50 border border-white">
          <div className="text-xs font-black uppercase text-slate-700 text-center mb-3 tracking-wider">
            Predictive Inference Core &bull; Feature Synthesis Architecture
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="p-3 rounded-xl neu-flat bg-white font-bold text-slate-800 text-center flex-1">
              <span className="text-blue-600 block text-[10px] font-black uppercase">Historical Factors</span>
              Average Delays & Acceleration Buffers
            </div>

            <div className="text-blue-600 font-black text-base">+</div>

            <div className="p-3 rounded-xl neu-flat bg-white font-bold text-slate-800 text-center flex-1">
              <span className="text-amber-600 block text-[10px] font-black uppercase">Live Operating Signals</span>
              {train.speedKmh} km/h Speed &bull; {train.congestion} Congestion
            </div>

            <div className="text-blue-600 font-black text-base">+</div>

            <div className="p-3 rounded-xl neu-flat bg-white font-bold text-slate-800 text-center flex-1">
              <span className="text-indigo-600 block text-[10px] font-black uppercase">Route Conditions</span>
              Weather: {train.weather} &bull; Caution: {train.speedRestriction}
            </div>

            <div className="text-blue-600 font-black text-base">&rarr;</div>

            <div className="p-3 rounded-xl neu-flat bg-blue-600 text-white font-black text-center flex-1 shadow-md">
              <span className="text-blue-200 block text-[10px] font-black uppercase">Machine Learning Inference</span>
              Dynamic ETA: {train.dynamicEta}
            </div>
          </div>
        </div>

        {/* Integrated Quick Scenario Buttons for Direct PPT Triggering */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-600" />
              Live Interactive Scenario Injectors (Click during presentation)
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              Active: <span className="text-blue-700 font-bold">{currentScenario}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
            {[
              { id: 'NORMAL', label: '1. Normal (10:50)' },
              { id: 'HEAVY_CONGESTION', label: '2. Congestion (10:58)' },
              { id: 'SPEED_RESTRICTION', label: '3. Caution TSR (11:05)' },
              { id: 'RECOVERY_SECTION', label: '4. Recovery (10:59)' },
              { id: 'CLEAR_INCIDENT', label: '5. Restored (10:50)' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => onSelectScenario(btn.id as ScenarioType)}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all text-center truncate ${
                  currentScenario === btn.id
                    ? 'neu-pressed bg-blue-50 text-blue-700 border border-blue-300 font-black'
                    : 'neu-btn text-slate-700 hover:text-blue-600'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};