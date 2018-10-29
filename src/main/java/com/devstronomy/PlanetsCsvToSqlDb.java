package com.devstronomy;

import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;

import java.io.IOException;
import java.io.Reader;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static com.devstronomy.jooq.generated.Tables.PLANET;

/**
 * Reads data from planets CSV file and insert them into the SQL database.
 */
final class PlanetsCsvToSqlDb {

    private static final String PLANETS_CSV_PATH = "data/planets.csv";

    // TODO: do not hardcode DB URL and credentials
    private static final String DB_USER_NAME = "root";
    private static final String DB_PASSWORD = "root";
    private static final String DB_URL = "jdbc:mysql://localhost:3306/devstronomy";

    public static void main(String[] args) throws IOException {
        Reader reader = Files.newBufferedReader(Paths.get(PLANETS_CSV_PATH));
        CSVReader planetsCSV = new CSVReaderBuilder(reader)
                .withCSVParser(new CSVParserBuilder().build())
                .withSkipLines(1) // skip header
                .build();
        try {
            for (String[] planetLine : planetsCSV) {
                insertIntoDb(planetLine);
            }
        } catch (SQLException e) {
            System.err.println("Cannot obtain database connection:");
            e.printStackTrace();
        }
    }

    private static void insertIntoDb(String[] planetLine) throws SQLException {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER_NAME, DB_PASSWORD)) {
            // TODO: Try to find a less verbose, yet typesafe, way to insert data with JOOQ.
            DSL.using(conn, SQLDialect.MYSQL)
                    .insertInto(PLANET,
                            PLANET.NAME, PLANET.MASS, PLANET.DIAMETER, PLANET.DENSITY, PLANET.GRAVITY,
                            PLANET.ESCAPE_VELOCITY, PLANET.ROTATION_PERIOD, PLANET.LENGTH_OF_DAY,
                            PLANET.DISTANCE_FROM_SUN, PLANET.PERIHELION, PLANET.APHELION, PLANET.ORBITAL_PERIOD,
                            PLANET.ORBITAL_VELOCITY, PLANET.ORBITAL_INCLINATION, PLANET.ORBITAL_ECCENTRICITY,
                            PLANET.OBLIQUITY_TO_ORBIT, PLANET.MEAN_TEMPERATURE, PLANET.SURFACE_PRESSURE,
                            PLANET.NUMBER_OF_MOONS, PLANET.HAS_RING_SYSTEM, PLANET.HAS_GLOBAL_MAGNETIC_FIELD)
                    .values(planetLine[0], toBD(planetLine[1]), toBD(planetLine[2]), toBD(planetLine[3]),
                            toBD(planetLine[4]), toBD(planetLine[5]), toBD(planetLine[6]), toBD(planetLine[7]),
                            toBD(planetLine[8]), toBD(planetLine[9]), toBD(planetLine[10]), toBD(planetLine[11]),
                            toBD(planetLine[12]), toBD(planetLine[13]), toBD(planetLine[14]), toBD(planetLine[15]),
                            toBD(planetLine[16]), toBD(planetLine[17]), Integer.valueOf(planetLine[18]),
                            Boolean.valueOf(planetLine[19]), Boolean.valueOf(planetLine[20]))
                    .execute();
        }
    }

    private static BigDecimal toBD(String str) {
        // 'Unknown*' is used as a value for a surface pressure of giant gas planets.
        // See https://nssdc.gsfc.nasa.gov/planetary/factsheet/planetfact_notes.html#surp for more.
        return str.equals("Unknown*") ? null : new BigDecimal(str);
    }

}
