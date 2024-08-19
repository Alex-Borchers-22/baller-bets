/****************
 * Author: Joseph Oboamah
 * Date Created: 10/10/2023
 * 
 * Purpose:
 * Handles logging of all request errors to the backend api
 *****************/

function logError(req, res, next) {
  console.error(err);
  res.status(500).json({ error: "Server Error" });

  // Pass control to next middleware function in the pipeline
  next();
}

module.exports = logError;