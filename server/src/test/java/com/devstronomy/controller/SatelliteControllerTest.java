package com.devstronomy.controller;

import com.devstronomy.model.Satellite;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class SatelliteControllerTest {

    // That's a lot! :)
    private static final int N_OF_SATELLITES = 177;

    @Autowired
    private SatelliteController satelliteController;

    @Test
    public void contextLoads() {
        assertThat(satelliteController).isNotNull();
        List<Satellite> allSatellites = satelliteController.getAllSatellites();
        assertThat(allSatellites).hasSize(N_OF_SATELLITES);
        ResponseEntity<Satellite> randomSatellite = satelliteController.getSatelliteById(3l);
        assertEquals(randomSatellite.getStatusCode(), HttpStatus.OK);
    }

}
