package com.raileta.model;

public class StationStop {
    public String id;
    public String name;
    public String code;
    public double distanceKm;
    public String scheduledArrival;
    public String scheduledDeparture;
    public String status; // passed | current | upcoming
    public String predictedArrival;
    public Integer predictedDelayMin;

    public StationStop() {}
    public StationStop(String id, String name, String code, double distanceKm, String scheduledArrival, String status) {
        this.id = id; this.name = name; this.code = code; this.distanceKm = distanceKm; this.scheduledArrival = scheduledArrival; this.status = status;
    }
}
