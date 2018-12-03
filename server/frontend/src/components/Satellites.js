import React from 'react';
import { Column, Table } from 'react-virtualized';

const Satellites = (props) => {

  const _rowClassName = ({index}) => {
    if (index % 2 === 0) {
      return "oddRow";
    }
  }

  if (props.satellites.length === 0) {
    return <h2>Planet <span className='highlight'>{props.planetName}</span> does not have any satellites.</h2>
  } else { // render table with satellites
    const planetText = props.planetName === null
      ? <span>all planets</span>
      : <span>planet <span className='highlight'>{props.planetName}</span></span>
    return(
      <div>
        <h2>Satellites of {planetText}</h2>

        <Table width={515}
               height={514}
               headerHeight={90}
               rowHeight={40}
               rowCount={props.satellites.length}
               rowGetter={({ index }) => props.satellites[index]}
               rowClassName={_rowClassName}
               >
          <Column label='Name' dataKey='name' width={105} />
          <Column label='GM' dataKey='gm' width={85} />
          <Column label='Radius' dataKey='radius' width={75} />
          <Column label='Density' dataKey='density' width={75} />
          <Column label='Magnitude' dataKey='magnitude' width={105} />
          <Column label='Albedo' dataKey='albedo' width={70} />
        </Table>

      </div>
    )
  }
}

export default Satellites

