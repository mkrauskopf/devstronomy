import React from 'react';
import './responsive.css';

const Satellites = (props) => {
  if (props.satellites.length === 0) {
    return <h2>Planet <i>{props.planetName}</i> does not have any satellites.</h2>
  } else { // render table with satellites
    return(
      <div>
        <h2>Satellites of <i>{props.planetName}</i></h2>

        <table className="rwd-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>GM</th>
              <th>Radius</th>
              <th>Density</th>
              <th>Magnitude</th>
              <th>Albedo</th>
            </tr>
          </thead>
          <tbody>
          {
            props.satellites.map(satellite => {
              return <tr key={satellite.id}>
                       <td>{satellite.name}</td>
                       <td>{satellite.gm}</td>
                       <td>{satellite.radius}</td>
                       <td>{satellite.density}</td>
                       <td>{satellite.magnitude}</td>
                       <td>{satellite.albedo}</td>
                     </tr>
            })
          }
          </tbody>
        </table>

      </div>
    )
  }
}

export default Satellites

