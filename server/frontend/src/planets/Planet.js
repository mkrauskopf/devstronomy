import React from 'react';

const Planet = (props) => {
  return (
    <tr>
      <td>{props.planet.name}</td>
      <td>{props.planet.mass}</td>
      <td>{props.planet.diameter}</td>
      <td>{props.planet.density}</td>
      <td>{props.planet.gravity}</td>
      <td>{props.planet.escapeVelocity}</td>
      <td>{props.planet.rotationPeriod}</td>
      <td>{props.planet.lengthOfDay}</td>
      <td>{props.planet.distanceFromSun}</td>
      <td>{props.planet.perihelion}</td>
      <td>{props.planet.aphelion}</td>
      <td>{props.planet.orbitalPeriod}</td>
      <td>{props.planet.orbitalVelocity}</td>
      <td>{props.planet.orbitalInclination}</td>
      <td>{props.planet.orbitalEccentricity}</td>
      <td>{props.planet.obliquityToOrbit}</td>
      <td>{props.planet.meanTemperature}</td>
      <td>{props.planet.surfacePressure}</td>
      <td>{props.planet.numberOfMoons}</td>
      <td>{props.planet.hasRingSystem}</td>
      <td>{props.planet.hasGlobalMagneticField}</td>
    </tr>
  )
}

export default Planet

