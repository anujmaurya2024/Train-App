package com.raileta.controller;

import com.raileta.model.StationStop;
import com.raileta.model.TrainData;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/train")
public class TrainController {

    private final List<TrainData> trains = new ArrayList<>();

    public TrainController() {
        TrainData t = new TrainData();
        t.id = "12001"; t.number = "12001"; t.name = "Rajdhani Express"; t.origin = "Delhi"; t.destination = "Bhopal";
        t.currentSection = "Mathura → Agra"; t.fromStation = "Mathura Junction"; t.toStation = "Agra Cantt";
        t.journeyProgress = 34; t.speedKmh = 68; t.currentDelayMin = 12; t.distanceToNextKm = 42.6; t.totalDistanceKm = 710; t.distanceRemainingKm = 427;
        t.remainingStationsCount = 5; t.congestion = "MEDIUM"; t.weather = "CLOUDY"; t.speedRestriction = "OFF"; t.recoveryPotential = "MEDIUM";
        t.scheduledEta = "10:40"; t.staticEta = "10:52"; t.dynamicEta = "10:57"; t.predictedFinalDelayMin = 6; t.confidenceScore = 86;
        t.arrivalWindowFrom = "10:54"; t.arrivalWindowTo = "11:01"; t.risk = "Medium"; t.status = "Running";

        t.routeStations = Arrays.asList(
                new StationStop("s1","Agra Cantt","AGC",42.6,"10:40","upcoming"),
                new StationStop("s2","Gwalior","GWL",160.4,"12:25","upcoming"),
                new StationStop("s3","Jhansi","JHS",260.1,"14:05","upcoming"),
                new StationStop("s4","Bina","BINA",355.0,"15:55","upcoming"),
                new StationStop("s5","Bhopal","BPL",427.0,"17:30","upcoming")
        );

        trains.add(t);
    }

    @GetMapping
    public List<TrainData> list() {
        return trains;
    }

    @GetMapping("/{id}")
    public TrainData get(@PathVariable String id) {
        return trains.stream().filter(x -> x.id.equals(id)).findFirst().orElse(trains.get(0));
    }

    @GetMapping(value = "/{id}/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<TrainData> events(@PathVariable String id) {
        TrainData base = get(id);
        return Flux.interval(Duration.ofSeconds(1))
                .map(i -> {
                    // create a shallow copy with small random jitter to simulate live movement
                    TrainData copy = new TrainData();
                    copy.id = base.id; copy.number = base.number; copy.name = base.name; copy.origin = base.origin; copy.destination = base.destination;
                    copy.currentSection = base.currentSection; copy.fromStation = base.fromStation; copy.toStation = base.toStation;
                    copy.journeyProgress = Math.min(100, base.journeyProgress + (int)(i % 2));
                    copy.speedKmh = base.speedKmh + (Math.random()*6 - 3);
                    copy.currentDelayMin = Math.max(0, base.currentDelayMin + (int)((Math.random()*3)-1));
                    copy.distanceToNextKm = Math.max(0, base.distanceToNextKm - i.doubleValue()*0.5);
                    copy.totalDistanceKm = base.totalDistanceKm; copy.distanceRemainingKm = Math.max(0, base.distanceRemainingKm - i.doubleValue()*0.5);
                    copy.remainingStationsCount = base.remainingStationsCount; copy.congestion = base.congestion; copy.weather = base.weather;
                    copy.scheduledEta = base.scheduledEta; copy.staticEta = base.staticEta; copy.dynamicEta = base.dynamicEta;
                    copy.predictedFinalDelayMin = base.predictedFinalDelayMin; copy.confidenceScore = base.confidenceScore; copy.arrivalWindowFrom = base.arrivalWindowFrom; copy.arrivalWindowTo = base.arrivalWindowTo; copy.risk = base.risk; copy.status = base.status;
                    copy.routeStations = base.routeStations;
                    return copy;
                });
    }
}
