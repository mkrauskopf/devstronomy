import React, { Component } from 'react';
import Satellites from './Satellites'
import '../css-react-virtualized/styles.css'; // only needs to be imported once
import '../css/components/style.css';
import { Column, Table } from 'react-virtualized';

class Planets extends Component {

  state = {
    planets: [],
    selectedPlanet: null,
    satellites: []
  }

  showMoons = (planet) => {
    fetch('http://localhost:8080/planet/' + planet.id + '/satellites')
      .then(results => {
        return results.json();
      }).then(data => {
        this.setState({
          satellites: data,
          selectedPlanet: planet.name
        })
      })
  }

  render() {
    return (
      <div>

        <h2>Planets of our Solar System</h2>

        <Table width={2050}
               height={450}
               headerHeight={90}
               rowHeight={40}
               rowCount={this.state.planets.length}
               rowGetter={({ index }) => this.state.planets[index]}
               >
          <Column label='Name' dataKey='name' width={80} />
          <Column label='Mass' dataKey='mass' width={80} />
          <Column label='Diameter' dataKey='diameter' width={100} />
          <Column label='Density' dataKey='density' width={80} />
          <Column label='Gravity' dataKey='gravity' width={80} />
          <Column label='Escape Velocity' dataKey='escapeVelocity' width={80} />
          <Column label='Rotation Period' dataKey='rotationPeriod' width={80} />
          <Column label='Length Of Day' dataKey='lengthOfDay' width={80} />
          <Column label='Distance From Sun' dataKey='distanceFromSun' width={80} />
          <Column label='Perihelion' dataKey='perihelion' width={100} />
          <Column label='Aphelion' dataKey='aphelion' width={90} />
          <Column label='Orbital Period' dataKey='orbitalPeriod' width={70} />
          <Column label='Orbital Velocity' dataKey='orbitalVelocity' width={80} />
          <Column label='Orbital Inclination' dataKey='orbitalInclination' width={100} />
          <Column label='Orbital Eccentricity' dataKey='orbitalEccentricity' width={100} />
          <Column label='Obliquity To Orbit' dataKey='obliquityToOrbit' width={80} />
          <Column label='Mean Temperature' dataKey='meanTemperature' width={115} />
          <Column label='Surface Pressure' dataKey='surfacePressure' width={80} />
          <Column label='Number Of Moons' dataKey='numberOfMoons' width={70} />
          <Column label='Has Ring System' dataKey='hasRingSystem' width={80} />
          <Column label='Has Global Magnetic Field' dataKey='hasGlobalMagneticField' width={80} />
        </Table>

        <Satellites planetName={this.state.selectedPlanet} satellites={this.state.satellites} />

      </div>
    )
  }

  componentDidMount() {
    fetch('http://localhost:8080/planet/')
      .then(results => {
        return results.json();
      }).then(data => {
        this.setState({
          planets: data
        })
      })
    fetch('http://localhost:8080/satellite/')
      .then(results => {
        return results.json();
      }).then(data => {
        this.setState({
          satellites: data,
          selectedPlanet: "all planets"
        })
      })
  }

}

export default Planets;
