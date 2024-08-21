import React, { useEffect, useState } from "react";
import PrivateNavBar from "./PrivateNavBar";
import PublicNavBar from "./PublicNavBar";

// NavBar component
const NavBar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const localUser = localStorage.getItem("bb_user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  // If user does not exist, show public navbar
  if (!user) {
    return <PublicNavBar />;
  } else {
    return <PrivateNavBar />;
  }
};

export default NavBar;
