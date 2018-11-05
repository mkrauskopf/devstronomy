# Table of Contents
1. [Description](#Description)
2. [CSV files](#csv)
   1. [Planets](#planets)
   2. [Planetary Satellites](#satellites)
3. [SQL Dataset](#sql)
   1. [Examples](#sql-examples)
      1. [Ten largest moons of Saturn](#ten-moons-saturn)
      2. [Planets ordered by eccentricity](#planets-ecc)
      3. [Inconsistency in the number of moons](#moons-inconsistency)
   2. [Implementation](#sql-impl)


# Description
The _Devstronomy_ project aims to provide datasets related to astronomy in an accessible format for developers who
happen to be amateur astronomers. I am myself in such a situation and has not been able to find datasets provided
by this project in an accessible format.


<a name="csv"></a>
# CSV (comma-separated values) files
<a name="planets"></a>
1. [Planets CSV](#planets)
2. [Planetary Satellites CSV](#satellites)


### Planets

The [`planets.csv`](data/planets.csv) file contains information about planets in our Solar System including dwarf
planet Pluto.

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

The [`satellites.csv`](data/satellites.csv) file contains information about planetary satellites (moons) of planets in
our Solar System. Moons of dwarf planet Pluto are included as well.

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

<a name="sql"></a>
# SQL Dataset
The [`devstronomy.sql`](data/sql/devstronomy.sql) creates tables for planets and their satellites and fill them with
data from the CSV files [described above](#csv).

<a name="sql-examples"></a>
## Examples

<a name="ten-moons-saturn"></a>
### Information about ten largest moons of Saturn

```sql
SELECT s.name, s.radius, s.density, s.albedo FROM satellite AS s
    LEFT JOIN planet as p ON p.id = s.planet_id
    WHERE p.name = 'Saturn'
    ORDER BY s.radius DESC
    LIMIT 10
```

| name      | radius      | density  | albedo   |
|-----------|------------:| --------:| --------:|
| Titan     | 2574.730000 | 1.882000 | 0.200000 |
| Rhea      |  764.300000 | 1.233000 | 0.949000 |
| Iapetus   |  735.600000 | 1.083000 | 0.600000 |
| Dione     |  561.700000 | 1.476000 | 0.998000 |
| Tethys    |  533.000000 | 0.973000 | 1.229000 |
| Enceladus |  252.100000 | 1.608000 | 1.375000 |
| Mimas     |  198.200000 | 1.150000 | 0.962000 |
| Hyperion  |  135.000000 | 0.544000 | 0.300000 |
| Phoebe    |  106.500000 | 1.638000 | 0.081000 |
| Janus     |   89.500000 | 0.630000 | 0.710000 |

<a name="planets-ecc"></a>
### Planets ordered by eccentricity

```sql
SELECT name, orbital_eccentricity FROM planet ORDER BY orbital_eccentricity;
```

| name    | orbital_eccentricity |
|---------|---------------------:|
| Venus   |             0.007000 |
| Neptune |             0.011000 |
| Earth   |             0.017000 |
| Uranus  |             0.046000 |
| Jupiter |             0.049000 |
| Saturn  |             0.057000 |
| Mars    |             0.094000 |
| Mercury |             0.205000 |
| Pluto   |             0.244000 |

<a name="moons-inconsistency"></a>
### Inconsistency in the number of moons

Note: the `planet.number_of_moons` does not reflect the number of records in the `satellite` table for Jupiter and
Saturn. See the SQL select below. (_TODO_: why)

```sql
SELECT name, number_of_moons,
       (SELECT COUNT(*) FROM satellite s WHERE p.id = s.planet_id) moons_in_table
    FROM planet p;
```

| name    | number_of_moons | moons_in_table |
|---------|----------------:|---------------:|
| Mercury |               0 |              0 |
| Venus   |               0 |              0 |
| Earth   |               1 |              1 |
| Mars    |               2 |              2 |
| **Jupiter** |      **79** |         **67** |
| **Saturn**  |      **62** |         **61** |
| Uranus  |              27 |             27 |
| Neptune |              14 |             14 |
| Pluto   |               5 |              5 |


<a name="sql-impl"></a>
## Implementation
The data are converted from CSV files to SQL schema with the [JConverter tool](jconverter). The final `devstronomy.sql`
SQL dump is then created via `mysqldump`:

```bash
mysqldump -u [uname] -p[pass] devstronomy > devstronomy.sql
```
