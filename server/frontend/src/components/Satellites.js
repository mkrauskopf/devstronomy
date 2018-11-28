import React from 'react';
import './responsive.css';

const Satellites = (props) => {
  return (
      <div>
        <h2>Satellites of {props.planetName}</h2>

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

export default Satellites

