package com.devstronomy.controller;

import com.devstronomy.model.Planet;
import com.devstronomy.repository.PlanetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/planet")
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
