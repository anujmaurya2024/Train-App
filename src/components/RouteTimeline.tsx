import React from 'react';
import { StationStop } from '../types/train';
import { CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';

interface RouteTimelineProps {
  stations: StationStop[];
  currentSpeed: number;
  currentSection: string;
  fromStation: string;
  toStation: string;
  compact?: boolean;
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({
  stations,
  currentSpeed,
  currentSection,
  compact = false,
}) => {
  // Find current active segment index
  const nextStationIndex = stations.findIndex(s => s.status === 'upcoming');

  return (
    <div className={`w-full ${compact ? 'p-3' : 'p-5'} rounded-2xl neu-flat border border-white/60`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            Active Route Corridor & Station Checkpoints
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            Delhi - Bhopal High-Density Trunk Route (702 km)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold neu-pressed text-blue-700 bg-blue-50/50 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
            Section: {currentSection}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold neu-pressed text-emerald-700 bg-emerald-50/50">
            {currentSpeed} km/h
          </span>
        </div>
      </div>

      {/* Horizontal / Flowing Timeline */}
      <div className="relative overflow-x-auto pb-4 pt-2">
        <div className="flex items-center justify-between min-w-[720px] px-4 relative">
          {/* Continuous Railway Track Line */}
          <div className="absolute top-7 left-8 right-8 h-2 bg-slate-300 rounded-full neu-pressed-sm z-0">
            {/* Progress line */}
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-blue-600 to-amber-500 rounded-full transition-all duration-700"
              style={{
                width: `${Math.max(10, Math.min(100, (nextStationIndex / (stations.length - 1)) * 100))}%`,
              }}
            ></div>
          </div>

          {stations.map((stn, idx) => {
            const isPassed = stn.status === 'passed';
            const isNext = idx === nextStationIndex;
            const isUpcoming = stn.status === 'upcoming' && !isNext;

            return (
              <div key={stn.id} className="relative z-10 flex flex-col items-center group">
                {/* Station Node Badge */}
                <div
                  className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                    isPassed
                      ? 'neu-pressed text-emerald-600 bg-emerald-50/80 border border-emerald-300/40'
                      : isNext
                      ? 'neu-flat text-blue-600 bg-white ring-4 ring-blue-400/40 scale-110 shadow-lg'
                      : 'neu-flat text-slate-400 bg-slate-100/80'
                  }`}
                >
                  {isPassed ? (
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  ) : isNext ? (
                    <div className="relative flex items-center justify-center">
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-600 animate-pulse"></span>
                    </div>
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  <span className="text-[9px] font-extrabold uppercase mt-0.5">
                    {stn.code}
                  </span>
                </div>

                {/* Station Name & Status Text */}
                <div className="text-center mt-2">
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className={`text-xs font-bold block ${
                        isNext ? 'text-blue-700 font-extrabold scale-105' : 'text-slate-700'
                      }`}
                    >
                      {stn.name}
                    </span>
                    {isNext && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-500 text-white shadow-sm">
                        NEXT
                      </span>
                    )}
                  </div>

                  <div className="mt-1 space-y-0.5 text-[10px]">
                    <div className="text-slate-500">
                      Sch: <span className="font-semibold text-slate-700">{stn.scheduledArrival}</span>
                    </div>
                    {stn.predictedArrival && (
                      <div className="font-bold text-blue-600">
                        Dyn: <span>{stn.predictedArrival}</span>
                        {stn.predictedDelayMin !== undefined && stn.predictedDelayMin > 0 && (
                          <span className="text-amber-600 ml-1">
                            (+{stn.predictedDelayMin}m)
                          </span>
                        )}
                      </div>
                    )}
                    {isPassed && (
                      <span className="text-[9px] text-emerald-600 font-bold">
                        Departed ✓
                      </span>
                    )}
                  </div>
                </div>

                {/* Train Icon between Passed and Next */}
                {isPassed && idx === nextStationIndex - 1 && (
                  <div className="absolute -right-10 top-4 z-20 flex flex-col items-center animate-bounce">
                    <div className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-black rounded-full shadow-md flex items-center gap-1">
                      <span>TRAIN ON BLOCK</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-300/40 text-[11px] text-slate-500">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Passed Station
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-blue-300"></span> Next Scheduled Stop
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Upcoming Stations
          </span>
        </div>
        <span className="font-semibold text-slate-600">
          Sectional Max Permissible Speed: 130 km/h
        </span>
      </div>
    </div>
  );
};