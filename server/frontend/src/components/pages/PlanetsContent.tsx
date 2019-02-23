import React from "react";

import {Planets} from '../Planets';
import Links from '../../links';

/**
 * Represents content with an interactive demo of planetary and satellites datasets.
 */
const PlanetsContent = () => {
  return (
    <div>

      <div className='contentCenter'>
        This is an interactive version of <a href='https://nssdc.gsfc.nasa.gov/planetary/factsheet/'>Planetary Fact
        Sheet</a> and <a href='https://ssd.jpl.nasa.gov/?sat_phys_par'>Planetary Satellite Physical Parameters</a>
        &nbsp;datasets from {Links.jpl}.
        <p>
          Tips: <span className='highlight'>Select the planet below</span> to see only its satellites
          or <span className='highlight'>click on the column</span> to sort.
        </p>
      </div>

      <hr/>

      <div className='planets'>
        <Planets/>
      </div>

    </div>
  );
};


export default PlanetsContent;
