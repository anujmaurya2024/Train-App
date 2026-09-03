import React, { useState } from 'react';
import { TrainData } from '../types/train';
import { Search, Train, Clock, Sparkles, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

interface PassengerViewProps {
  trains: TrainData[];
  selectedTrain: TrainData;
  onSelectTrain: (train: TrainData) => void;
}

export const PassengerView: React.FC<PassengerViewProps> = ({
  trains,
  selectedTrain,
  onSelectTrain,
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedTrain.number);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = trains.find(
      t => t.number.includes(searchTerm) || t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (found) {
      onSelectTrain(found);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-1">
        <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-800 neu-pressed-sm">
          Public Passenger Portal
        </span>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          Passenger Live Dynamic ETA Tracking
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Accurate arrival forecasts powered by RailETA dynamic recovery intelligence
        </p>
      </div>

      {/* Train Search Input Box */}
      <form onSubmit={handleSearch} className="rounded-2xl neu-flat p-4 border border-white/70">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Train Number (e.g. 12001, 12002, 12621, 12951) or Name..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl neu-pressed bg-slate-50/80 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <button
            type="submit"
            className="neu-btn-primary px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2"
          >
            <Train className="w-4 h-4" />
            Search Train ETA
          </button>
        </div>

        {/* Quick select pills */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-300/40 text-xs">
          <span className="text-slate-500 font-medium">Quick Select:</span>
          {trains.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setSearchTerm(t.number);
                onSelectTrain(t);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedTrain.id === t.id
                  ? 'neu-pressed text-blue-700 bg-blue-100/60'
                  : 'neu-btn text-slate-600 hover:text-blue-600'
              }`}
            >
              {t.number} - {t.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </form>

      {/* Live Train Card for Passenger */}
      <div className="rounded-2xl neu-flat p-6 border border-white/80 space-y-6">
        {/* Train Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-300/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900 font-mono">
                {selectedTrain.number}
              </span>
              <h3 className="text-xl font-black text-blue-700">
                {selectedTrain.name}
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Route: <span className="text-slate-700 font-bold">{selectedTrain.origin} &rarr; {selectedTrain.destination}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1.5 rounded-xl text-xs font-extrabold neu-pressed bg-amber-50 text-amber-800 border border-amber-300/50">
              Current Delay: +{selectedTrain.currentDelayMin} min
            </span>
          </div>
        </div>

        {/* Current Location & Dynamic ETA Hero Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status Details */}
          <div className="p-4 rounded-2xl neu-pressed bg-slate-50/70 border border-white space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-bold">Current Location:</span>
              <span className="font-extrabold text-slate-800 font-mono">
                {selectedTrain.currentSection}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-bold">Next Station:</span>
              <span className="font-extrabold text-blue-700 font-mono">
                {selectedTrain.toStation} ({selectedTrain.distanceToNextKm} km away)
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-bold">Current Speed:</span>
              <span className="font-extrabold text-slate-800 font-mono">
                {selectedTrain.speedKmh} km/h
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-bold">Operating Status:</span>
              <span className="font-bold text-amber-700">
                {selectedTrain.congestion === 'HIGH' ? 'Heavy congestion ahead' : 'Smooth sectional flow'}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-bold">Scheduled Arrival at Next:</span>
              <span className="font-bold text-slate-700 font-mono">{selectedTrain.scheduledEta}</span>
            </div>
          </div>

          {/* Dynamic ETA Prediction Hero */}
          <div className="p-5 rounded-2xl neu-flat bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> RailETA Dynamic Arrival
              </span>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-blue-500 text-white">
                {selectedTrain.confidenceScore}% Confidence
              </span>
            </div>

            <div className="my-3 text-center sm:text-left">
              <div className="text-4xl font-black font-mono tracking-tight animate-eta-update">
                {selectedTrain.dynamicEta}
              </div>
              <div className="text-xs text-blue-100 font-semibold mt-1">
                Expected Range: {selectedTrain.arrivalWindow.from} – {selectedTrain.arrivalWindow.to}
              </div>
            </div>

            <div className="text-[11px] text-blue-100/90 font-medium pt-2 border-t border-blue-400/40">
              Notice: Dynamic ETA factors in current speed ({selectedTrain.speedKmh} km/h) & ahead signal congestion.
            </div>
          </div>
        </div>

        {/* Upcoming Station Table for Passengers */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Upcoming Station Arrival Timings
          </h4>

          <div className="overflow-x-auto rounded-xl neu-pressed bg-slate-50/50 p-1 border border-white">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-500 text-[10px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Station Name</th>
                  <th className="py-2.5 px-3">Scheduled Arrival</th>
                  <th className="py-2.5 px-3">RailETA Dynamic ETA</th>
                  <th className="py-2.5 px-3">Delay Trend</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 font-medium">
                {selectedTrain.routeStations
                  .filter(s => s.status === 'upcoming')
                  .map((stn, idx) => (
                    <tr key={stn.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-800 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        {stn.name} ({stn.code})
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600 font-semibold">
                        {stn.scheduledArrival}
                      </td>
                      <td className="py-3 px-3 font-mono font-extrabold text-blue-700">
                        {stn.predictedArrival || selectedTrain.dynamicEta}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-amber-700 font-mono">
                          +{stn.predictedDelayMin || selectedTrain.predictedFinalDelayMin} min
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {idx === 0 ? (
                          <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-extrabold text-[10px]">
                            NEXT STOP
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded neu-flat-sm text-slate-600 font-semibold text-[10px]">
                            Confirmed Stop
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};