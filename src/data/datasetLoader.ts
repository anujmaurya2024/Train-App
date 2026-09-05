import { TrainData } from '../types/train';

interface DatasetRow {
  journey_id: string;
  train_number: number;
  train_type: string;
  zone: string;
  zone_abbr: string;
  source_station_category: string;
  destination_station_category: string;
  distance_km: number;
  num_scheduled_stops: number;
  scheduled_travel_hours: number;
  departure_hour: number;
  fog_risk_score: number;
  zone_congestion_index: number;
  delay_minutes: number;
  is_delayed: number;
}

const DATASET_API_URL = (import.meta as ImportMeta & { env?: { VITE_DATASET_API_URL?: string } }).env?.VITE_DATASET_API_URL ?? 'http://127.0.0.1:8001/dataset-trains';

const formatTime = (hour: number, minutes = 0) => {
  const totalMinutes = (Math.round(hour * 60) + minutes) % (24 * 60);
  return `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`;
};

const mapRowToTrain = (row: DatasetRow, index: number): TrainData => {
  const delay = Math.max(0, Math.round(row.delay_minutes));
  const departure = Math.max(0, row.departure_hour);
  const scheduledEta = formatTime(departure + row.scheduled_travel_hours);
  const dynamicEta = formatTime(departure + row.scheduled_travel_hours, delay);
  const congestion = row.zone_congestion_index >= 0.7 ? 'HIGH' : row.zone_congestion_index >= 0.45 ? 'MEDIUM' : 'LOW';
  const weather = row.fog_risk_score >= 0.5 ? 'FOG' : 'CLEAR';
  const risk = delay >= 30 ? 'High' : delay >= 10 ? 'Medium' : 'Low';
  const station = `Dataset stop ${index + 1}`;

  return {
    id: row.journey_id,
    number: String(row.train_number),
    name: `Train ${row.train_number}`,
    type: row.train_type,
    origin: `${row.zone_abbr} source (${row.source_station_category})`,
    destination: `${row.zone_abbr} destination (${row.destination_station_category})`,
    currentSection: row.zone,
    fromStation: row.source_station_category,
    toStation: row.destination_station_category,
    journeyProgress: 35,
    speedKmh: Math.max(0, Math.round(row.distance_km / Math.max(row.scheduled_travel_hours, 1))),
    currentDelayMin: delay,
    distanceToNextKm: Math.round(row.distance_km / Math.max(row.num_scheduled_stops, 1)),
    totalDistanceKm: Math.round(row.distance_km),
    distanceRemainingKm: Math.round(row.distance_km),
    remainingStationsCount: row.num_scheduled_stops,
    congestion,
    weather,
    speedRestriction: 'OFF',
    recoveryPotential: delay > 20 ? 'LOW' : 'HIGH',
    scheduledEta,
    staticEta: scheduledEta,
    dynamicEta,
    predictedFinalDelayMin: delay,
    confidenceScore: row.is_delayed ? 84 : 92,
    arrivalWindow: { from: dynamicEta, to: formatTime(departure + row.scheduled_travel_hours, delay + 5) },
    risk,
    status: delay > 20 ? 'Congested' : 'Normal',
    historicalAvgDelayMin: delay,
    characteristics: `Loaded from the Indian Railways training dataset (${row.zone_abbr}).`,
    routeStations: [{ id: row.journey_id, name: station, code: row.zone_abbr, distanceKm: row.distance_km, scheduledArrival: scheduledEta, scheduledDeparture: scheduledEta, status: 'upcoming' }],
    delayProgression: [{ station, predictedDelay: delay, dynamicEta }],
  };
};

export const loadDatasetTrains = async (): Promise<TrainData[]> => {
  const response = await fetch(DATASET_API_URL);
  if (!response.ok) throw new Error(`Dataset request failed with ${response.status}`);
  const rows = await response.json() as DatasetRow[];
  return rows.map(mapRowToTrain);
};