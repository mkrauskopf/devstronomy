package com.devstronomy.controller;

import com.devstronomy.model.Satellite;
import com.devstronomy.repository.SatelliteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/satellite")
@CrossOrigin(origins = "http://localhost:3000")
// TODO: Remove CrossOrigin hack which just eases the frontend development for now.
public class SatelliteController {

    @Autowired
    private SatelliteRepository satelliteRepository;

    @GetMapping(value = "/")
    public List<Satellite> getAllSatellites() {
        return satelliteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Satellite> getSatelliteById(@PathVariable(value = "id") Long satelliteId) {
        Satellite satellite = satelliteRepository.findById(satelliteId).get();
        return ResponseEntity.ok().body(satellite);
    }

}
