package com.devstronomy;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Reads data from planets CSV file and insert them into the SQL database.
 *
 * <p>
 * Runner for {@link Converter}.
 * </p>
 */
final class ConverterRunner {

    // TODO: do not hardcode DB URL and credentials
    private static final String DB_USER_NAME = "root";
    private static final String DB_PASSWORD = "root";
    private static final String DB_URL = "jdbc:mysql://localhost:3306/devstronomy";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER_NAME, DB_PASSWORD)) {
            Converter.doConversion(conn);
        } catch (SQLException e) {
            System.err.println("Cannot obtain database connection:");
            e.printStackTrace();
        }
    }

}
