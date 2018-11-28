package com.devstronomy.controller;

import com.devstronomy.model.Planet;
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
class PlanetControllerTest {

    @Autowired
    private PlanetController planetController;

    @Test
    public void contextLoads() {
        assertThat(planetController).isNotNull();
        List<Planet> allPlanets = planetController.getAllPlanets();
        assertThat(allPlanets).hasSize(9);
        ResponseEntity<Planet> earth = planetController.getPlanetById(3l);
        assertEquals(earth.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void findSatellitesByPlanetId() {
        ResponseEntity<List<Satellite>> response = planetController.findSatellitesByPlanetId(4);
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        List<Satellite> marsSatellites = response.getBody();
        System.out.println("marsSatellites = " + marsSatellites);
        assertThat(marsSatellites).as("two Mars satellites").hasSize(2);
    }

}
