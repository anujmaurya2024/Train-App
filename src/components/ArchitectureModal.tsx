import React from 'react';
import { GitBranch, Database, Cpu, Layers, Server, Monitor, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';

export const ArchitectureModal: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-800 neu-pressed-sm">
          System Architecture
        </span>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          RailETA Architectural Blueprint
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Comparison between Current SIH Hackathon Frontend Prototype and Production Target Architecture
        </p>
      </div>

      {/* Two Column Architectural Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Prototype Architecture */}
        <div className="rounded-2xl neu-flat p-5 border-2 border-emerald-500/40 bg-emerald-50/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-200/60">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-emerald-600 text-white font-bold neu-pressed-sm">
                <Monitor className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  Current Prototype Architecture
                </h3>
                <span className="text-[10px] font-bold text-emerald-700">
                  SIH Frontend Demonstration
                </span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-black">
              ACTIVE STACK
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl neu-pressed bg-white border border-slate-200/80">
              <div className="text-xs font-black text-slate-800">1. Synthetic Railway State & Timetable</div>
              <div className="text-[11px] text-slate-500">Local JSON datasets for 4 flagship express trains on Delhi-Bhopal corridor</div>
            </div>

            <div className="flex justify-center text-emerald-600">
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </div>

            <div className="p-3 rounded-xl neu-pressed bg-white border border-slate-200/80">
              <div className="text-xs font-black text-slate-800">2. Client-Side Scenario Simulator</div>
              <div className="text-[11px] text-slate-500">Reactive state triggers perturbation dynamics (weather, speed caps, congestion)</div>
            </div>

            <div className="flex justify-center text-emerald-600">
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </div>

            <div className="p-3 rounded-xl neu-pressed bg-white border border-slate-200/80">
              <div className="text-xs font-black text-slate-800">3. Simulated ML Feature Engine</div>
              <div className="text-[11px] text-slate-500">Heuristic ML output synthesis matching future GBDT inference output</div>
            </div>

            <div className="flex justify-center text-emerald-600">
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </div>

            <div className="p-3 rounded-xl neu-flat bg-emerald-600 text-white text-center">
              <div className="text-xs font-black uppercase">4. Neumorphic Dual View Dashboards</div>
              <div className="text-[10px] text-emerald-100">Passenger Tracking & Railway Operations Control Interface</div>
            </div>
          </div>
        </div>

        {/* Future Target Production Implementation */}
        <div className="rounded-2xl neu-flat p-5 border-2 border-blue-500/40 bg-blue-50/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-blue-200/60">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-blue-600 text-white font-bold neu-pressed-sm">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  Future Production Implementation
                </h3>
                <span className="text-[10px] font-bold text-blue-700">
                  Full Scaled Railway Stack
                </span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-200 text-blue-800 font-black">
              TARGET STACK
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl neu-pressed bg-white border border-slate-200/80">
              <div className="text-xs font-black text-slate-800">1. Real Railway Feeds & Ingestion</div>
              <div className="text-[11px] text-slate-500">FOIS, COA, RTIS (ISRO GPS NavIC feeds) & IMD Doppler weather APIs</div>
            </div>

            <div className="flex justify-center text-blue-600">
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </div>

            <div className="p-3 rounded-xl neu-pressed bg-white border border-slate-200/80">
              <div className="text-xs font-black text-slate-800">2. Scalable Ingestion & Streaming</div>
              <div className="text-[11px] text-slate-500">Apache Kafka event bus + Apache Flink for real-time temporal sliding window features</div>
            </div>

            <div className="flex justify-center text-blue-600">
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </div>

            <div className="p-3 rounded-xl neu-pressed bg-white border border-slate-200/80">
              <div className="text-xs font-black text-slate-800">3. ML Inference Cluster (Spring Boot + Triton)</div>
              <div className="text-[11px] text-slate-500">High-throughput GPU/CPU cluster serving trained LightGBM + ST-GNN models</div>
            </div>

            <div className="flex justify-center text-blue-600">
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </div>

            <div className="p-3 rounded-xl neu-flat bg-blue-600 text-white text-center">
              <div className="text-xs font-black uppercase">4. High-Availability Multi-Tenant APIs</div>
              <div className="text-[10px] text-blue-100">National Rail Operations Centre, NTES mobile app sync, Passenger SMS/WebSockets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Roadmap for Hackathon */}
      <div className="rounded-2xl neu-flat p-5 border border-white/80">
        <h4 className="text-sm font-black text-slate-800 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Phased Development Plan
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl neu-pressed bg-slate-50 border border-slate-200">
            <span className="font-black text-blue-700 block mb-1">Phase 1 (Current Prototype)</span>
            <p className="text-[11px] text-slate-600">
              Interactive UX validation, multi-scenario simulation bench, feature influence visualization.
            </p>
          </div>

          <div className="p-3 rounded-xl neu-pressed bg-slate-50 border border-slate-200">
            <span className="font-black text-indigo-700 block mb-1">Phase 2 (ML Model Training)</span>
            <p className="text-[11px] text-slate-600">
              Model training on 3 years of historical NTES sectional transit logs; GBDT & LSTM hyperparameter tuning.
            </p>
          </div>

          <div className="p-3 rounded-xl neu-pressed bg-slate-50 border border-slate-200">
            <span className="font-black text-emerald-700 block mb-1">Phase 3 (Pilot Integration)</span>
            <p className="text-[11px] text-slate-600">
              Pilot deployment with Northern & North Central Railway Division for live comparison against legacy static ETA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};