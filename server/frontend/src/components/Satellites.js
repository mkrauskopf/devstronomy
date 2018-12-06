import React from 'react';
import { Column, Table } from 'react-virtualized';

const Satellites = (props) => {

  const _rowClassName = ({index}) => {
    if (index % 2 === 0) {
      return "oddRow";
    }
  }

  return(
    <Table width={545}
           height={514}
           headerHeight={90}
           rowHeight={40}
           rowCount={props.satellites.length}
           rowGetter={({ index }) => props.satellites[index]}
           rowClassName={_rowClassName}
    >
      <Column label='Name' dataKey='name' width={105} className='text' />
      <Column label='GM' dataKey='gm' width={95} />
      <Column label='Radius' dataKey='radius' width={75} />
      <Column label='Density' dataKey='density' width={75} />
      <Column label='Magnitude' dataKey='magnitude' width={105} />
      <Column label='Albedo' dataKey='albedo' width={70} />
    </Table>
  )

}

export default Satellites

