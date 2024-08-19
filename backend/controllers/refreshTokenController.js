/****************
 * Author: Alex Borchers
 * Date Created: 11/6/2023
 * Adapted From: https://www.youtube.com/watch?v=f2EqECiTBL8 CH 11
 *
 * Purpose:
 * Define function to handle refreshing access tokens given a refresh token
 *****************/
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getUserByRefreshToken } = require("../services/usr/users");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.sendStatus(401); // Unauthorized
  }
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  // Check if user exists
  const foundUser = await getUserByRefreshToken(refreshToken);
  console.log(foundUser);
  if (!foundUser) {
    return res.sendStatus(403); // Forbidden
  }

  // Evaluate JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    // Verify no error and the user id matches the decoded id (has not been tampered with)
    if (err || foundUser.id !== decoded.id) return res.sendStatus(403); // Forbidden
    const accessToken = jwt.sign(
      { id: foundUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    // res.json({ accessToken });
    res.json({ accessToken: accessToken, user: JSON.stringify(foundUser) });
  });
};

module.exports = { handleRefreshToken };
