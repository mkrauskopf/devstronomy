import React, { Component } from 'react';
import Planet from './Planet'
import Satellites from './Satellites'
import './responsive.css';

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

        <table className="rwd-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mass</th>
              <th>Diameter</th>
              <th>Density</th>
              <th>Gravity</th>
              <th>Escape Velocity</th>
              <th>Rotation Period</th>
              <th>Length Of Day</th>
              <th>Distance From Sun</th>
              <th>Perihelion</th>
              <th>Aphelion</th>
              <th>Orbital Period</th>
              <th>Orbital Velocity</th>
              <th>Orbital Inclination</th>
              <th>Orbital Eccentricity</th>
              <th>Obliquity To Orbit</th>
              <th>Mean Temperature</th>
              <th>Surface Pressure</th>
              <th>Number Of Moons</th>
              <th>Has Ring System</th>
              <th>Has Global Magnetic Field</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.planets.map(planet => {
              return <Planet selectPlanet={() => this.showMoons(planet)} key={planet.id} planet={planet}/>
            })
          }
          </tbody>
        </table>

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
