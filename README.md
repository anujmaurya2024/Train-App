# RailETA – Intelligent Dynamic Train ETA Forecasting System

> **Smart India Hackathon (SIH) Prototype**  
> Problem Statement: *Dynamic Forecast of Expected Time of Arrival (ETA) for Coaching Trains*  
> * Predicting how delays evolve not just reporting current delay.*

---

## ?? Overview

**RailETA** is a railway operations intelligence dashboard and passenger dynamic ETA forecasting system. Unlike conventional legacy systems that calculate static ETAs using Scheduled Arrival + Current Delay, RailETA dynamically simulates how delay compresses or propagates based on real-time operational parameters.

---

## ? Features

- **Dynamic vs Static ETA Benchmark**: Live hero comparisons demonstrating how delay evolves across corridor sections.
- **Flagship Trains Monitored**:
  - 12001 Rajdhani Express (Corridor priority, high recovery buffer)
  - 12002 Shatabdi Express (Fast intercity turnarounds)
  - 12621 Southern Express (High passenger load, frequent stops)
  - 12951 Mumbai Rajdhani (High-speed long distance, automatic signaling)
- **7-Station Route Corridor**: New Delhi $\rightarrow$ Mathura $\rightarrow$ Agra $\rightarrow$ Gwalior $\rightarrow$ Jhansi $\rightarrow$ Bina $\rightarrow$ Bhopal.
- **Interactive Scenario Simulator (9 Presets)**:
  - Normal Conditions
  - Heavy Congestion
  - Speed Restriction (TSR 35 km/h)
  - Heavy Rain & Low Adhesion
  - Signal Halt (Red Aspect)
  - Unscheduled Loop Siding Stop
  - Track Maintenance Block
  - Recovery Section Acceleration
  - Clear Incident & Green Signal Restoration
- **Feature Pipeline & ML Inference Preview**: Explaining feature vectors (delay, speed, congestion, TSR, weather, historical profile).
- **Multiple Role Views**:
  - **Overview Dashboard**: High-level operational telemetry & KPI tracking.
  - **Live Train Detail**: In-depth telemetry and station timeline.
  - **Operations View**: Master sectional dispatch control board.
  - **Passenger View**: Searchable public ETA tracking.
  - **Network Delay Flow**: Multi-train cascading delay visualization.
  - **Architecture View**: Prototype vs Target Production Stack comparison.
  - **Presentation Mode & Guided Demo**: Single-screen PPT-ready view with 5-step guided walkthrough.

---

## ??? Tech Stack & Design

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS + Custom Soft Neumorphic Design (#e6ebf4)
- **Icons**: Lucide React
- **Architecture**: Responsive Desktop-First, 100% Client-Side Reactive Simulation

---

## ?? Running Locally

`ash
# Clone the repository
git clone https://github.com/anujmaurya2024/Train-App.git

# Navigate to project directory
cd Train-App

# Install dependencies
npm install

# Start development server
npm run dev
`

---

## ?? Prototype Notice
*Prototype Notice: Live train and ETA values are dynamically simulated for concept demonstration and hackathon evaluation. Final implementation will connect trained ML models (LightGBM/LSTM) and authorized railway operational feeds (FOIS, RTIS/NavIC).*
