import React from 'react';
import { Column, Table, Index, SortDirectionType, SortDirection } from 'react-virtualized';
import { IPlanet } from './Planets';
import { List } from 'immutable';
import dataLoader from './data-loader-json'

export interface ISatellite {
  id: number;
}

interface Props {
  planet: IPlanet | null;
  nOfSatellitesCallback(n: number): void;
}

interface State {
  sortBy?: string;
  sortDirection?: SortDirectionType;
  satellites: List<ISatellite>;
}

class Satellites extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      satellites: List()
    }
  }

  componentDidMount() {
    this.loadAllSatellites();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.planet !== this.props.planet) {
      this.loadSatellites(this.props.planet);
    }
  }

  // Maps column name to its unit.
  units: { [unitId: string]: JSX.Element } = {
    'GM': <span>km<sup>3</sup>/sec<sup>2</sup></span>,
    'Mean Radius': <span>km</span>,
    'Mean Density': <span>g/cm<sup>3</sup></span>,
    'Magnitude': <span>V<sub>0</sub> or R</span>,
  };

  private rowClassName = ({ index }: Index): string => {
    return index % 2 === 0 ? 'oddRow' : '';
  };

  private columnHeader = (column: string): React.ReactNode => {
    return <span>{column}<br /><span className='unit'>({this.units[column]})</span></span>;
  };

  render(): React.ReactNode {
    const sortDirection = this.state.sortDirection;
    const sortBy = this.state.sortBy;

    return (
      <Table width={575}
        height={514}
        headerHeight={90}
        rowHeight={40}
        rowCount={this.state.satellites.size}
        rowGetter={({ index }: Index) => this.state.satellites.get(index)}
        rowClassName={this.rowClassName}
        sort={this.sort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      >
        <Column label='Name' dataKey='name' width={105} className='main-column' />
        <Column label={this.columnHeader('GM')} dataKey='gm' width={95} />
        <Column label={this.columnHeader('Mean Radius')} dataKey='radius' width={75} />
        <Column label={this.columnHeader('Mean Density')} dataKey='density' width={75} />
        <Column label={this.columnHeader('Magnitude')} dataKey='magnitude' width={105} />
        <Column label='Geometric Albedo' dataKey='albedo' width={100} />
      </Table>
    );
  }

  private loadAllSatellites = () => {
    dataLoader.loadAllSatellites(this.setSatellites);
  }

  private loadSatellites = (planet: IPlanet | null): void => {
    if (planet === null) {
      this.loadAllSatellites();
    } else {
      dataLoader.loadSatellites(planet, this.setSatellites);
    }
  }

  private setSatellites = (satellites: ISatellite[]): void => {
    this.setState({
      satellites: List(satellites),
    });
    this.props.nOfSatellitesCallback(satellites.length);
  }

  // TODO: get rid of duplicated code for sorting routines.
  private sort = ({ sortBy, sortDirection }: { sortBy: string, sortDirection: SortDirectionType }) => {
    const sortedSatellites = this.sortList(sortBy, sortDirection);
    this.setState({ sortBy, sortDirection, satellites: sortedSatellites });
  }

  private sortList = (sortBy: string, sortDirection: SortDirectionType): List<ISatellite> => {
    const sortedSats = this.state.satellites.sortBy(sat => sat === undefined ? '' : sat[sortBy]);
    return List<ISatellite>(sortedSats).update(
      sortedSats => (sortDirection === SortDirection.DESC ? List(sortedSats.reverse()) : sortedSats),
    );
  }

};

export default Satellites;

