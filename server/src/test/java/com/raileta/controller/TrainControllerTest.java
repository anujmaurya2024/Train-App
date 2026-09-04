package com.raileta.controller;

import com.raileta.model.TrainData;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TrainControllerTest {

    @Test
    void listShouldReturnSeededTrainData() {
        TrainController controller = new TrainController();

        List<TrainData> result = controller.list();

        assertEquals(1, result.size());
        assertEquals("12001", result.get(0).id);
        assertEquals("Rajdhani Express", result.get(0).name);
    }

    @Test
    void getShouldReturnMatchingTrainWhenPresent() {
        TrainController controller = new TrainController();

        TrainData result = controller.get("12001");

        assertNotNull(result);
        assertEquals("12001", result.id);
        assertEquals("Delhi", result.origin);
        assertEquals("Bhopal", result.destination);
    }

    @Test
    void getShouldFallbackToFirstTrainWhenIdDoesNotExist() {
        TrainController controller = new TrainController();

        TrainData result = controller.get("missing-id");

        assertNotNull(result);
        assertEquals("12001", result.id);
    }

    @Test
    void eventsShouldStreamThreeLiveUpdatesForRequestedTrain() {
        TrainController controller = new TrainController();

        List<TrainData> events = controller.events("12001")
                .take(3)
                .collectList()
                .block();

        assertNotNull(events);
        assertEquals(3, events.size());
        assertTrue(events.stream().allMatch(train -> "12001".equals(train.id)));
        assertTrue(events.stream().allMatch(train -> train.journeyProgress >= 34));
    }
}
