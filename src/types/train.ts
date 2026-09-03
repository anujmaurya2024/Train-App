export interface StationStop {
  id: string;
  name: string;
  code: string;
  distanceKm: number;
  scheduledArrival: string;
  scheduledDeparture: string;
  status: 'passed' | 'current' | 'upcoming';
  predictedArrival?: string;
  predictedDelayMin?: number;
}

export interface TrainData {
  id: string;
  number: string;
  name: string;
  type: string;
  origin: string;
  destination: string;
  currentSection: string;
  fromStation: string;
  toStation: string;
  journeyProgress: number; // percentage
  speedKmh: number;
  currentDelayMin: number;
  distanceToNextKm: number;
  totalDistanceKm: number;
  distanceRemainingKm: number;
  remainingStationsCount: number;
  congestion: 'LOW' | 'MEDIUM' | 'HIGH';
  weather: 'CLEAR' | 'FOG' | 'HEAVY_RAIN' | 'THUNDERSTORM';
  speedRestriction: 'OFF' | 'ACTIVE';
  recoveryPotential: 'HIGH' | 'MEDIUM' | 'LOW';
  scheduledEta: string;
  staticEta: string;
  dynamicEta: string;
  predictedFinalDelayMin: number;
  confidenceScore: number; // e.g. 93%
  arrivalWindow: {
    from: string;
    to: string;
  };
  risk: 'Low' | 'Medium' | 'High' | 'Recovering';
  status: 'Normal' | 'Congested' | 'Restricted' | 'Recovering' | 'Signal Halt';
  historicalAvgDelayMin: number;
  characteristics: string;
  routeStations: StationStop[];
  delayProgression: {
    station: string;
    predictedDelay: number;
    dynamicEta: string;
  }[];
}

export type ScenarioType = 
  | 'NORMAL' 
  | 'HEAVY_CONGESTION' 
  | 'HEAVY_RAIN' 
  | 'SPEED_RESTRICTION' 
  | 'SIGNAL_HALT' 
  | 'UNSCHEDULED_STOP' 
  | 'TRACK_MAINTENANCE' 
  | 'RECOVERY_SECTION' 
  | 'CLEAR_INCIDENT';

export interface ScenarioLog {
  id: string;
  timestamp: string;
  event: string;
  detail: string;
  dynamicEta: string;
  delayChange: string;
  type: 'info' | 'warning' | 'alert' | 'success';
}

export interface FeatureImportance {
  name: string;
  weight: number;
  category: 'operational' | 'environmental' | 'historical' | 'infrastructure';
  description: string;
}