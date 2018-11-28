package com.devstronomy.controller;

import com.devstronomy.model.Planet;
import com.devstronomy.model.Satellite;
import com.devstronomy.repository.PlanetRepository;
import com.devstronomy.repository.SatelliteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planet")
@CrossOrigin(origins = "http://localhost:3000")
// TODO: Remove CrossOrigin hack which just eases the frontend development for now.
public class PlanetController {

    @Autowired
    private PlanetRepository planetRepository;

    @Autowired
    private SatelliteRepository satelliteRepository;

    @GetMapping(value = "/")
    public List<Planet> getAllPlanets() {
        return planetRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Planet> getPlanetById(@PathVariable(value = "id") long planetId) {
        return ResponseEntity.ok().body(planetRepository.findById(planetId).get());
    }

    @GetMapping("/{id}/satellites")
    public ResponseEntity<List<Satellite>> findSatellitesByPlanetId(@PathVariable(value = "id") long id) {
        return ResponseEntity.ok().body(satelliteRepository.findByPlanetId(id));
    }

}
