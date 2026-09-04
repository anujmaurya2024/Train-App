import React from 'react';
import { StationStop } from '../types/train';

interface Props {
  station: StationStop | null;
  open: boolean;
  onClose: () => void;
  onSetTracking?: (s: StationStop) => void;
}

export const StationModal: React.FC<Props> = ({ station, open, onClose, onSetTracking }) => {
  if (!open || !station) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-5 z-10">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">{station.name} • {station.code}</h3>
            <div className="text-sm text-slate-500">Coordinates: 27.1767° N, 78.0081° E</div>
          </div>
          <button onClick={onClose} className="text-sm text-slate-500">Close</button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>Distance from Train:</div>
          <div className="font-bold">{station.distanceKm} km</div>
          <div>Scheduled Arrival:</div>
          <div className="font-bold">{station.scheduledArrival}</div>
          <div>Dynamic ETA:</div>
          <div className="font-bold">{station.predictedArrival || '—'}</div>
          <div>Expected Delay:</div>
          <div className="font-bold">{station.predictedDelayMin ? `+${station.predictedDelayMin} min` : '—'}</div>
          <div>Platform:</div>
          <div className="font-bold">4 (Prototype)</div>
          <div>Scheduled Halt:</div>
          <div className="font-bold">5 min</div>
          <div>Congestion:</div>
          <div className="font-bold">Medium</div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-slate-100">Close</button>
          <button onClick={() => { if (onSetTracking) onSetTracking(station); onClose(); }} className="px-3 py-1 rounded bg-blue-600 text-white">Set as Tracking Station</button>
        </div>
      </div>
    </div>
  );
};

export default StationModal;
