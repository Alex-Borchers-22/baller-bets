/****************
 * Author: Alex Borchers
 * Date Created: 8/15/2024
 *
 * Purpose:
 * Handles data requests the backend API for users
 *****************/
// Load in dependencies
import createHttpService from "./globals/httpService";

// Define the endpoint for users
const endpoint = "/users";

// Define the service object
const usersService = createHttpService(endpoint);

// Defince specific services
usersService.auth = (email, password) => {
  // Define the endpoint
  const authEndpoint = `${endpoint}/auth`;
  const newService = createHttpService(authEndpoint);

  // Define the data
  const data = { email, password };

  // Return the result
  return newService.create(data);
};

// Export the service object
export default usersService;
