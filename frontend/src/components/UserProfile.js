import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Avatar } from "@mui/material";
import usersService from "../services/users";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = await usersService.getProfile();
      setUser(userData);
    };
    fetchUserProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent>
        <Avatar
          alt={user.username}
          src={user.avatar}
          sx={{ width: 100, height: 100, margin: "0 auto" }}
        />
        <Typography variant="h5" component="div" align="center">
          {user.username}
        </Typography>
        <Typography color="text.secondary" align="center">
          {user.email}
        </Typography>
        <Typography variant="body2" align="center">
          Account Balance: ${user.balance}
        </Typography>
        <Typography variant="body2" align="center">
          Total Bets: {user.totalBets}
        </Typography>
        <Typography variant="body2" align="center">
          Win Rate: {user.winRate}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
