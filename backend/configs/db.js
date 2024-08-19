/****************
 * Author: Alex Borchers
 * Date Created: 7/27/2024
 *
 * Purpose:
 * Establish DB Connection for MySQL
 *
 *****************/

require("dotenv").config(); // Load the .env file from the root directory
const mysql = require("mysql2");

// Get host, user, pass from .env
const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;

// Setup DB Config
const config = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

/**
 * Executes a query on the database
 * @author Alex Borchers
 * @date 7/27/2024
 * @param {String} query
 * @param {Array|null} params
 * @param {Boolean} debug
 * @returns
 */
async function executeQuery(query, params = [], debug = false) {
  try {
    // Create a connection pool
    const pool = mysql.createPool(config);

    // Get a promise wrapped connection from the pool
    const connection = pool.promise();

    if (debug) {
      console.log("Executing Query:", query);
      console.log("With Parameters:", params);
    }

    // Execute the query
    const [results, fields] = await connection.execute(query, params);

    // Return the results
    return results;
  } catch (err) {
    // Log error
    console.error("------------------START------------------");
    console.error("Query:", query);
    if (params) {
      console.error("Parameters:", params);
    }
    console.error("Error:", err.message);
    console.error("Stack Trace:", err.stack);
    console.error("------------------END------------------");
    throw err;
  }
}

// Export function to execute queries
module.exports = {
  executeQuery,
};
