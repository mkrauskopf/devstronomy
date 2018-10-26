# Table of Contents
1. [Description](#Description)
2. [Datasets](#Datasets)
   1. [Planets](#planets)
   2. [Planetary satellites](#satellites)


# Description
The _Devstronomy_ project aims to provide datasets related to astronomy in an accessible format for developers who
happen to be amateur astronomers. I am myself in such a situation and has not been able to find datasets provided
by this project in an accessible format.


# Datasets
<a name="planets"></a>
## Planets

The [`planets.csv`](data/planets.csv) file contains information about planets in our Solar System including dwarf planet Pluto.
 
### Variables in the file and their units

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

### Notes

The `planets.csv` file is a transpose of the table form the [NASA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/).

### Transpose Python script

```python
import pandas as pd

p = pd.read_csv('planets-nasa-export.csv', sep=';')
p.T.to_csv('planets.csv', header=False)
```


<a name="satellites"></a>
## Planetary satellites (moons) 

The [`satellites.csv`](data/satellites.csv) file contains information about planetary satellites (moons) of planets in our Solar System. Moons
of dwarf planet Pluto are included as well.

### Variables in the file and their units

* _planet_: owning planet of the satellite
* _name_: name of the satellite
* _gm_: GM (km<sup>3</sup>/sec<sup>2</sup>)
* _radius_: Mean radius (km)
* _density_: Mean density (g/cm<sup>3</sup>)
* _magnitude_: Magnitude V<sub>0</sub> or R
* _albedo_: Geometric Albedo

### Notes

The source of data for the `sattelites.csv` is [Planetary Satellite Physical Parameters](https://ssd.jpl.nasa.gov/?sat_phys_par)
from Jet Propulsion Laboratory. See the JPL site for more details about the data.
