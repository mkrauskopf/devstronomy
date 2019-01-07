import React from 'react';
import { Column, Table, Index } from 'react-virtualized';
import { IPlanet } from './Planets';
import { List } from 'immutable';

export interface ISatellite {

  id: number;

}

interface State {
  planet: IPlanet | null;
  satellites: List<ISatellite>;
}

class Satellites extends React.Component<State, {}> {

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
    return (
      <Table width={575}
        height={514}
        headerHeight={90}
        rowHeight={40}
        rowCount={this.props.satellites.size}
        rowGetter={({ index }: Index) => this.props.satellites.get(index)}
        rowClassName={this.rowClassName}
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

};

export default Satellites;

