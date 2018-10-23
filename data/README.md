## Planets CSV (`planets.csv`)

#### Variables in the file and their units

See also official [Planetary Fact Sheet Notes](https://nssdc.gsfc.nasa.gov/planetary/factsheet/planetfact_notes.html)
for more information about individual variables.

* Mass (10<sup>24</sup>kg)
* Diameter (km)
* Density (kg/m<sup>3</sup>)
* Gravity (m/s<sup>2</sup>)
* Escape Velocity (km/s)
* Rotation Period (hours)
* Length of Day (hours)
* Distance from Sun (10<sup>6</sup> km)
* Perihelion (10<sup>6</sup> km)
* Aphelion (10<sup>6</sup> km)
* Orbital Period (days)
* Orbital Velocity (km/s)
* Orbital Inclination (degrees)
* Orbital Eccentricity
* Obliquity to Orbit (degrees)
* Mean Temperature (C)
* Surface Pressure (bars)
* Number of Moons (number)
* Ring System? (Yes/No)
* Global Magnetic Field? (Yes/No)


#### Notes

The `planets.csv` file is a transpose of the table form the [NASA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/).


#### Transpose script

```python
import pandas as pd

p = pd.read_csv('planets-orig.csv', sep=';')
p.T.to_csv('planets.csv', header=False)
```
