import React from 'react';
import Links from './../links';

const github = 'https://github.com/mkrauskopf/devstronomy/blob/master/';

const gitHubLink = (relPath, fileName) =>
  <a href={github + 'data/' + relPath + fileName}><code className='link'>{fileName}</code></a>;

// Placeholders used in the HTML below.
const planetCsvLink = gitHubLink('csv/', 'planets.csv');
const planetJsonLink = gitHubLink('json/', 'planets.json');
const satellitesCsvLink = gitHubLink('csv/', 'satellites.csv');
const satellitesJsonLink = gitHubLink('json/', 'satellites.json');
const datasetsSql = gitHubLink('sql/', 'devstronomy.sql');

const Datasets = () => {

  return(
    <div>
      <h1 className='content'>Datasets section</h1>
      <p>
        Devstronomy project aims to provide datasets related to astronomy in an accessible format (CSV, JSON, SQL).
      <p>

      </p>
        Currently, there are datasets for:
          <ul>
            <li>planets of our Solar System (+ Pluto)</li>
            <li>natural satellites(moons) of all planets</li>
          </ul>
      </p>
    

      <hr id='tableofcontents'/>
      <h2>Table of Contents</h2>
      <ol>
        <li><a href='#downloads'>Quick Downloads</a></li>
        <li><a href='#information'>Datasets information</a></li>
        <ol>
          <li><a href='#planets'>Planets</a></li>
          <li><a href='#satellites'>Planetary Satellites</a></li>
        </ol>
        <li><a href='#csv'>CSV files</a></li>
        <li><a href='#json'>JSON files</a></li>
        <li><a href='#sql'>SQL Dataset</a>
          <ol>
            <li><a href='#sql-examples'>SQL usage examples</a>
              <ol>
                <li><a href='#ten-moons-saturn'>Ten largest moons of Saturn</a></li>
                <li><a href='#planets-ecc'>Planets ordered by eccentricity</a></li>
                <li><a href='#moons-inconsistency'>Inconsistency in the number of moons</a></li>
              </ol>
            </li>
          </ol>
        </li>
        <li><a href='#implementation'>Implementation notes</a></li>
      </ol>


      <hr id='downloads'/>
      <h2>Quick Downloads</h2>

      <table>
        <thead>
          <tr>
            <th>Dataset</th>
            <th>CSV</th>
            <th>JSON</th>
            <th>SQL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Planets</td>
            <td>{planetCsvLink}</td>
            <td>{planetJsonLink}</td>
            <td>{datasetsSql}</td>
          </tr>
          <tr>
            <td>Satellites</td>
            <td>{satellitesCsvLink}</td>
            <td>{satellitesJsonLink}</td>
            <td>{datasetsSql}</td>
          </tr>
        </tbody>
      </table>


      <hr id='information'/>
      <h2>Datasets information</h2>

      <h3 id='planets'>Planets</h3>

      <p>
        The {planetCsvLink} file contains information about planets in our Solar System including dwarf planet Pluto.
        The source of data is <a href='https://nssdc.gsfc.nasa.gov/planetary/factsheet/'>Planetary Fact Sheet</a> from {Links.jpl}.
      </p>


      <h4>Fields and units in the planetary dataset</h4>

      <p>See also official <a href='https://nssdc.gsfc.nasa.gov/planetary/factsheet/planetfact_notes.html'>Planetary
      Fact Sheet Notes</a> for more information about individual fields.</p>

      <ul>
        <li>Mass (10<sup>24</sup>kg)</li>
        <li>Diameter (km)</li>
        <li>Density (kg/m<sup>3</sup>)</li>
        <li>Gravity (m/s<sup>2</sup>)</li>
        <li>Escape Velocity (km/s)</li>
        <li>Rotation Period (hours)</li>
        <li>Length of Day (hours)</li>
        <li>Distance from Sun (10<sup>6</sup> km)</li>
        <li>Perihelion (10<sup>6</sup> km)</li>
        <li>Aphelion (10<sup>6</sup> km)</li>
        <li>Orbital Period (days)</li>
        <li>Orbital Velocity (km/s)</li>
        <li>Orbital Inclination (degrees)</li>
        <li>Orbital Eccentricity</li>
        <li>Obliquity to Orbit (degrees)</li>
        <li>Mean Temperature (C)</li>
        <li>Surface Pressure (bars)</li>
        <li>Number of Moons (number)</li>
        <li>Ring System? (Yes/No)</li>
        <li>Global Magnetic Field? (Yes/No)</li>
      </ul>


      <h3 id='satellites'>Planetary satellites (moons)</h3>
      <p>
        The {satellitesCsvLink} file contains information about planetary satellites (moons) of planets in our Solar
        System. Moons of dwarf planet Pluto are included as well.
        The source of data is <a href='https://ssd.jpl.nasa.gov/?sat_phys_par'>Planetary Satellite Physical
        Parameters</a> from {Links.jpl}.
      </p>

      <h4>Fields and units in the satellites dataset</h4>

      <ul>
        <li><em>planet</em>: owning planet of the satellite</li>
        <li><em>name</em>: name of the satellite</li>
        <li><em>gm</em>: GM (km<sup>3</sup>/sec<sup>2</sup>)</li>
        <li><em>radius</em>: Mean radius (km)</li>
        <li><em>density</em>: Mean density (g/cm<sup>3</sup>)</li>
        <li><em>magnitude</em>: Magnitude V<sub>0</sub> or R</li>
        <li><em>albedo</em>: Geometric Albedo</li>
      </ul>


      <hr id='csv'/>
      <h2>CSV (comma-separated values) files</h2>
      <ul>
        <li>{planetCsvLink}</li>
        <li>{satellitesCsvLink}</li>
      </ul>


      <hr id='json'/>
      <h2>JSON</h2>
      <ul>
        <li>{planetJsonLink}</li>
        <li>{satellitesJsonLink}</li>
      </ul>


      <hr id='sql'/>
      <h2>SQL Dataset</h2>

      <p>The {datasetsSql} creates tables for planets and their satellites and fill them with
      data from the CSV files <a href='#csv'>described above</a>.</p>

      <p>For example for MySQL database following commands will create the database:</p>

      <pre>{
`mysqladmin -u [uname] -p[pass] create devstronomy
mysql -u [uname] -p[pass] devstronomy &lt; data/sql/devstronomy.sql`}</pre>

      <h3 id='sql-examples'>SQL usage examples</h3>

      <h4 id='ten-moons-saturn'>Information about ten largest moons of Saturn</h4>

      <pre>{
`SELECT s.name, s.radius, s.density, s.albedo FROM satellite AS s
     LEFT JOIN planet as p ON p.id = s.planet_id
     WHERE p.name = 'Saturn'
     ORDER BY s.radius DESC
     LIMIT 10`}</pre>

      { /* Table of satellites. */ }
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>radius</th>
            <th>density</th>
            <th>albedo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Titan</td>
            <td align='right'>2574.730000</td>
            <td align='right'>1.882000</td>
            <td align='right'>0.200000</td>
          </tr>
          <tr>
            <td>Rhea</td>
            <td align='right'>764.300000</td>
            <td align='right'>1.233000</td>
            <td align='right'>0.949000</td>
          </tr>
          <tr>
            <td>Iapetus</td>
            <td align='right'>735.600000</td>
            <td align='right'>1.083000</td>
            <td align='right'>0.600000</td>
          </tr>
          <tr>
            <td>Dione</td>
            <td align='right'>561.700000</td>
            <td align='right'>1.476000</td>
            <td align='right'>0.998000</td>
          </tr>
          <tr>
            <td>Tethys</td>
            <td align='right'>533.000000</td>
            <td align='right'>0.973000</td>
            <td align='right'>1.229000</td>
          </tr>
          <tr>
            <td>Enceladus</td>
            <td align='right'>252.100000</td>
            <td align='right'>1.608000</td>
            <td align='right'>1.375000</td>
          </tr>
          <tr>
            <td>Mimas</td>
            <td align='right'>198.200000</td>
            <td align='right'>1.150000</td>
            <td align='right'>0.962000</td>
          </tr>
          <tr>
            <td>Hyperion</td>
            <td align='right'>135.000000</td>
            <td align='right'>0.544000</td>
            <td align='right'>0.300000</td>
          </tr>
          <tr>
            <td>Phoebe</td>
            <td align='right'>106.500000</td>
            <td align='right'>1.638000</td>
            <td align='right'>0.081000</td>
          </tr>
          <tr>
            <td>Janus</td>
            <td align='right'>89.500000</td>
            <td align='right'>0.630000</td>
            <td align='right'>0.710000</td>
          </tr>
        </tbody>
      </table>

      <h4 id='planets-ecc'>Planets ordered by eccentricity</h4>

      <pre>SELECT name, orbital_eccentricity FROM planet ORDER BY orbital_eccentricity;</pre>

      { /* Result of select: table of planets. */ }
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>orbital_eccentricity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Venus</td>
            <td align='right'>0.007000</td>
          </tr>
          <tr>
            <td>Neptune</td>
            <td align='right'>0.011000</td>
          </tr>
          <tr>
            <td>Earth</td>
            <td align='right'>0.017000</td>
          </tr>
          <tr>
            <td>Uranus</td>
            <td align='right'>0.046000</td>
          </tr>
          <tr>
            <td>Jupiter</td>
            <td align='right'>0.049000</td>
          </tr>
          <tr>
            <td>Saturn</td>
            <td align='right'>0.057000</td>
          </tr>
          <tr>
            <td>Mars</td>
            <td align='right'>0.094000</td>
          </tr>
          <tr>
            <td>Mercury</td>
            <td align='right'>0.205000</td>
          </tr>
          <tr>
            <td>Pluto</td>
            <td align='right'>0.244000</td>
          </tr>
        </tbody>
      </table>

      <h4 id='moons-inconsistency'>Inconsistency in the number of moons</h4>

      <p>Note: the <code>planet.number_of_moons</code> does not reflect the number of records in the <code>satellite</code> table for Jupiter and
      Saturn. See the SQL select below. (<em>TODO</em>: why)</p>

      <pre>{
`SELECT name, number_of_moons,
    (SELECT COUNT(*) FROM satellite s WHERE p.id = s.planet_id) moons_in_table
    FROM planet p;`}</pre>

      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>number_of_moons</th>
            <th>moons_in_table</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mercury</td>
            <td align='right'>0</td>
            <td align='right'>0</td>
          </tr>
          <tr>
            <td>Venus</td>
            <td align='right'>0</td>
            <td align='right'>0</td>
          </tr>
          <tr>
            <td>Earth</td>
            <td align='right'>1</td>
            <td align='right'>1</td>
          </tr>
          <tr>
            <td>Mars</td>
            <td align='right'>2</td>
            <td align='right'>2</td>
          </tr>
          <tr>
            <td><strong>Jupiter</strong></td>
            <td align='right'><strong>79</strong></td>
            <td align='right'><strong>67</strong></td>
          </tr>
          <tr>
            <td><strong>Saturn</strong></td>
            <td align='right'><strong>62</strong></td>
            <td align='right'><strong>61</strong></td>
          </tr>
          <tr>
            <td>Uranus</td>
            <td align='right'>27</td>
            <td align='right'>27</td>
          </tr>
          <tr>
            <td>Neptune</td>
            <td align='right'>14</td>
            <td align='right'>14</td>
          </tr>
          <tr>
            <td>Pluto</td>
            <td align='right'>5</td>
            <td align='right'>5</td>
          </tr>
        </tbody>
      </table>


      <hr id='implementation'/>
      <h2>Implementation notes</h2>

      <h3>SQL notes</h3>
      
      <p>The data are converted from CSV files to SQL schema with the <a href='jconverter'>JConverter tool</a>. The
      final {datasetsSql} dump is then created via <code>mysqldump</code>:</p>

      <pre>mysqldump -u [uname] -p[pass] devstronomy &gt; data/sql/devstronomy.sql</pre>

      <h3>CSV notes</h3>

      <h4>Transpose Python script</h4>

      <pre>{
`import pandas as pd
p = pd.read_csv('planets-nasa-export.csv', sep=';')
p.T.to_csv('planets.csv', header=False)`}</pre>

    </div>
  );
};

export default Datasets;


