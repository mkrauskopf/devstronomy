-- The script creates a database table called "hyg_stars", suitable for the
-- HYG star database archive, and imports the data from the "hygdata_v3.csv"
-- into the table.

-- See https://github.com/astronexus/HYG-Database for the columns information.
CREATE TABLE hyg_stars (
  id INT NOT NULL UNIQUE,
  hip INT,
  hd INT,
  hr INT,
  gl VARCHAR(30) UNIQUE,
  bf VARCHAR(30),
  proper VARCHAR(30),
  ra DECIMAL(16,6),
  decl DECIMAL(16,6),
  dist DECIMAL(16,6),
  pmra DECIMAL(16,6),
  pmdec DECIMAL(16,6),
  rv DECIMAL(16,6),
  mag DECIMAL(16,6),
  absmag INT,
  spect VARCHAR(30),
  ci INT,
  x DECIMAL(16,6),
  y DECIMAL(16,6),
  z DECIMAL(16,6),
  vx DECIMAL(16,6),
  vy DECIMAL(16,6),
  vz DECIMAL(16,6),
  rarad DECIMAL(16,6),
  decrad DECIMAL(16,6),
  pmrarad DECIMAL(16,6),
  pmdecrad DECIMAL(16,6),
  bayer VARCHAR(30),
  flam VARCHAR(30),
  con VARCHAR(30),
  comp INT,
  comp_primary INT,
  base VARCHAR(30),
  lum DECIMAL(16,6),
  var VARCHAR(30),
  var_min INT,
  var_max INT,
  PRIMARY KEY(id)
);

-- An absolute path to the HYG CSV dataset file.
LOAD DATA INFILE '/Users/martin/work/devstronomy/data/csv/hygdata_v3.csv'
  INTO TABLE hyg_stars
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  IGNORE 1 LINES
  (id, @hip, @hd, @hr, @gl, bf, proper, ra, decl, dist, pmra, pmdec, rv,
   mag, absmag, spect, @ci, x, y, z, vx, vy, vz, rarad, decrad, pmrarad, pmdecrad,
   bayer, flam, con, comp, comp_primary, base, lum, var, @var_min, @var_max)
  SET
    hip = nullif(@hip,''),
    hd = nullif(@hd,''),
    hr = nullif(@hr,''),
    gl = nullif(@gl,''),
    var_min = nullif(@var_min,''),
    ci = nullif(@ci,''),
    var_max = nullif(@var_max,'')
  ;
