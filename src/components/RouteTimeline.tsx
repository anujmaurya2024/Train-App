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
    <div className={`w-full ${compact ? 'p-3' : 'p-5'} rounded-xl border border-[#233B52] bg-[#0D1B2A]`} style={{ boxShadow: 'none' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-extrabold text-[#F4F7FB] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#3BA7FF]" />
            Active Route Corridor & Station Checkpoints
          </h3>
          <p className="text-[11px] text-[#9BAFC3] font-medium">
            Delhi - Bhopal High-Density Trunk Route (702 km)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#3BA7FF] bg-[#112438] border border-[#233B52] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3BA7FF] animate-ping"></span>
            Section: {currentSection}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#20C997] bg-[#112B25] border border-[#20C997]/20">
            {currentSpeed} km/h
          </span>
        </div>
      </div>

      <div className="relative overflow-x-auto pb-4 pt-2">
        <div className="flex items-center justify-between min-w-[720px] px-4 relative">
          <div className="absolute top-7 left-8 right-8 h-2 bg-[#162B40] rounded-full border border-[#233B52] z-0">
            <div
              className="h-full bg-gradient-to-r from-[#20C997] via-[#3BA7FF] to-[#F5B942] rounded-full transition-all duration-700"
              style={{
                width: `${Math.max(10, Math.min(100, (nextStationIndex / (stations.length - 1)) * 100))}%`,
              }}
            ></div>
          </div>

          {stations.map((stn, idx) => {
            const isPassed = stn.status === 'passed';
            const isNext = idx === nextStationIndex;

            return (
              <div key={stn.id} className="relative z-10 flex flex-col items-center group">
                <div
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-300 border ${
                    isPassed
                      ? 'text-[#20C997] bg-[#102B25] border-[#20C997]/30'
                      : isNext
                      ? 'text-[#3BA7FF] bg-[#10233B] border-[#3BA7FF]/50 scale-110'
                      : 'text-[#64798E] bg-[#112438] border-[#233B52]'
                  }`}
                >
                  {isPassed ? (
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  ) : isNext ? (
                    <div className="relative flex items-center justify-center">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#3BA7FF] animate-pulse"></span>
                    </div>
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  <span className="text-[9px] font-extrabold uppercase mt-0.5">
                    {stn.code}
                  </span>
                </div>

                <div className="text-center mt-2">
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className={`text-xs font-bold block ${
                        isNext ? 'text-[#3BA7FF] font-extrabold scale-105' : 'text-[#DCEAFB]'
                      }`}
                    >
                      {stn.name}
                    </span>
                    {isNext && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-[#F5B942] text-[#07111F]">
                        NEXT
                      </span>
                    )}
                  </div>

                  <div className="mt-1 space-y-0.5 text-[10px]">
                    <div className="text-[#9BAFC3]">
                      Sch: <span className="font-semibold text-[#DCEAFB]">{stn.scheduledArrival}</span>
                    </div>
                    {stn.predictedArrival && (
                      <div className="font-bold text-[#3BA7FF]">
                        Dyn: <span>{stn.predictedArrival}</span>
                        {stn.predictedDelayMin !== undefined && stn.predictedDelayMin > 0 && (
                          <span className="text-[#F5B942] ml-1">
                            (+{stn.predictedDelayMin}m)
                          </span>
                        )}
                      </div>
                    )}
                    {isPassed && (
                      <span className="text-[9px] text-[#20C997] font-bold">
                        Departed ✓
                      </span>
                    )}
                  </div>
                </div>

                {isPassed && idx === nextStationIndex - 1 && (
                  <div className="absolute -right-10 top-4 z-20 flex flex-col items-center animate-pulse">
                    <div className="px-2 py-0.5 bg-[#3BA7FF] text-[#07111F] text-[9px] font-black rounded-full flex items-center gap-1">
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

      <div className="flex items-center justify-between pt-3 border-t border-[#233B52] text-[11px] text-[#9BAFC3]">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#20C997]"></span> Passed Station
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3BA7FF]"></span> Next Scheduled Stop
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#64798E]"></span> Upcoming Stations
          </span>
        </div>
        <span className="font-semibold text-[#DCEAFB]">
          Sectional Max Permissible Speed: 130 km/h
        </span>
      </div>
    </div>
  );
};