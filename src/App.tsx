import React, { useState } from 'react';
import { TrainData, ScenarioType, ScenarioLog } from './types/train';
import { INITIAL_TRAINS } from './data/trainData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RouteTimeline } from './components/RouteTimeline';
import { EtaComparisonCard } from './components/EtaComparisonCard';
import { LiveFeaturePanel } from './components/LiveFeaturePanel';
import { ScenarioSimulator } from './components/ScenarioSimulator';
import { EtaEventHistory } from './components/EtaEventHistory';
import { DelayEvolutionChart } from './components/DelayEvolutionChart';
import { FeatureImportancePanel } from './components/FeatureImportancePanel';
import { MlWorkflowSection } from './components/MlWorkflowSection';
import { PassengerView } from './components/PassengerView';
import { OperationsView } from './components/OperationsView';
import { DelayPropagationView } from './components/DelayPropagationView';
import { ArchitectureModal } from './components/ArchitectureModal';
import { PresentationMode } from './components/PresentationMode';
import { DemoModal } from './components/DemoModal';
import { Train, Activity, AlertTriangle, CheckCircle2, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [trains, setTrains] = useState<TrainData[]>(INITIAL_TRAINS);
  const [selectedTrainId, setSelectedTrainId] = useState<string>('12001');
  const [currentView, setCurrentView] = useState<string>('overview');
  const [currentScenario, setCurrentScenario] = useState<ScenarioType>('NORMAL');
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [previousDynamicEta, setPreviousDynamicEta] = useState<string | undefined>(undefined);
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [eventLogs, setEventLogs] = useState<ScenarioLog[]>([
    { id: 'log-1', timestamp: '10:02:15', event: 'Initial State Ingested', detail: 'Normal conditions baseline loaded for Section Mathura-Agra', dynamicEta: '10:50', delayChange: '+8 min', type: 'info' },
    { id: 'log-2', timestamp: '10:08:40', event: 'Block Congestion Detected', detail: 'Trailing freight queue slowing speed to 46 km/h', dynamicEta: '10:58', delayChange: '+12 min', type: 'warning' },
    { id: 'log-3', timestamp: '10:15:20', event: 'Speed Restriction Caution Order', detail: 'TSR (35 km/h) active on track maintenance segment', dynamicEta: '11:05', delayChange: '+17 min', type: 'alert' },
    { id: 'log-4', timestamp: '10:25:05', event: 'Restriction Cleared & Green Aspect', detail: 'Clear block headway restored', dynamicEta: '10:59', delayChange: '+10 min', type: 'info' },
    { id: 'log-5', timestamp: '10:28:30', event: 'Recovery Section Acceleration', detail: 'Speed raised to 78 km/h on double-line Jhansi corridor', dynamicEta: '10:59', delayChange: '+9 min', type: 'success' }
  ]);

  const selectedTrain = trains.find(t => t.id === selectedTrainId) || trains[0];

  const addLog = (event: string, detail: string, eta: string, delay: string, type: 'info' | 'warning' | 'alert' | 'success') => {
    const newLog: ScenarioLog = { id: 'log-' + Date.now(), timestamp: new Date().toLocaleTimeString(), event, detail, dynamicEta: eta, delayChange: delay, type };
    setEventLogs(prev => [newLog, ...prev]);
  };

  const handleSelectScenario = (scenario: ScenarioType) => {
    setCurrentScenario(scenario);
    setPreviousDynamicEta(selectedTrain.dynamicEta);
    let speed = 72; let delay = 8; let eta = '10:50'; let conf = 93;
    let cong: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    let weath: 'CLEAR' | 'FOG' | 'HEAVY_RAIN' = 'CLEAR';
    let speedRest: 'OFF' | 'ACTIVE' = 'OFF';
    let recPot: 'HIGH' | 'MEDIUM' | 'LOW' = 'HIGH';
    let risk: 'Low' | 'Medium' | 'High' | 'Recovering' = 'Low';
    let predFinal = 10; let winFrom = '10:47'; let winTo = '10:53'; let notifyMsg = '';

    switch (scenario) {
      case 'NORMAL':
        speed = 72; delay = 8; eta = '10:50'; conf = 93; cong = 'LOW'; speedRest = 'OFF'; recPot = 'HIGH'; risk = 'Low'; predFinal = 10; winFrom = '10:47'; winTo = '10:53';
        notifyMsg = 'Normal conditions active. Nominal speed 72 km/h.';
        addLog('Normal Conditions Restored', 'Nominal corridor operations on Mathura-Agra', eta, '+8 min', 'info'); break;
      case 'HEAVY_CONGESTION':
        speed = 46; delay = 12; eta = '10:58'; conf = 88; cong = 'HIGH'; speedRest = 'OFF'; recPot = 'MEDIUM'; risk = 'Medium'; predFinal = 18; winFrom = '10:54'; winTo = '11:02';
        notifyMsg = 'Heavy congestion detected -> Speed 46 km/h -> Prediction features updated -> Dynamic ETA recalculated: 10:58';
        addLog('Heavy Congestion Alert', 'Interlocking queue on Mathura approach', eta, '+12 min', 'warning'); break;
      case 'SPEED_RESTRICTION':
        speed = 35; delay = 17; eta = '11:05'; conf = 84; cong = 'HIGH'; speedRest = 'ACTIVE'; recPot = 'LOW'; risk = 'High'; predFinal = 25; winFrom = '11:01'; winTo = '11:09';
        notifyMsg = 'Temporary speed restriction (35 km/h TSR) active on Mathura-Agra section.';
        addLog('Speed Restriction Activated', 'Caution order 35 km/h for track inspection', eta, '+17 min', 'alert'); break;
      case 'HEAVY_RAIN':
        speed = 52; delay = 14; eta = '10:56'; conf = 86; cong = 'MEDIUM'; weath = 'HEAVY_RAIN'; speedRest = 'OFF'; recPot = 'MEDIUM'; risk = 'Medium'; predFinal = 16; winFrom = '10:52'; winTo = '11:00';
        notifyMsg = 'Severe precipitation & low track adhesion reported across Yamuna basin.';
        addLog('Heavy Rain & Low Visibility', 'Micro-climate friction braking parameters applied', eta, '+14 min', 'warning'); break;
      case 'SIGNAL_HALT':
        speed = 0; delay = 21; eta = '11:11'; conf = 81; cong = 'HIGH'; speedRest = 'ACTIVE'; recPot = 'LOW'; risk = 'High'; predFinal = 29; winFrom = '11:07'; winTo = '11:15';
        notifyMsg = 'Dead stop at home signal (Red aspect) due to block section occupancy.';
        addLog('Signal Halt at Interlocking', 'Train halted waiting for line clear token', eta, '+21 min', 'alert'); break;
      case 'UNSCHEDULED_STOP':
        speed = 0; delay = 15; eta = '11:02'; conf = 87; cong = 'MEDIUM'; speedRest = 'OFF'; recPot = 'MEDIUM'; risk = 'Medium'; predFinal = 20; winFrom = '10:58'; winTo = '11:06';
        notifyMsg = 'Unscheduled loop line siding stop for priority train crossing.';
        addLog('Unscheduled Precedence Halt', 'Siding hold for higher-priority express pass', eta, '+15 min', 'warning'); break;
      case 'TRACK_MAINTENANCE':
        speed = 30; delay = 19; eta = '11:08'; conf = 83; cong = 'HIGH'; speedRest = 'ACTIVE'; recPot = 'LOW'; risk = 'High'; predFinal = 26; winFrom = '11:04'; winTo = '11:12';
        notifyMsg = 'Engineering block maintenance: single-line piloting on UP corridor.';
        addLog('Track Engineering Block', 'Sleeper renewal block active between km 162-178', eta, '+19 min', 'alert'); break;
      case 'RECOVERY_SECTION':
        speed = 78; delay = 7; eta = '10:59'; conf = 92; cong = 'LOW'; speedRest = 'OFF'; recPot = 'HIGH'; risk = 'Recovering'; predFinal = 9; winFrom = '10:56'; winTo = '11:02';
        notifyMsg = 'Train entering a low-congestion recovery section. Speed raised to 78 km/h.';
        addLog('Recovery Section Entered', 'Favorable speed allowance reclaiming lost buffer', eta, '+7 min', 'success'); break;
      case 'CLEAR_INCIDENT':
        speed = 72; delay = 8; eta = '10:50'; conf = 93; cong = 'LOW'; speedRest = 'OFF'; recPot = 'HIGH'; risk = 'Low'; predFinal = 10; winFrom = '10:47'; winTo = '10:53';
        notifyMsg = 'All restrictions cleared. Signal aspects GREEN throughout Agra block.';
        addLog('All Restrictions Cleared', 'Green aspects across Mathura-Agra corridor', eta, '+8 min', 'success'); break;
    }

    setActiveNotification(notifyMsg);
    setTimeout(() => { setActiveNotification(null); }, 6000);

    setTrains(prevTrains => prevTrains.map(t => {
      if (t.id === selectedTrainId) {
        return {
          ...t, speedKmh: speed, currentDelayMin: delay, dynamicEta: eta, staticEta: '10:' + (40 + delay), confidenceScore: conf,
          congestion: cong, weather: weath, speedRestriction: speedRest, recoveryPotential: recPot, risk: risk, predictedFinalDelayMin: predFinal,
          arrivalWindow: { from: winFrom, to: winTo },
          delayProgression: [
            { station: 'Agra Cantt', predictedDelay: predFinal, dynamicEta: eta },
            { station: 'Gwalior', predictedDelay: Math.max(2, predFinal - 2), dynamicEta: '12:44' },
            { station: 'Jhansi', predictedDelay: Math.max(1, predFinal - 4), dynamicEta: '14:22' },
            { station: 'Bina', predictedDelay: Math.max(0, predFinal - 7), dynamicEta: '16:09' },
            { station: 'Bhopal', predictedDelay: Math.max(0, predFinal - 9), dynamicEta: '17:57' },
          ]
        };
      }
      return t;
    }));
  };

  const demoStepsData = [
    { step: 1, title: 'STEP 1: Baseline Normal Conditions', scenarioName: 'NORMAL', eta: '10:50', delay: '+8 min', speed: '72 km/h', congestion: 'LOW', description: 'The train is traversing the Mathura-Agra section under green signals with nominal speed.', highlight: 'Static ETA is 10:48. RailETA predicts 10:50 accounting for minor standard terminal deceleration.' },
    { step: 2, title: 'STEP 2: Introduce Heavy Congestion', scenarioName: 'HEAVY_CONGESTION', eta: '10:58', delay: '+12 min', speed: '46 km/h', congestion: 'HIGH', description: 'A freight bottleneck ahead triggers double-yellow signal aspects, cutting speed to 46 km/h.', highlight: 'RailETA detects block density spike and dynamically pushes predicted arrival out to 10:58 (+18m final delay).' },
    { step: 3, title: 'STEP 3: Introduce Speed Restriction (TSR)', scenarioName: 'SPEED_RESTRICTION', eta: '11:05', delay: '+17 min', speed: '35 km/h', congestion: 'HIGH', description: 'A temporary engineering caution order (35 km/h) is active over Yamuna bridge track works.', highlight: 'Dynamic ETA shifts to 11:05 with 84% confidence. Notice how the ETA animatedly reflects caution constraints.' },
    { step: 4, title: 'STEP 4: Clear Incident & Restore Track', scenarioName: 'CLEAR_INCIDENT', eta: '10:50', delay: '+8 min', speed: '72 km/h', congestion: 'LOW', description: 'Caution orders are lifted and track is handed back for full line speed operations.', highlight: 'Features automatically normalize in the inference pipeline back to baseline parameters.' },
    { step: 5, title: 'STEP 5: Recovery Section Acceleration', scenarioName: 'RECOVERY_SECTION', eta: '10:59', delay: '+7 min', speed: '78 km/h', congestion: 'LOW', description: 'Train enters high-speed corridor with priority right-of-way, speeding up to 78 km/h.', highlight: 'RailETA recognizes recovery capacity and actively compresses ETA from 11:05 down to 10:59!' }
  ];

  const handleStartDemo = () => { setIsDemoActive(true); setDemoStep(1); handleSelectScenario('NORMAL'); };
  const handleNextDemoStep = () => {
    if (demoStep < 5) {
      const next = demoStep + 1; setDemoStep(next);
      const stepConfig = demoStepsData[next - 1]; handleSelectScenario(stepConfig.scenarioName as ScenarioType);
    } else { setIsDemoActive(false); }
  };
  const handlePrevDemoStep = () => {
    if (demoStep > 1) {
      const prev = demoStep - 1; setDemoStep(prev);
      const stepConfig = demoStepsData[prev - 1]; handleSelectScenario(stepConfig.scenarioName as ScenarioType);
    }
  };

  const activeTrainsCount = trains.length;
  const avgDelay = Math.round(trains.reduce((acc, t) => acc + t.currentDelayMin, 0) / trains.length);
  const highRiskCount = trains.filter(t => t.risk === 'High').length;
  const avgConfidence = Math.round(trains.reduce((acc, t) => acc + t.confidenceScore, 0) / trains.length);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-3 sm:p-6 transition-colors font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header currentView={currentView} onViewChange={setCurrentView} onStartDemo={handleStartDemo} isDemoActive={isDemoActive} />
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <Sidebar currentView={currentView} onViewChange={setCurrentView} selectedTrainNumber={selectedTrain.number} />
          <main className="flex-1 w-full min-w-0 space-y-6">
            {currentView === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl rail-surface">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Active Trains</span>
                      <Train className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-3xl font-black text-slate-900 font-mono">{activeTrainsCount}</div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 100% Tracking Live
                    </div>
                  </div>
                  <div className="p-4 rounded-xl rail-surface">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Avg Delay</span>
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-3xl font-black text-amber-600 font-mono">{avgDelay} <span className="text-sm font-bold">min</span></div>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">Across 702 km corridor</div>
                  </div>
                  <div className="p-4 rounded-xl rail-surface">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">High Risk</span>
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="text-3xl font-black text-red-600 font-mono">{highRiskCount}</div>
                    <div className="text-[10px] text-red-600 font-bold mt-1">Needs Dispatch Attention</div>
                  </div>
                  <div className="p-4 rounded-xl rail-surface">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Predictions Updated</span>
                      <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-3xl font-black text-blue-600 font-mono">{eventLogs.length + 19}</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">Simulated ML passes</div>
                  </div>
                  <div className="p-4 rounded-xl rail-surface col-span-2 sm:col-span-1">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Avg Confidence</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-3xl font-black text-emerald-600 font-mono">{avgConfidence}%</div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-1">High Statistical Fit</div>
                  </div>
                </div>

                <div className="rounded-xl rail-surface p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                        Active Monitored Express Trains
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-blue-600 font-bold border border-sky-200">4 Flagship Corridors</span>
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">Compare linear Static ETA vs RailETA Dynamic Forecasts in real time</p>
                    </div>
                    <span className="text-xs font-bold text-slate-600">Selected: <span className="text-blue-600 font-black">{selectedTrain.name}</span></span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase font-black tracking-wider">
                          <th className="py-3 px-3">Train Details</th>
                          <th className="py-3 px-3">Current Section</th>
                          <th className="py-3 px-3">Delay</th>
                          <th className="py-3 px-3">Speed</th>
                          <th className="py-3 px-3">Scheduled ETA</th>
                          <th className="py-3 px-3">Static ETA</th>
                          <th className="py-3 px-3">Dynamic ETA</th>
                          <th className="py-3 px-3">Confidence</th>
                          <th className="py-3 px-3">Status</th>
                          <th className="py-3 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-medium">
                        {trains.map((t) => {
                          const isSelected = t.id === selectedTrainId;
                          return (
                            <tr key={t.id} className={'transition-colors cursor-pointer ' + (isSelected ? 'bg-sky-50 font-semibold' : 'hover:bg-slate-50')} onClick={() => setSelectedTrainId(t.id)}>
                              <td className="py-3.5 px-3">
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono font-black text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px]">{t.number}</span>
                                  <div>
                                    <div className="font-black text-slate-900 text-xs">{t.name}</div>
                                    <div className="text-[10px] text-slate-500">{t.type}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-3 font-mono font-bold text-slate-700">{t.currentSection}</td>
                              <td className="py-3.5 px-3 font-mono font-extrabold text-amber-600">+{t.currentDelayMin} min</td>
                              <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{t.speedKmh} km/h</td>
                              <td className="py-3.5 px-3 font-mono text-slate-500">{t.scheduledEta}</td>
                              <td className="py-3.5 px-3 font-mono text-amber-600 font-bold">{t.staticEta}</td>
                              <td className="py-3.5 px-3 font-mono font-black text-blue-600 text-sm">
                                <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-blue-600" />{t.dynamicEta}</span>
                              </td>
                              <td className="py-3.5 px-3 font-bold text-slate-700">{t.confidenceScore}%</td>
                              <td className="py-3.5 px-3">
                                <span className={'px-2 py-0.5 rounded-full text-[10px] font-black ' + (t.risk === 'High' ? 'bg-red-50 text-red-600 border border-red-200' : t.risk === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' : t.risk === 'Recovering' ? 'bg-sky-50 text-blue-600 border border-sky-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200')}>{t.status}</span>
                              </td>
                              <td className="py-3.5 px-3 text-right">
                                <button onClick={(e) => { e.stopPropagation(); setSelectedTrainId(t.id); setCurrentView('live-train'); }} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-[11px] font-extrabold inline-flex items-center gap-1">
                                  Open Live Prediction <ArrowUpRight className="w-3 h-3" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <EtaComparisonCard scheduledEta={selectedTrain.scheduledEta} staticEta={selectedTrain.staticEta} dynamicEta={selectedTrain.dynamicEta} confidenceScore={selectedTrain.confidenceScore} arrivalWindow={selectedTrain.arrivalWindow} currentDelayMin={selectedTrain.currentDelayMin} predictedFinalDelayMin={selectedTrain.predictedFinalDelayMin} previousDynamicEta={previousDynamicEta} />
                <RouteTimeline stations={selectedTrain.routeStations} currentSpeed={selectedTrain.speedKmh} currentSection={selectedTrain.currentSection} fromStation={selectedTrain.fromStation} toStation={selectedTrain.toStation} />
                <ScenarioSimulator currentScenario={currentScenario} onSelectScenario={handleSelectScenario} onReset={() => handleSelectScenario('NORMAL')} activeNotification={activeNotification} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <LiveFeaturePanel train={selectedTrain} />
                  <DelayEvolutionChart train={selectedTrain} />
                </div>
                <EtaEventHistory logs={eventLogs} onClearLogs={() => setEventLogs([])} />
              </div>
            )}

            {currentView === 'live-train' && (
              <div className="space-y-6">
                <div className="rounded-2xl neu-flat p-5 border border-white/80 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-300/40">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl font-black font-mono text-slate-900 bg-white px-3 py-0.5 rounded-xl neu-flat-sm">{selectedTrain.number}</span>
                        <h2 className="text-2xl font-black text-blue-800">{selectedTrain.name}</h2>
                      </div>
                      <p className="text-xs text-slate-600 font-semibold mt-1">Corridor Route: <span className="text-slate-800 font-extrabold">{selectedTrain.origin} &rarr; {selectedTrain.destination}</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Switch Train:</span>
                      {trains.map(t => (
                        <button key={t.id} onClick={() => setSelectedTrainId(t.id)} className={'px-3 py-1.5 rounded-xl text-xs font-bold transition-all ' + (selectedTrainId === t.id ? 'neu-pressed text-blue-700 bg-blue-100/60 font-black' : 'neu-btn text-slate-600 hover:text-blue-600')}>
                          {t.number}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center text-xs">
                    <div className="p-3 rounded-xl neu-pressed bg-slate-50 border border-white">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Section</span>
                      <span className="font-extrabold text-slate-800 truncate block mt-0.5">{selectedTrain.currentSection}</span>
                    </div>
                    <div className="p-3 rounded-xl neu-pressed bg-slate-50 border border-white">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Progress</span>
                      <span className="font-extrabold text-blue-700 block mt-0.5">{selectedTrain.journeyProgress}%</span>
                    </div>
                    <div className="p-3 rounded-xl neu-pressed bg-slate-50 border border-white">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Speed</span>
                      <span className="font-extrabold text-slate-800 font-mono block mt-0.5">{selectedTrain.speedKmh} km/h</span>
                    </div>
                    <div className="p-3 rounded-xl neu-pressed bg-amber-50 border border-amber-200">
                      <span className="text-[10px] uppercase font-bold text-amber-700 block">Delay</span>
                      <span className="font-extrabold text-amber-800 font-mono block mt-0.5">+{selectedTrain.currentDelayMin} min</span>
                    </div>
                    <div className="p-3 rounded-xl neu-pressed bg-slate-50 border border-white">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Halt</span>
                      <span className="font-extrabold text-slate-800 block mt-0.5">{selectedTrain.distanceToNextKm} km</span>
                    </div>
                    <div className="p-3 rounded-xl neu-pressed bg-slate-50 border border-white">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Congestion</span>
                      <span className="font-extrabold text-blue-700 block mt-0.5">{selectedTrain.congestion}</span>
                    </div>
                    <div className="p-3 rounded-xl neu-pressed bg-emerald-50 border border-emerald-200">
                      <span className="text-[10px] uppercase font-bold text-emerald-700 block">Recovery Pot.</span>
                      <span className="font-extrabold text-emerald-800 block mt-0.5">{selectedTrain.recoveryPotential}</span>
                    </div>
                  </div>
                </div>

                <EtaComparisonCard scheduledEta={selectedTrain.scheduledEta} staticEta={selectedTrain.staticEta} dynamicEta={selectedTrain.dynamicEta} confidenceScore={selectedTrain.confidenceScore} arrivalWindow={selectedTrain.arrivalWindow} currentDelayMin={selectedTrain.currentDelayMin} predictedFinalDelayMin={selectedTrain.predictedFinalDelayMin} previousDynamicEta={previousDynamicEta} />
                <RouteTimeline stations={selectedTrain.routeStations} currentSpeed={selectedTrain.speedKmh} currentSection={selectedTrain.currentSection} fromStation={selectedTrain.fromStation} toStation={selectedTrain.toStation} />
                <ScenarioSimulator currentScenario={currentScenario} onSelectScenario={handleSelectScenario} onReset={() => handleSelectScenario('NORMAL')} activeNotification={activeNotification} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <LiveFeaturePanel train={selectedTrain} />
                  <DelayEvolutionChart train={selectedTrain} />
                </div>
              </div>
            )}

            {currentView === 'eta-intelligence' && (
              <div className="space-y-6">
                <MlWorkflowSection />
                <FeatureImportancePanel />
                <DelayEvolutionChart train={selectedTrain} />
              </div>
            )}

            {currentView === 'simulator' && (
              <div className="space-y-6">
                <ScenarioSimulator currentScenario={currentScenario} onSelectScenario={handleSelectScenario} onReset={() => handleSelectScenario('NORMAL')} activeNotification={activeNotification} />
                <EtaComparisonCard scheduledEta={selectedTrain.scheduledEta} staticEta={selectedTrain.staticEta} dynamicEta={selectedTrain.dynamicEta} confidenceScore={selectedTrain.confidenceScore} arrivalWindow={selectedTrain.arrivalWindow} currentDelayMin={selectedTrain.currentDelayMin} predictedFinalDelayMin={selectedTrain.predictedFinalDelayMin} previousDynamicEta={previousDynamicEta} />
                <LiveFeaturePanel train={selectedTrain} />
                <EtaEventHistory logs={eventLogs} onClearLogs={() => setEventLogs([])} />
              </div>
            )}

            {currentView === 'operations' && (
              <OperationsView trains={trains} onSelectTrain={(t) => { setSelectedTrainId(t.id); }} onOpenLivePrediction={(t) => { setSelectedTrainId(t.id); setCurrentView('live-train'); }} />
            )}

            {currentView === 'passenger' && (
              <PassengerView trains={trains} selectedTrain={selectedTrain} onSelectTrain={(t) => { setSelectedTrainId(t.id); }} />
            )}

            {currentView === 'propagation' && (
              <DelayPropagationView />
            )}

            {currentView === 'architecture' && (
              <ArchitectureModal />
            )}

            {currentView === 'presentation' && (
              <PresentationMode train={selectedTrain} currentScenario={currentScenario} onSelectScenario={handleSelectScenario} onStartDemo={handleStartDemo} isDemoActive={isDemoActive} />
            )}
          </main>
        </div>

        <footer className="pt-6 pb-4 border-t border-slate-300/40 text-center space-y-1">
          <p className="text-xs text-slate-500 font-medium">RailETA - Intelligent Dynamic Train ETA Forecasting System &bull; Smart India Hackathon Prototype</p>
          <p className="text-[11px] text-slate-400">Prototype Notice: Live train and ETA values are simulated for concept demonstration. Final implementation will use trained ML models and authorized railway operational data.</p>
        </footer>
      </div>

      {isDemoActive && (
        <DemoModal currentStep={demoStep} totalSteps={5} stepData={demoStepsData[demoStep - 1]} onNext={handleNextDemoStep} onPrev={handlePrevDemoStep} onClose={() => setIsDemoActive(false)} onRestart={() => { setDemoStep(1); handleSelectScenario('NORMAL'); }} />
      )}
    </div>
  );
};
export default App;