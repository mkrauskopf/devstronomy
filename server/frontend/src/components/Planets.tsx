import React from 'react';
import Satellites, { ISatellite } from './Satellites'
import { Column, Table } from 'react-virtualized';
import dataLoader from './data-loader-json'

// styles
import '../css-react-virtualized/styles.css'; // only needs to be imported once
import '../css/components/table.css';
import '../css/index.css';

export interface IPlanet {

  id: number;
  name: string;

}

interface State {
  planets: IPlanet[];
  selectedPlanet: IPlanet | null;
  satellites: ISatellite[];
}

export class Planets extends React.Component<{}, State> {

  // Maps column name to its unit.
  units: { [unitId: string]: JSX.Element } = {
    'Mass': <span>10<sup>24</sup>kg</span>,
    'Diameter': <span>km</span>,
    'Density': <span>kg/m<sup>3</sup></span>,
    'Gravity': <span>m/s<sup>2</sup></span>,
    'Escape Velocity': <span>km/s</span>,
    'Rotation Period': <span>hours</span>,
    'Length of Day': <span>hours</span>,
    'Distance from Sun': <span>10<sup>6</sup> km</span>,
    'Perihelion': <span>10<sup>6</sup> km</span>,
    'Aphelion': <span>10<sup>6</sup> km</span>,
    'Orbital Period': <span>days</span>,
    'Orbital Velocity': <span>km/s</span>,
    'Orbital Inclination': <span>degrees</span>,
    'Orbital Eccentricity': <span></span>,
    'Obliquity to Orbit': <span>degrees</span>,
    'Mean Temperature': <span>C</span>,
    'Surface Pressure': <span>bars</span>,
    'Number of Moons': <span>number</span>,
    'Ring System?': <span>Yes/No</span>,
    'Global Magnetic Field?': <span>Yes/No</span>,
  }

  readonly state: State = {
    planets: [],
    selectedPlanet: null,
    satellites: []
  }

  showMoons = (planet: IPlanet) => {
    if (planet === this.state.selectedPlanet) {
      this.loadAllSatellites();
    } else {
      dataLoader.loadSatellites(planet, (data: ISatellite[]) =>
        this.setState({
          satellites: data,
          selectedPlanet: planet
        })
      );
    }
  }

  _rowClassName = ({ index }: { index: number }) => {
    if (this.state.selectedPlanet === this.state.planets[index]) {
      return 'selectedRow';
    }
    if (index % 2 === 0) {
      return 'oddRow';
    }
    return '';
  }

  columnHeader = (column: string) => {
    return <span>{column}<br /><span className='unit'>({this.units[column]})</span></span>
  }

  render(): React.ReactNode {
    const selectedPlanet = this.state.selectedPlanet;
    const satellites = this.state.satellites;
    const planetName = selectedPlanet === null ? null : selectedPlanet.name;

    const showAllButton = selectedPlanet
      ? <span> (<button className='ahref' onClick={() => this.loadAllSatellites()}>show all satellites</button>)</span>
      : ' (select a planet above to filter satellites)';

    const planetSpan = <span className='header-highlight'>{planetName}</span>
    let satellitesHeader;
    if (satellites.length === 0) {
      satellitesHeader = <span>Planet {planetSpan} does not have any satellites</span>
    } else { // render table with satellites
      satellitesHeader = planetName === null
        ? 'Satellites of all planets'
        : <span>Satellites of planet {planetSpan}</span>
    }
    satellitesHeader = <span><span className='header'>{satellitesHeader}</span><span> ({satellites.length} shown)</span></span>

    return (
      <div>

        <span className='header'>Planets of our Solar System</span>

        <Table width={1950}
          height={450}
          headerHeight={90}
          rowHeight={40}
          rowCount={this.state.planets.length}
          rowGetter={({ index }: any) => this.state.planets[index]}
          rowClassName={this._rowClassName}
          onRowClick={(props: any) => this.showMoons(props.rowData)}
        >
          <Column label='Name' dataKey='name' width={70} className='main-column' />
          <Column label='Moons' dataKey='numberOfMoons' width={70} />
          <Column label={this.columnHeader('Mass')} dataKey='mass' width={70} />
          <Column label={this.columnHeader('Diameter')} dataKey='diameter' width={90} />
          <Column label={this.columnHeader('Density')} dataKey='density' width={70} />
          <Column label={this.columnHeader('Gravity')} dataKey='gravity' width={70} />
          <Column label={this.columnHeader('Escape Velocity')} dataKey='escapeVelocity' width={80} />
          <Column label={this.columnHeader('Rotation Period')} dataKey='rotationPeriod' width={80} />
          <Column label={this.columnHeader('Length of Day')} dataKey='lengthOfDay' width={80} />
          <Column label={this.columnHeader('Distance from Sun')} dataKey='distanceFromSun' width={80} />
          <Column label={this.columnHeader('Perihelion')} dataKey='perihelion' width={100} />
          <Column label={this.columnHeader('Aphelion')} dataKey='aphelion' width={90} />
          <Column label={this.columnHeader('Orbital Period')} dataKey='orbitalPeriod' width={70} />
          <Column label={this.columnHeader('Orbital Velocity')} dataKey='orbitalVelocity' width={80} />
          <Column label={this.columnHeader('Orbital Inclination')} dataKey='orbitalInclination' width={100} />
          <Column label='Orbital Eccentricity' dataKey='orbitalEccentricity' width={100} />
          <Column label={this.columnHeader('Obliquity to Orbit')} dataKey='obliquityToOrbit' width={80} />
          <Column label={this.columnHeader('Mean Temperature')} dataKey='meanTemperature' width={115} />
          <Column label={this.columnHeader('Surface Pressure')} dataKey='surfacePressure' width={80} />
        </Table>

        <br />
        <div>
          {satellitesHeader}{showAllButton}
        </div>

        <Satellites planet={this.state.selectedPlanet} satellites={this.state.satellites} />

      </div>
    )
  }

  // TODO: Put the two columns below back to the table and fix their data.
  //<Column label='Has Ring System' dataKey='hasRingSystem' width={80} className='text' />
  //<Column label='Has Global Magnetic Field' dataKey='hasGlobalMagneticField' width={80} className='text' />

  componentDidMount() {
    dataLoader.loadAllPlanets((data: IPlanet[]) =>
      this.setState({
        planets: data
      })
    );

    this.loadAllSatellites();
  }

  loadAllSatellites() {
    dataLoader.loadAllSatellites((data: ISatellite[]) =>
      this.setState({
        satellites: data,
        selectedPlanet: null
      })
    );
  }

}
