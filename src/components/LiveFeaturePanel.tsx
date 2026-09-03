import React from 'react';
import { TrainData } from '../types/train';
import { 
  Cpu, 
  ArrowDown, 
  Gauge, 
  Activity, 
  CloudSun, 
  ShieldAlert, 
  Navigation, 
  TrendingUp, 
  History, 
  Layers
} from 'lucide-react';

interface LiveFeaturePanelProps {
  train: TrainData;
}

export const LiveFeaturePanel: React.FC<LiveFeaturePanelProps> = ({ train }) => {
  const features = [
    {
      name: 'Current Delay',
      value: `+${train.currentDelayMin} min`,
      icon: Activity,
      color: train.currentDelayMin > 10 ? 'text-rose-600' : 'text-amber-600',
      tag: 'Dynamic GPS',
    },
    {
      name: 'Current Speed',
      value: `${train.speedKmh} km/h`,
      icon: Gauge,
      color: train.speedKmh < 50 ? 'text-amber-600' : 'text-blue-600',
      tag: 'Section Limit 130',
    },
    {
      name: 'Track Congestion',
      value: train.congestion,
      icon: Layers,
      color: train.congestion === 'HIGH' ? 'text-rose-600' : 'text-emerald-600',
      tag: 'Block Density',
    },
    {
      name: 'Weather Status',
      value: train.weather.replace('_', ' '),
      icon: CloudSun,
      color: train.weather === 'CLEAR' ? 'text-blue-600' : 'text-amber-600',
      tag: 'Micro-climate',
    },
    {
      name: 'Speed Restriction',
      value: train.speedRestriction === 'ACTIVE' ? 'YES (Active TSR)' : 'NO (Clear)',
      icon: ShieldAlert,
      color: train.speedRestriction === 'ACTIVE' ? 'text-rose-600' : 'text-emerald-600',
      tag: 'Caution Order',
    },
    {
      name: 'Historical Avg Delay',
      value: `${train.historicalAvgDelayMin} min`,
      icon: History,
      color: 'text-slate-700',
      tag: '5-Year Profile',
    },
    {
      name: 'Distance Remaining',
      value: `${train.distanceRemainingKm} km`,
      icon: Navigation,
      color: 'text-indigo-600',
      tag: 'Agra-Bhopal',
    },
    {
      name: 'Recovery Potential',
      value: train.recoveryPotential,
      icon: TrendingUp,
      color: train.recoveryPotential === 'HIGH' ? 'text-emerald-600' : 'text-amber-600',
      tag: 'Buffer Capacity',
    },
  ];

  return (
    <div className="w-full rounded-2xl neu-flat p-5 border border-white/70">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-300/40">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-blue-600 text-white neu-flat-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                Live Prediction Feature Pipeline
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold neu-pressed-sm">
                Prototype ML Simulation
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Real-time feature vector processed into the dynamic forecasting inference model
            </p>
          </div>
        </div>
        <div className="text-[11px] text-slate-600 font-semibold px-2.5 py-1 rounded-lg neu-pressed">
          Features Ingested: <span className="text-blue-600 font-bold">8 Vectors</span>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div key={idx} className="p-3 rounded-xl neu-pressed bg-slate-50/70 border border-white/80">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider truncate">
                  {feat.name}
                </span>
                <Icon className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className={`text-base font-extrabold ${feat.color} font-mono truncate`}>
                {feat.value}
              </div>
              <div className="text-[9px] text-slate-400 font-medium truncate mt-0.5">
                {feat.tag}
              </div>
            </div>
          );
        })}
      </div>

      {/* Flowing Pipeline Indicator */}
      <div className="rounded-2xl neu-flat-sm p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-blue-200/60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl neu-pressed bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              ML
            </div>
            <div>
              <div className="text-xs font-black text-slate-800">
                Dynamic ETA Inference Engine (LSTM + Gradient Boost)
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                Evaluating temporal sequence + sectional clearance probability
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center text-blue-500 animate-pulse">
            <ArrowDown className="w-5 h-5 -rotate-90 stroke-[2.5]" />
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl neu-pressed bg-white text-center min-w-[130px]">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Predicted Final Delay</span>
              <span className="text-lg font-black text-blue-700 font-mono">
                +{train.predictedFinalDelayMin} min
              </span>
            </div>

            <div className="p-2.5 rounded-xl neu-flat bg-blue-600 text-white text-center min-w-[130px] border border-blue-400 shadow-md">
              <span className="text-[10px] uppercase font-bold text-blue-100 block">Dynamic ETA</span>
              <span className="text-lg font-black text-white font-mono animate-eta-update">
                {train.dynamicEta}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-500 text-center font-medium">
        "The current frontend simulates the output of the proposed ML model. In the final system these features will be processed by a trained ETA prediction model."
      </div>
    </div>
  );
};