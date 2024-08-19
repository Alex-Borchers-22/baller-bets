/****************
 * Author: Alex Borchers
 * Date Created: 8/15/2024
 *
 * Purpose:
 * Handles data requests the backend API for daily_lines
 *****************/
// Load in dependencies
import createHttpService from "./globals/httpService";

// Define the endpoint for daily_lines
const endpoint = "/daily_lines";

// Define the service object
const dailyLineService = createHttpService(endpoint);

// Export the service object
export default dailyLineService;
