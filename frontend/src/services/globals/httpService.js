/****************
 * Author: Alex Borchers
 * Date Created: 8/15/2024
 *
 * Purpose:
 * Central location to connect the app to the backend API
 *****************/
// Load in dependencies
import apiClient from "./apiClient";

class HttpService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  // Get all data
  // getAll = () => apiClient.get(this.endpoint);
  getAll = async () => {
    try {
      const response = await apiClient.get(this.endpoint);
      return response;
    } catch (error) {
      if (error?.response?.status === 403) {
        // Log the user out
        logout();
      }
    }
  };

  // Get a single data by id
  // get = (id) => apiClient.get(`${this.endpoint}/${id}`);
  get = async (id) => {
    try {
      const response = await apiClient.get(`${this.endpoint}/${id}`);
      return response;
    } catch (error) {
      if ([401, 403].includes(error?.response?.status)) {
        // Log the user out
        logout();
      }
    }
  };

  // Create a new data
  // create = (data) => apiClient.post(this.endpoint, data);
  create = async (data) => {
    try {
      const response = await apiClient.post(this.endpoint, data);
      return response;
    } catch (error) {
      if (error?.response?.status === 403) {
        // Log the user out
        logout();
      }
    }
  };

  // Update an existing data
  // update = (id, data) => apiClient.put(`${this.endpoint}/${id}`, data);
  update = async (id, data) => {
    try {
      const response = await apiClient.put(`${this.endpoint}/${id}`, data);
      return response;
    } catch (error) {
      if (error?.response?.status === 403) {
        // Log the user out
        logout();
      }
    }
  };

  // Delete a data
  // delete = (id) => apiClient.delete(`${this.endpoint}/${id}`);
  delete = async (id) => {
    try {
      const response = await apiClient.delete(`${this.endpoint}/${id}`);
      return response;
    } catch (error) {
      if (error?.response?.status === 403) {
        // Log the user out
        logout();
      }
    }
  };
}

function logout() {
  // window.location.href = "/login?logout=true";
  const currentURL = window.location.href;
  const newURL = "/login?logout=true&redirect=" + currentURL;
  window.location.href = newURL;
}

// Function to create a new http service
const createHttpService = (endpoint) => new HttpService(endpoint);

// Export the service object
export default createHttpService;
