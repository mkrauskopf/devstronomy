package com.devstronomy.controller;

import com.devstronomy.model.Planet;
import com.devstronomy.repository.PlanetRepository;
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

    @GetMapping(value = "/")
    public List<Planet> getAllPlanets() {
        return planetRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Planet> getPlanetById(@PathVariable(value = "id") Long planetId) {
        Planet planet = planetRepository.findById(planetId).get();
        return ResponseEntity.ok().body(planet);
    }

}
