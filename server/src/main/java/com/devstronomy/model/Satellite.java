package com.devstronomy.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "satellite")
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
// NOTE: Lombok and Jackson does not work well together. Getters in the source code are still needed.
//       See e.g.: https://stackoverflow.com/questions/51464720/lombok-1-18-0-and-jackson-2-9-6-not-working-together
public final class Satellite {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "planetId", nullable = false)
    private long planetId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "gm", nullable = false)
    private double gm;

    @Column(name = "radius", nullable = false)
    private double radius;

    @Column(name = "density")
    private Double density;

    @Column(name = "magnitude")
    private Double magnitude;

    @Column(name = "albedo")
    private Double albedo;

    public long getId() {
        return id;
    }

    public long getPlanetId() {
        return planetId;
    }

    public String getName() {
        return name;
    }

    public double getGm() {
        return gm;
    }

    public double getRadius() {
        return radius;
    }

    public Double getDensity() {
        return density;
    }

    public Double getMagnitude() {
        return magnitude;
    }

    public Double getAlbedo() {
        return albedo;
    }

}
