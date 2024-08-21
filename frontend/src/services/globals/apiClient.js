/****************
 * Author: Alex Borchers
 * Date Created: 8/15/2024
 *
 * Purpose:
 * Central location to connect the app to the backend API
 *****************/
// Load in dependencies
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "https://baller-bets.onrender.com/",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bb_token");
    if (token) {
      // Decode token using atob() function
      console.log(token);
      const decodedToken = atob(token);
      config.headers.Authorization = `Bearer ${decodedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
