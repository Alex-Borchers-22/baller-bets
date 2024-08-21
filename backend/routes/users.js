/****************
 * Author: Alex Borchers
 * Date Created: 7/27/2024
 *
 * Purpose:
 * API endpoints to handle client requests for [users]
 *****************/

// Load in dependencies
const express = require("express"); // To handle server routes
const router = express.Router(); // Express router object for routing requests

// Import your service here
const usersService = require("../services/users");
const authController = require("../controllers/authController");
const registerController = require("../controllers/registerController");

// =============== SERVER GET REQUESTS ======================== //

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// =============== SERVER POST REQUESTS ====================== //
// Check user credentials
router.post("/auth", async (req, res) => {
  try {
    return await authController.handleLogin(req, res);
    // const { email, password } = req.body;
    // console.log(email);
    // console.log(password);
    // const result = await usersService.authUser(email, password);
    // res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    return await registerController.handleNewUser(req, res);
    // const result = await usersService.createUser(req.body);
    // res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// =============== SERVER PUT REQUESTS ======================= //
// Update a user
router.put("/:id", async (req, res) => {
  try {
    const result = await usersService.updateUser(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// =============== SERVER DELETE REQUESTS ==================== //
// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const result = await usersService.deleteUser(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
