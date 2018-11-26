package com.devstronomy.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "planet")
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
// NOTE: Lombok and Jackson does not work well together. Getters in the source code are still needed.
//       See e.g.: https://stackoverflow.com/questions/51464720/lombok-1-18-0-and-jackson-2-9-6-not-working-together
public final class Planet {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "mass", nullable = false)
    private double mass;

    @Column(name = "diameter", nullable = false)
    private double diameter;

    @Column(name = "density", nullable = false)
    private double density;

    @Column(name = "gravity", nullable = false)
    private double gravity;

    @Column(name = "escape_velocity", nullable = false)
    private double escapeVelocity;

    @Column(name = "rotation_period", nullable = false)
    private double rotationPeriod;

    @Column(name = "length_of_day", nullable = false)
    private double lengthOfDay;

    @Column(name = "distance_from_sun", nullable = false)
    private double distanceFromSun;

    @Column(name = "perihelion", nullable = false)
    private double perihelion;

    @Column(name = "aphelion", nullable = false)
    private double aphelion;

    @Column(name = "orbital_period", nullable = false)
    private double orbitalPeriod;

    @Column(name = "orbital_velocity", nullable = false)
    private double orbitalVelocity;

    @Column(name = "orbital_inclination", nullable = false)
    private double orbitalInclination;

    @Column(name = "orbital_eccentricity", nullable = false)
    private double orbitalEccentricity;

    @Column(name = "obliquity_to_orbit", nullable = false)
    private double obliquityToOrbit;

    @Column(name = "mean_temperature", nullable = false)
    private double meanTemperature;

    @Column(name = "surface_pressure", nullable = true)
    private Double surfacePressure;

    @Column(name = "numberOfMoons", nullable = false)
    private int numberOfMoons;

    @Column(name = "hasRingSystem", nullable = false)
    private boolean hasRingSystem;

    @Column(name = "hasGlobalMagneticField", nullable = false)
    private boolean hasGlobalMagneticField;

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getMass() {
        return mass;
    }

    public double getDiameter() {
        return diameter;
    }

    public double getDensity() {
        return density;
    }

    public double getGravity() {
        return gravity;
    }

    public double getEscapeVelocity() {
        return escapeVelocity;
    }

    public double getRotationPeriod() {
        return rotationPeriod;
    }

    public double getLengthOfDay() {
        return lengthOfDay;
    }

    public double getDistanceFromSun() {
        return distanceFromSun;
    }

    public double getPerihelion() {
        return perihelion;
    }

    public double getAphelion() {
        return aphelion;
    }

    public double getOrbitalPeriod() {
        return orbitalPeriod;
    }

    public double getOrbitalVelocity() {
        return orbitalVelocity;
    }

    public double getOrbitalInclination() {
        return orbitalInclination;
    }

    public double getOrbitalEccentricity() {
        return orbitalEccentricity;
    }

    public double getObliquityToOrbit() {
        return obliquityToOrbit;
    }

    public double getMeanTemperature() {
        return meanTemperature;
    }

    public Double getSurfacePressure() {
        return surfacePressure;
    }

    public int getNumberOfMoons() {
        return numberOfMoons;
    }

    public boolean isHasRingSystem() {
        return hasRingSystem;
    }

    public boolean isHasGlobalMagneticField() {
        return hasGlobalMagneticField;
    }

}
