import React from 'react';
import { ScenarioType } from '../types/train';
import { 
  CheckCircle2, 
  AlertTriangle, 
  CloudRain, 
  Gauge, 
  AlertOctagon, 
  Construction, 
  Zap, 
  RotateCcw,
  Sliders,
  Play
} from 'lucide-react';

interface ScenarioSimulatorProps {
  currentScenario: ScenarioType;
  onSelectScenario: (scenario: ScenarioType) => void;
  onReset: () => void;
  activeNotification?: string | null;
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({
  currentScenario,
  onSelectScenario,
  onReset,
  activeNotification,
}) => {
  const scenarioButtons: {
    id: ScenarioType;
    label: string;
    description: string;
    icon: React.ElementType;
    colorClass: string;
    borderClass: string;
  }[] = [
    {
      id: 'NORMAL',
      label: 'Normal Conditions',
      description: 'Clear weather, nominal 72 km/h speed, low congestion, default +8m delay',
      icon: CheckCircle2,
      colorClass: 'text-emerald-700',
      borderClass: 'border-emerald-300',
    },
    {
      id: 'HEAVY_CONGESTION',
      label: 'Heavy Congestion',
      description: 'Signal queue ahead, speed drops to 46 km/h, delay jumps to +12m -> ETA 10:58',
      icon: AlertTriangle,
      colorClass: 'text-amber-700',
      borderClass: 'border-amber-300',
    },
    {
      id: 'SPEED_RESTRICTION',
      label: 'Speed Restriction',
      description: 'Track caution order (35 km/h limit), delay expands to +17m -> ETA 11:05',
      icon: Gauge,
      colorClass: 'text-rose-700',
      borderClass: 'border-rose-300',
    },
    {
      id: 'HEAVY_RAIN',
      label: 'Heavy Rain & Fog',
      description: 'Low visibility & wet track friction, speed curtailed to 55 km/h -> ETA 10:55',
      icon: CloudRain,
      colorClass: 'text-cyan-700',
      borderClass: 'border-cyan-300',
    },
    {
      id: 'SIGNAL_HALT',
      label: 'Signal Halt (Red)',
      description: 'Dead stop at interlock home signal (0 km/h), immediate +6m penalty',
      icon: AlertOctagon,
      colorClass: 'text-red-700',
      borderClass: 'border-red-400',
    },
    {
      id: 'UNSCHEDULED_STOP',
      label: 'Unscheduled Stop',
      description: 'Emergency loop siding halt for higher-priority Vande Bharat passage',
      icon: AlertTriangle,
      colorClass: 'text-orange-700',
      borderClass: 'border-orange-300',
    },
    {
      id: 'TRACK_MAINTENANCE',
      label: 'Track Maintenance Block',
      description: 'Single-line operation due to sleeper renewal, +14m predicted expansion',
      icon: Construction,
      colorClass: 'text-purple-700',
      borderClass: 'border-purple-300',
    },
    {
      id: 'RECOVERY_SECTION',
      label: 'Recovery Section Active',
      description: 'Clear high-speed corridor (78 km/h), reclaiming lost minutes -> ETA 10:59',
      icon: Zap,
      colorClass: 'text-blue-700',
      borderClass: 'border-blue-400',
    },
    {
      id: 'CLEAR_INCIDENT',
      label: 'Clear Incident / Restored',
      description: 'All caution orders lifted, green signals restored across Agra section',
      icon: RotateCcw,
      colorClass: 'text-teal-700',
      borderClass: 'border-teal-300',
    },
  ];

  return (
    <div className="w-full rounded-xl bg-[#0D1B2A] p-5 border border-[#233B52]" style={{ boxShadow: 'none' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#233B52]">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-[#112438] text-[#3BA7FF] border border-[#233B52]">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-[#F4F7FB] flex items-center gap-2">
              Live Scenario Simulator
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#112438] text-[#3BA7FF] font-bold border border-[#233B52]">
                Interactive Test Bench
              </span>
            </h2>
            <p className="text-xs text-[#9BAFC3] font-medium">
              Simulate operational perturbations and observe dynamic ETA adjustments instantly
            </p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#DCEAFB] bg-[#112438] border border-[#233B52] hover:border-[#3BA7FF]/40 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to Baseline
        </button>
      </div>

      {activeNotification && (
        <div className="mb-4 p-3 rounded-lg bg-[#2F2415] border border-[#F5B942]/30 flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#F5B942] text-[#07111F] font-bold text-xs flex items-center justify-center">
            <Play className="w-3.5 h-3.5 fill-current" />
          </div>
          <div className="text-xs font-bold text-[#F5B942]">
            {activeNotification}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {scenarioButtons.map((btn) => {
          const Icon = btn.icon;
          const isActive = currentScenario === btn.id;

          return (
            <button
              key={btn.id}
              onClick={() => onSelectScenario(btn.id)}
              className={`p-3.5 rounded-xl text-left transition-all duration-200 relative overflow-hidden group border ${
                isActive
                  ? `bg-[#112438] ${btn.borderClass} border-2 scale-[0.99]`
                  : 'bg-[#0D1B2A] border-transparent hover:bg-[#112438] hover:border-[#233B52]'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-lg transition-all border ${
                    isActive ? 'bg-[#3BA7FF] text-[#07111F] border-[#3BA7FF]' : 'bg-[#112438] ' + btn.colorClass + ' border-[#233B52]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold truncate ${isActive ? 'text-[#3BA7FF]' : 'text-[#F4F7FB]'}`}>
                      {btn.label}
                    </span>
                    {isActive && (
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-[#3BA7FF] text-[#07111F]">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#9BAFC3] mt-1 line-clamp-2 leading-relaxed font-medium">
                    {btn.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-[#233B52] flex items-center justify-between text-[11px] text-[#9BAFC3] font-medium">
        <span>💡 Click any scenario button during SIH jury demonstration to trigger dynamic recalculated ETAs.</span>
        <span className="font-bold text-[#DCEAFB]">No backend call needed • Client-side Reactive State</span>
      </div>
    </div>
  );
};