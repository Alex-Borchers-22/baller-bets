/****************
 * Author: Joseph Oboamah
 * Date Created: 10/09/2023
 * 
 * Purpose:
 * Handles logging of all requests to the backend api
 *****************/

function log(req, res, next) {
  // console.log(`Logging request to server ${req}`);

  // Pass control to next middleware function in the pipeline
  next();
}

module.exports = log;