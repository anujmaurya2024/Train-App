package com.raileta.model;

import java.util.List;

public class TrainData {
    public String id;
    public String number;
    public String name;
    public String origin;
    public String destination;
    public String currentSection;
    public String fromStation;
    public String toStation;
    public int journeyProgress;
    public double speedKmh;
    public int currentDelayMin;
    public double distanceToNextKm;
    public double totalDistanceKm;
    public double distanceRemainingKm;
    public int remainingStationsCount;
    public String congestion;
    public String weather;
    public String speedRestriction;
    public String recoveryPotential;
    public String scheduledEta;
    public String staticEta;
    public String dynamicEta;
    public int predictedFinalDelayMin;
    public int confidenceScore;
    public String arrivalWindowFrom;
    public String arrivalWindowTo;
    public String risk;
    public String status;
    public List<StationStop> routeStations;

    public TrainData() {}
}
