import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import usersService from "../services/users";

const UserSettings = () => {
  const [settings, setSettings] = useState({
    email: "",
    password: "",
    notifications: false,
  });

  useEffect(() => {
    const fetchUserSettings = async () => {
      const userSettings = await usersService.getSettings();
      setSettings(userSettings);
    };
    fetchUserSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await usersService.updateSettings(settings);
    // Show success message
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          User Settings
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            value={settings.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="New Password"
            type="password"
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserSettings;
