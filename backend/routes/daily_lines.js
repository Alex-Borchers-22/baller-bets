/****************
 * Author: Alex Borchers
 * Date Created: 8/15/2024
 *
 * Purpose:
 * API endpoints to handle client requests for [daily_lines]
 *****************/

// Load in dependencies
const express = require("express"); // To handle server routes
const router = express.Router(); // Express router object for routing requests

// Import your service here
const dailyLinesService = require("../services/daily_lines");

// =============== SERVER GET REQUESTS ======================== //

// Get all dailyLines
router.get("/", async (req, res) => {
  try {
    const dailyLines = await dailyLinesService.getRecentLine();
    res.json(dailyLines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// =============== SERVER POST REQUESTS ====================== //

// =============== SERVER PUT REQUESTS ======================= //

// =============== SERVER DELETE REQUESTS ==================== //

module.exports = router;
