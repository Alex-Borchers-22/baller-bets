import React, { useEffect, useState } from "react";
import PrivateNavBar from "./PrivateNavBar";
import PublicNavBar from "./PublicNavBar";

// NavBar component
const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("bb_user")));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("bb_user")));
    };

    // Listen to the storage event
    window.addEventListener("storage", handleStorageChange);

    // Optional: Listen for changes within the same window
    const handleUserChange = () => {
      setUser(JSON.parse(localStorage.getItem("bb_user")));
    };
    window.addEventListener("bb_user_update", handleUserChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("bb_user_update", handleUserChange);
    };
  }, []);

  // If user does not exist, show public navbar
  if (!user) {
    return <PublicNavBar />;
  } else {
    return <PrivateNavBar />;
  }
};

export default NavBar;
