/****************
 * Author: Joseph Oboamah
 * Date Created: 10/09/2023
 * 
 * Purpose:
 * Handles authentication of all requests to the backend api
 *****************/

function authenticate(req, res, next) {
  // console.log(`Authenticating request to server ${req}`);

  // Pass control to next middleware function in the pipeline
  next();
}

module.exports = authenticate;