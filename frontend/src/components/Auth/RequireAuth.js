import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  // Get location
  const location = useLocation();
  const currentUrl = location.pathname;
  console.log(currentUrl);

  // Get user & token from local storage
  const user = localStorage.getItem("bb_user");
  const token = localStorage.getItem("bb_token");

  // If no user or token, redirect to login
  if (!user || !token) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default RequireAuth;
