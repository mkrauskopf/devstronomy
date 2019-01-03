import React from 'react';
import { Column, Table } from 'react-virtualized';
import { IPlanet } from './Planets';

export interface ISatellite {

  id: number;

}

interface Props {
  planet: IPlanet | null;
  satellites: any;
}

const Satellites: React.SFC<Props> = (props) => {

  // Maps column name to its unit.
  const units = {
    'GM': <span>km<sup>3</sup>/sec<sup>2</sup></span>,
    'Mean Radius': 'km',
    'Mean Density': <span>g/cm<sup>3</sup></span>,
    'Magnitude': <span>V<sub>0</sub> or R</span>,
  };

  const _rowClassName = ({ index }: { index: number }) => {
    return index % 2 === 0 ? 'oddRow' : '';
  };

  const columnHeader = (column: string) => {
    return <span>{column}<br/><span className='unit'>({units[column]})</span></span>;
  };

  return(
    <Table width={575}
           height={514}
           headerHeight={90}
           rowHeight={40}
           rowCount={props.satellites.length}
           rowGetter={({ index }) => props.satellites[index]}
           rowClassName={_rowClassName}
    >
      <Column label='Name' dataKey='name' width={105} className='main-column' />
      <Column label={columnHeader('GM')} dataKey='gm' width={95} />
      <Column label={columnHeader('Mean Radius')} dataKey='radius' width={75} />
      <Column label={columnHeader('Mean Density')} dataKey='density' width={75} />
      <Column label={columnHeader('Magnitude')} dataKey='magnitude' width={105} />
      <Column label='Geometric Albedo' dataKey='albedo' width={100} />
    </Table>
  );

};

export default Satellites;

