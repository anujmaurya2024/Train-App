import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, CloudSun, Loader2, Route, Sparkles } from 'lucide-react';
import { TrainData } from '../types/train';

interface TrainPredictionPanelProps {
  train: TrainData;
}

interface PredictionResult {
  predicted_final_delay_min: number;
  mode: 'demo_only';
  message: string;
}

const WEATHER_OPTIONS = ['CLEAR', 'LIGHT_RAIN', 'HEAVY_RAIN', 'FOG', 'THUNDERSTORM'];
const CONGESTION_OPTIONS = ['LOW', 'MEDIUM', 'HIGH'];

const toDateInputValue = () => new Date().toISOString().slice(0, 10);

const addMinutes = (time: string, minutes: number) => {
  const [hours, rawMinutes] = time.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(rawMinutes)) return time;

  const totalMinutes = ((hours * 60 + rawMinutes + Math.round(minutes)) % 1440 + 1440) % 1440;
  return `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`;
};

export const TrainPredictionPanel: React.FC<TrainPredictionPanelProps> = ({ train }) => {
  const [travelDate, setTravelDate] = useState(toDateInputValue);
  const [currentDelay, setCurrentDelay] = useState(train.currentDelayMin);
  const [distanceRemaining, setDistanceRemaining] = useState(train.distanceRemainingKm);
  const [speed, setSpeed] = useState(train.speedKmh);
  const [weather, setWeather] = useState(train.weather);
  const [congestion, setCongestion] = useState(train.congestion);
  const [restrictionActive, setRestrictionActive] = useState(train.speedRestriction === 'ACTIVE');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentDelay(train.currentDelayMin);
    setDistanceRemaining(train.distanceRemainingKm);
    setSpeed(train.speedKmh);
    setWeather(train.weather);
    setCongestion(train.congestion);
    setRestrictionActive(train.speedRestriction === 'ACTIVE');
    setResult(null);
    setError(null);
  }, [train]);

  const expectedEta = useMemo(
    () => (result ? addMinutes(train.scheduledEta, result.predicted_final_delay_min) : null),
    [result, train.scheduledEta]
  );

  const requestPrediction = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const predictorUrl = (import.meta as ImportMeta & { env?: { VITE_TRAIN_PREDICTOR_URL?: string } }).env?.VITE_TRAIN_PREDICTOR_URL ?? 'http://127.0.0.1:8001/predict-train-demo';
      const response = await fetch(predictorUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            train_number: train.number,
            travel_date: travelDate,
            current_delay_min: Number(currentDelay),
            distance_remaining_km: Number(distanceRemaining),
            speed_kmh: Number(speed),
            weather,
            congestion,
            speed_restriction_active: restrictionActive,
          }),
        }
      );

      if (!response.ok) throw new Error('The local prediction service could not process this request.');
      setResult(await response.json() as PredictionResult);
    } catch {
      setResult(null);
      setError('Start the local FastAPI service on port 8000, then try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rail-surface rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Test ETA estimate</h2>
            <p className="mt-0.5 text-xs text-slate-500">Adjust the current conditions for train {train.number}, then calculate its expected arrival.</p>
          </div>
        </div>
        <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
          Demo estimate
        </span>
      </div>

      <form onSubmit={requestPrediction} className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-xs font-bold text-slate-600">
          <span className="mb-1.5 flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-blue-600" /> Travel date</span>
          <input
            type="date"
            value={travelDate}
            onChange={(event) => setTravelDate(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
          />
        </label>
        <label className="text-xs font-bold text-slate-600">
          <span className="mb-1.5 block">Current delay (min)</span>
          <input
            type="number"
            min="0"
            value={currentDelay}
            onChange={(event) => setCurrentDelay(Number(event.target.value))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
          />
        </label>
        <label className="text-xs font-bold text-slate-600">
          <span className="mb-1.5 flex items-center gap-1.5"><Route className="h-3.5 w-3.5 text-blue-600" /> Distance left (km)</span>
          <input
            type="number"
            min="0"
            value={distanceRemaining}
            onChange={(event) => setDistanceRemaining(Number(event.target.value))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
          />
        </label>
        <label className="text-xs font-bold text-slate-600">
          <span className="mb-1.5 block">Current speed (km/h)</span>
          <input
            type="number"
            min="0"
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
          />
        </label>
        <label className="text-xs font-bold text-slate-600">
          <span className="mb-1.5 flex items-center gap-1.5"><CloudSun className="h-3.5 w-3.5 text-blue-600" /> Weather</span>
          <select value={weather} onChange={(event) => setWeather(event.target.value as TrainData['weather'])} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800">
            {WEATHER_OPTIONS.map((option) => <option key={option} value={option}>{option.replace('_', ' ')}</option>)}
          </select>
        </label>
        <label className="text-xs font-bold text-slate-600">
          <span className="mb-1.5 block">Track congestion</span>
          <select value={congestion} onChange={(event) => setCongestion(event.target.value as TrainData['congestion'])} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800">
            {CONGESTION_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 self-end rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">
          <input type="checkbox" checked={restrictionActive} onChange={(event) => setRestrictionActive(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600" />
          Speed restriction
        </label>
        <button type="submit" disabled={isLoading} className="inline-flex items-center justify-center gap-2 self-end rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-500 disabled:cursor-wait disabled:opacity-70">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {isLoading ? 'Calculating' : 'Calculate ETA'}
        </button>
      </form>

      {error && <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700" role="alert">{error}</p>}

      {result && expectedEta && (
        <div className="toast-enter mt-4 grid gap-3 rounded-xl border border-blue-200 bg-sky-50 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Expected arrival</p>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-3xl font-black text-blue-700">{expectedEta}</span>
              <span className="text-sm font-semibold text-slate-700">estimated final delay: +{result.predicted_final_delay_min} min</span>
            </div>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-slate-600">{result.message}</p>
        </div>
      )}
    </section>
  );
};
