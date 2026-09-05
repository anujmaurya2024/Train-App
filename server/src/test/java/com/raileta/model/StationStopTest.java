package com.raileta.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class StationStopTest {

    @Test
    void defaultConstructorShouldInitializeFieldsToDefaults() {
        StationStop stop = new StationStop();

        assertNull(stop.id);
        assertNull(stop.name);
        assertNull(stop.code);
        assertEquals(0.0, stop.distanceKm);
        assertNull(stop.scheduledArrival);
        assertNull(stop.scheduledDeparture);
        assertNull(stop.status);
        assertNull(stop.predictedArrival);
        assertNull(stop.predictedDelayMin);
    }

    @Test
    void constructorShouldPopulateCoreStationValues() {
        StationStop stop = new StationStop("s1", "Agra Cantt", "AGC", 42.6, "10:40", "upcoming");

        assertEquals("s1", stop.id);
        assertEquals("Agra Cantt", stop.name);
        assertEquals("AGC", stop.code);
        assertEquals(42.6, stop.distanceKm);
        assertEquals("10:40", stop.scheduledArrival);
        assertEquals("upcoming", stop.status);
    }
}
