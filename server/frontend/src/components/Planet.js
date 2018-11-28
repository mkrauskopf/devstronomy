import React from 'react';
import './button.css';

const Planet = (props) => {
  const planet = props.planet
  return (
    <tr>
      <td><button onClick={() => props.selectPlanet(planet.name)}>{planet.name}</button></td>
      <td>{planet.mass}</td>
      <td>{planet.diameter}</td>
      <td>{planet.density}</td>
      <td>{planet.gravity}</td>
      <td>{planet.escapeVelocity}</td>
      <td>{planet.rotationPeriod}</td>
      <td>{planet.lengthOfDay}</td>
      <td>{planet.distanceFromSun}</td>
      <td>{planet.perihelion}</td>
      <td>{planet.aphelion}</td>
      <td>{planet.orbitalPeriod}</td>
      <td>{planet.orbitalVelocity}</td>
      <td>{planet.orbitalInclination}</td>
      <td>{planet.orbitalEccentricity}</td>
      <td>{planet.obliquityToOrbit}</td>
      <td>{planet.meanTemperature}</td>
      <td>{planet.surfacePressure}</td>
      <td>{planet.numberOfMoons}</td>
      <td>{planet.hasRingSystem}</td>
      <td>{planet.hasGlobalMagneticField}</td>
    </tr>
  )
}

export default Planet
