/****************
 * Author: Alex Borchers
 * Date Created: 11/6/2023
 * Adapted From: https://www.youtube.com/watch?v=f2EqECiTBL8 CH 11
 *
 * Purpose:
 * Define function to handle login, verify encrypted passwords, set access tokens
 * and refresh tokens, and send refresh token to client
 *****************/
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  getUserByEmail,
  getUserByOAuthId,
  updateRefreshToken,
  updateProviderInfo,
  getUserByEmployeeId,
} = require("../services/users");

const handleLogin = async (req, res) => {
  // If oauth_provider is set, handle oauth login
  if (req.body.oauth_provider && req.body.oauth_provider !== "") {
    return handleOAuthLogin(req, res);
  }

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
  }

  // Check if user exists
  const foundUser = await getUserByEmail(email);
  if (!foundUser) {
    // Create user @TODO
    return res.sendStatus(401);
  }

  // console.log(password, foundUser.password);
  const match = await bcrypt.compare(password, foundUser.password);
  // console.log("match: ", match);

  // If password matches, create JWT tokens
  if (match) {
    // Create JWT tokens and send to client
    createTokens(foundUser, res);
  } else {
    return res.sendStatus(401);
  }
};

// Handles Pin user login
const handlePinLogin = async (req, res) => {
  try {
    const employee_id = req.body.employee_id;
    const pin = req.body.pin;
    const foundUser = await getUserByEmployeeId(employee_id);
    if (!foundUser || !pin) {
      return res.sendStatus(401);
    }
    const hashedPin = await bcrypt.hash(pin, 10);
    // console.log(pin, foundUser.pin, hashedPin);
    const match = await bcrypt.compare(pin, foundUser.pin);
    if (match) {
      createTokens(foundUser, res);
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

const handleOAuthLogin = async (req, res) => {
  // Verify we have all required fields (oauth_uid)
  const { oauth_uid, oauth_provider } = req.body;
  if (!oauth_uid) {
    return res.sendStatus(400); // Bad request
  }

  // Check if user exists for providers
  let foundUser = await getUserByOAuthId(oauth_provider, oauth_uid);
  if (!foundUser) {
    // Get user by email, if found, update user with provider info
    const email = req.body.email;
    if (!email) {
      return res.sendStatus(401);
    }
    foundUser = await getUserByEmail(email);
    if (!foundUser) {
      return res.sendStatus(401);
    }
  }

  // Update user info based on provider info
  await updateProviderInfo(foundUser.id, req.body);

  // Create JWT tokens and send to client
  createTokens(foundUser, res);
};

// Handles creating access Token & Refresh Token for user
const createTokens = async (user, res) => {
  // Create JWT tokens and send to client
  const accessToken = jwt.sign(
    { id: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Store refresh token in database
  await updateRefreshToken(user.id, refreshToken);
  // console.log("refreshToken: ", refreshToken);
  // console.log("user: ", user);
  // console.log("accessToken: ", accessToken);

  // Get Tenant Info
  const tenantInfo = await getTenantInfo();
  // console.log("tenantInfo: ", tenantInfo);

  // Send refresh back (set for 1 day)
  // MUST set to httpOnly to prevent XSS attacks
  //res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });

  // Add db instance to cookie
  // const dbInstance = "fst_dev_migrate";

  // res.cookie("INSTDB", dbInstance, {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 * 24,
  // });

  // Only return certain fields to client
  const userAbv = {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    picture: user.picture,
    first_name: user.first_name,
    last_name: user.last_name,
    flg_financial: user.flg_financial,
    flg_action: user.flg_action,
    flg_edit: user.flg_edit,
  };
  // res.json({ accessToken: accessToken, user: JSON.stringify(userAbv) });
  res.json({
    accessToken: accessToken,
    user: JSON.stringify(user),
    company: JSON.stringify(tenantInfo),
  });
};

module.exports = { handleLogin, handlePinLogin, createTokens };
