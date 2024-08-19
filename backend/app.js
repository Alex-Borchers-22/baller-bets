// Register module/require aliases
require("module-alias/register");

// Patches
const { inject, errorHandler } = require("express-custom-error");
inject(); // Patch express in order to use async / await syntax

// Require Dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const credentials = require("@middleware/credentials");
const cors = require("cors");
const corsOptions = require("@configs/corsOptions");
const helmet = require("helmet");

// Import Custom Middleware
const logger = require("@util/logger");

// Import files to be ran on start
const { updateLines, getSports } = require("@services/daily_lines");

// Load .env Enviroment Variables to process.env
// Require certain environment variables to be set
require("mandatoryenv").load([
  "DB_HOST",
  "DB_DATABASE",
  "DB_USER",
  "DB_PASSWORD",
  "PORT",
  "SECRET",
]);

// Get the PORT from the environment variables
const { PORT } = process.env;

// Instantiate an Express Application
const app = express();

// Configure Express App Instance
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

// Middleware for credentials (must be before cors)
app.use(credentials);

app.use(cors(corsOptions));
app.use(helmet());

// Middleware for cookies
app.use(cookieParser());

// This middleware adds the json header to every response
app.use("*", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Assign Routes
app.use("/users", require("@routes/users.js"));
app.use("/daily_lines", require("@routes/daily_lines.js"));

// Handle errors
app.use(errorHandler());

// Handle not valid route
app.use("*", (req, res) => {
  res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// Open Server on selected Port
app.listen(PORT, () => console.info("Server listening on port ", PORT));

// Run the update lines function
updateLines();
// getSports();
