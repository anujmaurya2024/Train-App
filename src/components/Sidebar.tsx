import React from 'react';
import { 
  LayoutDashboard, 
  TrainTrack, 
  Cpu, 
  Sliders, 
  Layers, 
  Users, 
  Network, 
  GitBranch, 
  Presentation,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  selectedTrainNumber: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  selectedTrainNumber,
}) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: '4 Trains' },
    { id: 'live-train', label: 'Live Train Monitor', icon: TrainTrack, badge: `#${selectedTrainNumber}` },
    { id: 'eta-intelligence', label: 'ETA Intelligence', icon: Cpu, badge: 'ML Logic' },
    { id: 'simulator', label: 'Scenario Simulator', icon: Sliders, badge: '9 Presets' },
    { id: 'operations', label: 'Operations Control', icon: Layers, badge: 'Live Dispatch' },
    { id: 'passenger', label: 'Passenger View', icon: Users, badge: 'Public ETA' },
    { id: 'propagation', label: 'Network Delay Flow', icon: Network, badge: 'Cascading' },
    { id: 'architecture', label: 'System Architecture', icon: GitBranch, badge: 'Design' },
    { id: 'presentation', label: 'Presentation Mode', icon: Presentation, badge: 'PPT Ready' },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="neu-flat rounded-2xl p-4 sticky top-24 border border-white/60">
        <div className="px-3 py-2 mb-3">
          <p className="text-[11px] uppercase font-bold tracking-wider text-slate-600">
            Navigation Menu
          </p>
          <p className="text-xs font-semibold text-slate-800">
            RailETA Control Suite
          </p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'neu-pressed text-blue-700 bg-blue-50/70 border border-blue-200/50 shadow-inner'
                    : 'neu-btn text-slate-600 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 stroke-[2.5]' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'neu-pressed-sm text-slate-500 bg-slate-100/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick System Status Card in Sidebar */}
        <div className="mt-6 pt-4 border-t border-slate-300/40">
          <div className="neu-pressed rounded-xl p-3 bg-slate-50/50 border border-white/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-700 tracking-wider">
                System Status
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                <CheckCircle2 className="w-3 h-3" /> ONLINE
              </span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Model Type:</span>
                <span className="font-semibold text-slate-800">Dynamic GBDT+LSTM</span>
              </div>
              <div className="flex justify-between">
                <span>Feature Pipeline:</span>
                <span className="font-semibold text-blue-600">8 Real-time Signals</span>
              </div>
              <div className="flex justify-between">
                <span>Prediction Interval:</span>
                <span className="font-semibold text-slate-800">Adaptive (Dynamic)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};