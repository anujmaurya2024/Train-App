package com.raileta.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TrainDataTest {

    @Test
    void defaultConstructorShouldCreateEmptyTrainData() {
        TrainData train = new TrainData();

        assertNull(train.id);
        assertNull(train.number);
        assertNull(train.name);
        assertNull(train.origin);
        assertNull(train.destination);
        assertNull(train.currentSection);
        assertNull(train.fromStation);
        assertNull(train.toStation);
        assertEquals(0, train.journeyProgress);
        assertEquals(0.0, train.speedKmh);
        assertEquals(0, train.currentDelayMin);
        assertEquals(0.0, train.distanceToNextKm);
        assertEquals(0.0, train.totalDistanceKm);
        assertEquals(0.0, train.distanceRemainingKm);
        assertEquals(0, train.remainingStationsCount);
        assertNull(train.congestion);
        assertNull(train.weather);
        assertNull(train.speedRestriction);
        assertNull(train.recoveryPotential);
        assertNull(train.scheduledEta);
        assertNull(train.staticEta);
        assertNull(train.dynamicEta);
        assertEquals(0, train.predictedFinalDelayMin);
        assertEquals(0, train.confidenceScore);
        assertNull(train.arrivalWindowFrom);
        assertNull(train.arrivalWindowTo);
        assertNull(train.risk);
        assertNull(train.status);
        assertNull(train.routeStations);
    }

    @Test
    void fieldsShouldStoreValuesAfterAssignment() {
        TrainData train = new TrainData();
        StationStop stationStop = new StationStop("s1", "Agra Cantt", "AGC", 42.6, "10:40", "upcoming");

        train.id = "12001";
        train.number = "12001";
        train.name = "Rajdhani Express";
        train.origin = "Delhi";
        train.destination = "Bhopal";
        train.journeyProgress = 34;
        train.speedKmh = 68.0;
        train.currentDelayMin = 12;
        train.distanceToNextKm = 42.6;
        train.totalDistanceKm = 710.0;
        train.distanceRemainingKm = 427.0;
        train.remainingStationsCount = 5;
        train.congestion = "MEDIUM";
        train.weather = "CLOUDY";
        train.routeStations = java.util.List.of(stationStop);

        assertAll(
                () -> assertEquals("12001", train.id),
                () -> assertEquals("Rajdhani Express", train.name),
                () -> assertEquals(34, train.journeyProgress),
                () -> assertEquals(68.0, train.speedKmh),
                () -> assertEquals("MEDIUM", train.congestion),
                () -> assertEquals("CLOUDY", train.weather),
                () -> assertEquals(1, train.routeStations.size()),
                () -> assertEquals("Agra Cantt", train.routeStations.get(0).name)
        );
    }
}
