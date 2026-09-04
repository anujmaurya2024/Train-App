import React, { useEffect, useMemo, useState } from 'react';
import { TrainData, ScenarioLog, StationStop } from '../types/train';
import { ArrowRight, MapPin, CloudDrizzle, Wind, Sun, Clock } from 'lucide-react';
import StationModal from './StationModal';

interface Props {
  train: TrainData;
  logs: ScenarioLog[];
  onSetTrackingStation?: (s: StationStop) => void;
}

const formatLat = (n: number) => Math.abs(n).toFixed(4) + (n >= 0 ? '° N' : '° S');
const formatLon = (n: number) => Math.abs(n).toFixed(4) + (n >= 0 ? '° E' : '° W');

export const LiveTrainStatus: React.FC<Props> = ({ train, logs, onSetTrackingStation }) => {
  // Local simulated position & dynamic ETA
  const [lat, setLat] = useState<number>(27.4924);
  const [lon, setLon] = useState<number>(77.6737);
  const [distanceToNext, setDistanceToNext] = useState<number>(train.distanceToNextKm);
  const [currentSpeed, setCurrentSpeed] = useState<number>(train.speedKmh);
  const [dynamicEta, setDynamicEta] = useState<string>(train.dynamicEta);
  const [selectedStation, setSelectedStation] = useState<StationStop | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // simulation controls
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [updateInterval, setUpdateInterval] = useState<number>(3000);

  useEffect(() => {
    // simulation loop using configurable interval and speed multiplier
    const tick = () => {
      setDistanceToNext(d => Math.max(0, +(d - ((currentSpeed * speedMultiplier) / 3600 * (updateInterval / 1000))).toFixed(2)));
      setLat(l => +(l + 0.0002 * speedMultiplier).toFixed(6));
      setLon(l => +(l + 0.0001 * speedMultiplier).toFixed(6));
      setCurrentSpeed(s => Math.max(0, Math.round((s + (Math.random() * 4 - 2) * speedMultiplier) * 10) / 10));
      setDynamicEta(prev => {
        const m = parseInt(prev.split(':')[1] || '0', 10);
        const add = distanceToNext > 40 ? 2 : distanceToNext > 30 ? 1 : 0;
        const newMin = Math.min(59, m + (Math.random() < 0.3 ? add : 0));
        return prev.split(':')[0] + ':' + String(newMin).padStart(2, '0');
      });
    };
    const id = setInterval(tick, updateInterval);
    return () => clearInterval(id);
  }, [currentSpeed, distanceToNext, updateInterval, speedMultiplier]);

  useEffect(() => {
    // if parent train updates, reset key values
    setDistanceToNext(train.distanceToNextKm);
    setCurrentSpeed(train.speedKmh);
    setDynamicEta(train.dynamicEta);
  }, [train]);

  const nextStation = useMemo(() => train.routeStations.find(s => s.status === 'upcoming') || train.routeStations[0], [train]);

  return (
    <div className="space-y-5">
      {/* Simulation controls */}
      <div className="rounded-lg p-3 bg-white border border-slate-200 flex items-center gap-4">
        <div className="text-sm font-bold">Simulation Controls</div>
        <div className="flex items-center gap-3 text-sm">
          <label className="text-xs text-slate-500">Speed Multiplier</label>
          <input type="range" min="0.25" max="2" step="0.05" value={speedMultiplier} onChange={(e) => setSpeedMultiplier(Number(e.target.value))} />
          <div className="text-xs font-mono">{speedMultiplier}×</div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <label className="text-xs text-slate-500">Update Interval</label>
          <input type="range" min="250" max="5000" step="250" value={updateInterval} onChange={(e) => setUpdateInterval(Number(e.target.value))} />
          <div className="text-xs font-mono">{updateInterval} ms</div>
        </div>
      </div>
      {/* Header */}
      <div className="rounded-xl rail-surface p-5 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-black font-mono">{train.number} – {train.name}</h1>
            <span className="text-sm text-emerald-600 font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">LIVE / SIMULATED</span>
          </div>
          <div className="text-sm text-slate-600 mt-1">{train.origin} → {train.destination}</div>
          <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
            <div>Running Status: <span className="font-extrabold text-emerald-700">RUNNING</span></div>
            <div>Current Delay: <span className="font-extrabold text-amber-700">+{train.currentDelayMin} min</span></div>
            <div>Journey Progress: <span className="font-extrabold">{train.journeyProgress}%</span></div>
            <div>Last Updated: <span className="font-extrabold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Current Position</div>
          <div className="font-mono font-extrabold text-slate-800">{formatLat(lat)} , {formatLon(lon)}</div>
          <div className="text-sm text-slate-600 mt-2">Speed: <span className="font-extrabold">{currentSpeed} km/h</span></div>
        </div>
      </div>

      {/* Main grid: Map + Next Station */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl rail-surface p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-extrabold">Current Train Location</h3>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded bg-slate-100 text-slate-700">View Route</button>
              <button className="px-3 py-1 rounded bg-slate-100 text-slate-700">Center Train</button>
              <button className="px-3 py-1 rounded bg-slate-100 text-slate-700">Show Stations</button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-2/3 h-56 bg-gradient-to-b from-slate-50 to-white rounded-lg border border-slate-200 flex items-center justify-center relative">
              {/* schematic route */}
              <div className="absolute left-6 top-6 text-sm font-bold">Delhi</div>
              <div className="absolute left-6 top-20 text-sm">Mathura</div>
              <div className="absolute left-6 top-36 text-sm font-black text-blue-700">🚆 TRAIN</div>
              <div className="absolute left-6 top-44 text-sm">Agra</div>
              <div className="absolute left-6 top-56 text-sm">Gwalior</div>
              <div className="absolute bottom-6 right-6 text-xs bg-slate-50 px-2 py-1 rounded shadow">{train.number} • {currentSpeed} km/h • +{train.currentDelayMin} min</div>
            </div>

            <div className="w-1/3 space-y-3">
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <div className="text-xs text-slate-500">Current Section</div>
                <div className="font-extrabold">{train.currentSection}</div>
                <div className="text-sm text-slate-600 mt-1">Last Station: <span className="font-bold">{train.fromStation}</span></div>
                <div className="text-sm text-slate-600">Departed: <span className="font-bold">09:52 AM</span></div>
                <div className="text-sm text-slate-600 mt-1">Next Station: <span className="font-bold">{nextStation?.name || '—'}</span></div>
                <div className="text-sm text-slate-600">Distance to Next: <span className="font-extrabold">{distanceToNext.toFixed(1)} km</span></div>
                <div className="text-sm text-slate-600">Position: <span className="font-bold">Between {train.fromStation} and {nextStation?.name}</span></div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <div className="text-xs text-slate-500">Coordinates</div>
                <div className="font-mono font-bold">{formatLat(lat)} , {formatLon(lon)}</div>
                <div className="text-xs text-slate-500 mt-2">Avg Speed: <span className="font-bold">{train.speedKmh} km/h</span></div>
                <div className="text-xs text-slate-500">Max Allowed: <span className="font-bold">110 km/h</span></div>
                <div className="text-xs text-slate-500">Direction: <span className="font-bold">Southbound</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Station Card + Weather */}
        <div className="rounded-xl rail-surface p-4">
          <h4 className="text-sm font-extrabold mb-2">Next Station</h4>
          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
            <div className="text-xl font-black text-slate-900">{(nextStation && nextStation.name.toUpperCase()) || '—'}</div>
            <div className="text-xs text-slate-500">Station Code: <span className="font-bold">{nextStation?.code || '—'}</span></div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <div className="text-sm text-slate-600">Distance: <span className="font-extrabold">{distanceToNext.toFixed(1)} km</span></div>
                <div className="text-sm text-slate-600">Scheduled Arrival: <span className="font-bold">{nextStation?.scheduledArrival || train.scheduledEta}</span></div>
                <div className="text-sm text-amber-700">Static ETA: <span className="font-extrabold text-amber-700">{train.staticEta}</span></div>
                <div className="text-sm text-blue-700">Dynamic ETA: <span className="font-extrabold text-blue-700">{dynamicEta}</span></div>
              </div>
              <div className="text-xs text-slate-500 text-right">
                <div>Platform: <span className="font-bold">4</span></div>
                <div>Scheduled Halt: <span className="font-bold">5 min</span></div>
                <div>Expected Halt: <span className="font-bold">7 min</span></div>
              </div>
            </div>

            <div className="mt-2 p-2 rounded border border-slate-100 bg-slate-50 text-sm">
              <div className="font-bold text-slate-700">Expected Weather at Arrival</div>
              <div className="text-sm text-slate-600">Agra Cantt</div>
              <div className="flex items-center gap-3 mt-2">
                <div className="text-2xl font-black">31°C</div>
                <div className="text-sm">
                  <div className="flex items-center gap-2"><CloudDrizzle className="w-4 h-4 text-sky-500" /> Light Rain</div>
                  <div className="text-xs text-slate-500">Rain chance: 62% • Humidity: 74% • Wind: 14 km/h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movement Data + Ops */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl rail-surface p-4">
          <h4 className="text-lg font-extrabold mb-3">Live Movement Data</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="p-3 bg-white rounded border border-slate-200">
              <div className="text-xs text-slate-500">Current Speed</div>
              <div className="font-extrabold text-slate-900">{currentSpeed} km/h</div>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <div className="text-xs text-slate-500">Average Speed</div>
              <div className="font-extrabold text-slate-900">{train.speedKmh} km/h</div>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <div className="text-xs text-slate-500">Distance Travelled</div>
              <div className="font-extrabold text-slate-900">{train.totalDistanceKm - train.distanceRemainingKm} km</div>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <div className="text-xs text-slate-500">Distance Remaining</div>
              <div className="font-extrabold text-slate-900">{train.distanceRemainingKm} km</div>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="text-sm font-bold mb-2">Operational Conditions</h5>
            <div className="flex flex-wrap gap-2">
              {['Congestion: ' + train.congestion, 'Signal Status: CLEAR', 'Speed Restriction: ' + train.speedRestriction, 'Track Condition: NORMAL', 'Unscheduled Halt: NO', 'Route Traffic: MODERATE'].map((s, i) => (
                <div key={i} className="px-3 py-1 rounded-full bg-slate-50 border text-xs">{s}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl rail-surface p-4">
          <h4 className="text-lg font-extrabold mb-3">Current Weather</h4>
          <div className="bg-white p-3 rounded border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-black">30°C</div>
              <div className="text-sm">
                <div className="flex items-center gap-2"><Sun className="w-4 h-4 text-amber-400" /> Cloudy</div>
                <div className="text-xs text-slate-500">Rain: 20% • Humidity: 68% • Visibility: 8.5 km • Wind: 11 km/h</div>
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-3">Weather Impact: <span className="font-bold">Low</span></div>
          </div>
        </div>
      </div>

      {/* Upcoming Stations table */}
      <div className="rounded-xl rail-surface p-4">
        <h4 className="text-lg font-extrabold mb-3">Upcoming Stations & Dynamic ETA</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-xs text-slate-500 uppercase font-black">
                <th className="py-2 px-2">Station</th>
                <th className="py-2 px-2">Distance</th>
                <th className="py-2 px-2">Scheduled</th>
                <th className="py-2 px-2">Static ETA</th>
                <th className="py-2 px-2">Dynamic ETA</th>
                <th className="py-2 px-2">Delay</th>
                <th className="py-2 px-2">Weather</th>
                <th className="py-2 px-2">Platform</th>
                <th className="py-2 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="font-medium divide-y divide-slate-100">
              {train.routeStations.map((s: StationStop, idx) => (
                <tr key={s.id} className={s.status === 'current' ? 'bg-sky-50 cursor-pointer' : 'cursor-pointer'} onClick={() => { setSelectedStation(s); setModalOpen(true); }}>
                  <td className="py-2 px-2 font-bold">{s.name}</td>
                  <td className="py-2 px-2">{s.distanceKm} km</td>
                  <td className="py-2 px-2">{s.scheduledArrival}</td>
                  <td className="py-2 px-2">{s.predictedArrival || train.staticEta}</td>
                  <td className="py-2 px-2 text-blue-700 font-extrabold">{(train.delayProgression[idx] && train.delayProgression[idx].dynamicEta) || dynamicEta}</td>
                  <td className="py-2 px-2">{s.predictedDelayMin ? '+' + s.predictedDelayMin + ' min' : '+' + (train.predictedFinalDelayMin - idx * 2) + ' min'}</td>
                  <td className="py-2 px-2">{idx === 0 ? 'Light Rain' : idx === 1 ? 'Cloudy' : 'Clear'}</td>
                  <td className="py-2 px-2">{(idx % 5) + 1}</td>
                  <td className="py-2 px-2">{s.status === 'upcoming' ? (idx === 0 ? 'Next' : 'Upcoming') : s.status === 'passed' ? 'Passed' : 'Current'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Station detail modal */}
      <StationModal station={selectedStation} open={modalOpen} onClose={() => setModalOpen(false)} onSetTracking={(s) => { if (onSetTrackingStation) onSetTrackingStation(s); }} />

      {/* Timeline + Insights + Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl rail-surface p-4">
          <h4 className="text-lg font-extrabold mb-3">Route Timeline</h4>
          <div className="space-y-3">
            {train.routeStations.map((s, i) => (
              <div key={s.id} className="flex items-start gap-4">
                <div className="w-24 text-xs text-slate-500">{s.scheduledArrival}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.status === 'passed' ? '✓' : s.status === 'current' ? '🚆' : ''}</div>
                  </div>
                  <div className="text-xs text-slate-500">{s.status === 'passed' ? `+${s.predictedDelayMin || 0} min` : ''}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl rail-surface p-4">
          <h4 className="text-lg font-extrabold mb-3">ETA Insight</h4>
          <div className="text-sm text-slate-700">
            <div>Current Delay: <span className="font-extrabold">+{train.currentDelayMin} min</span></div>
            <div>Predicted Delay at {nextStation?.name}: <span className="font-extrabold">+{train.delayProgression[0]?.predictedDelay ?? train.predictedFinalDelayMin} min</span></div>
            <div className="mt-2 text-xs text-slate-500">Prototype Prediction Insight: Current congestion may increase the delay before {nextStation?.name}. Lower congestion later may allow partial recovery.</div>
          </div>

          <h5 className="text-sm font-bold mt-4">Why ETA Changed?</h5>
          <ul className="text-sm text-slate-600 mt-2 space-y-1">
            <li>Current speed below section average — MEDIUM impact</li>
            <li>Moderate congestion ahead — MEDIUM impact</li>
            <li>Light rain near {nextStation?.name} — LOW impact</li>
            <li>Historical recovery after Jhansi — POSITIVE impact</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl rail-surface p-4">
        <h4 className="text-lg font-extrabold mb-3">Live Event Feed</h4>
        <div className="space-y-2 text-sm text-slate-700">
          {logs.slice(0, 10).map(l => (
            <div key={l.id} className="flex items-start gap-3">
              <div className="w-16 text-xs text-slate-500">{l.timestamp}</div>
              <div>
                <div className="font-bold">{l.event}</div>
                <div className="text-xs text-slate-500">{l.detail} • ETA {l.dynamicEta} • {l.delayChange}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTrainStatus;
