import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const PathReroute = () => {
  // Get location
  const location = useLocation();
  const currentUrl = location.pathname;

  // Get user & token from local storage
  const user = localStorage.getItem("bb_user");
  const token = localStorage.getItem("bb_token");

  // Define paths to route to daily_lines
  const paths = ["/", "", "/home", "/login", "/register", "/about", "/contact"];

  // If no user or token, redirect to login
  if (user && token && paths.includes(currentUrl)) {
    return <Navigate to="/daily_lines" />;
  } else {
    return <Outlet />;
  }
};

export default PathReroute;
