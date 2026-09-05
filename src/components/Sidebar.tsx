import React from 'react';
import { 
  LayoutDashboard, 
  TrainTrack, 
  Sliders, 
  Layers, 
  Users, 
  Network, 
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
    { id: 'simulator', label: 'Scenario Simulator', icon: Sliders, badge: '9 Presets' },
    { id: 'operations', label: 'Operations Control', icon: Layers, badge: 'Live Dispatch' },
    { id: 'passenger', label: 'Passenger View', icon: Users, badge: 'Public ETA' },
    { id: 'propagation', label: 'Network Delay Flow', icon: Network, badge: 'Cascading' },
  ];

  return (
    <aside className="w-full shrink-0 lg:w-60">
      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:sticky lg:top-28 lg:p-3">
        <div className="mb-2 hidden px-2 py-1.5 lg:block">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Navigation
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-800">
            Control center
          </p>
        </div>

        <nav className="sidebar-nav flex gap-1.5 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex min-w-max items-center justify-between gap-3 rounded-xl border px-3 py-2 text-xs font-bold transition-all lg:w-full lg:min-w-0 lg:rounded-lg lg:px-3 lg:py-2.5 ${
                  isActive
                    ? 'border-blue-200 bg-sky-50 text-blue-600 shadow-sm'
                    : 'border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 stroke-[2.5]' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`hidden rounded-md px-2 py-0.5 text-[10px] font-semibold lg:inline-flex ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-4 hidden border-t border-slate-200 pt-4 lg:block">
          <div className="rounded-lg p-3 bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                System Status
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                <CheckCircle2 className="w-3 h-3" /> ONLINE
              </span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-600 font-medium">
              <div className="flex justify-between gap-2">
                <span>Model Type:</span>
                <span className="font-semibold text-slate-800">Dynamic GBDT+LSTM</span>
              </div>
              <div className="flex justify-between gap-2">
                <span>Feature Pipeline:</span>
                <span className="font-semibold text-blue-600">8 Real-time Signals</span>
              </div>
              <div className="flex justify-between gap-2">
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
