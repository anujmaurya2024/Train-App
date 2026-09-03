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
      <div className="rounded-xl p-4 sticky top-24 border border-[#233B52] bg-[#0D1B2A]" style={{ boxShadow: 'none' }}>
        <div className="px-3 py-2 mb-3">
          <p className="text-[11px] uppercase font-bold tracking-wider text-[#9BAFC3]">
            Navigation Menu
          </p>
          <p className="text-xs font-semibold text-[#F4F7FB]">
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all border ${
                  isActive
                    ? 'text-[#3BA7FF] bg-[#112438] border-[#2F80ED]/60'
                    : 'text-[#9BAFC3] bg-transparent border-transparent hover:bg-[#112438] hover:text-[#F4F7FB]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#3BA7FF] stroke-[2.5]' : 'text-[#64798E]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      isActive
                        ? 'bg-[#3BA7FF] text-[#07111F]'
                        : 'text-[#9BAFC3] bg-[#112438] border border-[#233B52]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 pt-4 border-t border-[#233B52]">
          <div className="rounded-lg p-3 bg-[#112438] border border-[#233B52]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-[#9BAFC3] tracking-wider">
                System Status
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#20C997] font-bold">
                <CheckCircle2 className="w-3 h-3" /> ONLINE
              </span>
            </div>
            <div className="space-y-1.5 text-[11px] text-[#9BAFC3] font-medium">
              <div className="flex justify-between gap-2">
                <span>Model Type:</span>
                <span className="font-semibold text-[#F4F7FB]">Dynamic GBDT+LSTM</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>Feature Pipeline:</span>
                <span className="font-semibold text-[#3BA7FF]">8 Real-time Signals</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>Prediction Interval:</span>
                <span className="font-semibold text-[#F4F7FB]">Adaptive (Dynamic)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};