package com.devstronomy.repository;

import com.devstronomy.model.Satellite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SatelliteRepository extends JpaRepository<Satellite, Long> {

    List<Satellite> findByPlanetId(long planetId);

}
