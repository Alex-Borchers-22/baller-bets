/****************
 * Author: Alex Borchers
 * Date Created: 7/27/2024
 *
 * Purpose:
 * Define functions related to [users]
 *****************/

// Dependencies
const db = require("../configs/db");

// Get all users
async function getAllUsers() {
  const query = `SELECT * FROM users`;
  const users = await db.executeQuery(query);
  return users;
}

// Get user by id
async function getUserById(id) {
  const query = `SELECT * FROM users WHERE id = ?`;
  const users = await db.executeQuery(query, [id]);
  return users[0];
}

// Get user by email
async function getUserByEmail(email) {
  const query = `SELECT id FROM users WHERE email = ?`;
  const user = await db.executeQuery(query, [email]);
  if (user.length === 0) {
    return null;
  }
  const id = user[0].id;
  return await getUserById(id);
}

// Get user by OAuth ID
async function getUserByOAuthId(oauth_id) {
  // const query = `SELECT * FROM users WHERE oauth_id = ?`;
  // const users = await db.executeQuery(query, [oauth_id]);
  // return users[0];
  throw new Error("Not implemented");
}

// Get user by email or username
// Used to check if a user already exists
async function getUserByEmailOrUsername(email, username) {
  const query = `SELECT * FROM users WHERE email = ? OR username = ?`;
  const users = await db.executeQuery(query, [email, username]);
  return users[0];
}

// Create a new user
async function createUser(user) {
  const existingUser = await getUserByEmailOrUsername(
    user.email,
    user.username
  );
  if (existingUser) {
    throw new Error("User already exists");
  }
  const query = `INSERT INTO users (first_name, last_name, full_name, email, password, username) VALUES (?, ?, ?, ?, ?, ?)`;
  const { first_name, last_name, email, password, username } = user;
  const full_name = `${first_name} ${last_name}`;
  const result = await db.executeQuery(query, [
    first_name,
    last_name,
    full_name,
    email,
    password,
    username,
  ]);
  return result;
}

// Update a user
async function updateUser(id, user) {
  const query = `UPDATE users SET first_name = ?, last_name = ?, full_name = ?, email = ?, password = ? WHERE id = ?`;
  const { first_name, last_name, email, password } = user;
  const full_name = `${first_name} ${last_name}`;
  const result = await db.executeQuery(query, [
    first_name,
    last_name,
    full_name,
    email,
    password,
    id,
  ]);
  return result;
}

// Update a user's refresh token
async function updateRefreshToken(id, refresh_token) {
  const query = `UPDATE users SET refresh_token = ? WHERE id = ?`;
  const result = await db.executeQuery(query, [refresh_token, id]);
  return result;
}

// Update a user's provider info
async function updateProviderInfo(id, provider_info) {
  // const query = `UPDATE users SET provider_info = ? WHERE id = ?`;
  // const result = await db.executeQuery(query, [provider_info, id]);
  // return result;
  throw new Error("Not implemented");
}

// Delete a user
async function deleteUser(id) {
  const query = `DELETE FROM users WHERE id = ?`;
  const result = await db.executeQuery(query, [id]);
  return result;
}

// Other [users]-related functions can be defined here

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserByEmailOrUsername,
  getUserByOAuthId,
  getUserById,
  createUser,
  updateUser,
  updateRefreshToken,
  updateProviderInfo,
  deleteUser,
  // Define other functions here
};
