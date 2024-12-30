import React, { useState, useEffect } from "react";
import dailyLineService from "../services/daily_lines";
import CircularProgress from "@mui/material/CircularProgress";
import DailyLines from "./DailyLines";
import Alert from "@mui/material/Alert";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// Parent Component to display daily lines
const DailyLinesSearch = () => {
  // Set state of daily lines & fetch daily lines from API
  const [allLines, setAllLines] = useState(null);
  const [dailyLines, setDailyLines] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sportType, setSportType] = useState("");
  const [team, setTeam] = useState("");

  useEffect(() => {
    fetchDailyLines();
  }, []);

  const fetchDailyLines = async () => {
    const response = await dailyLineService.getAll();
    setAllLines(response.data);
    setDailyLines(response.data);
  };

  // Handle search
  const handleSearch = () => {
    let filteredLines = allLines;

    if (startDate && endDate) {
      filteredLines = filteredLines.filter(
        (line) =>
          new Date(line.commence_time) >= new Date(startDate) &&
          new Date(line.commence_time) <= new Date(endDate)
      );
    }

    if (sportType) {
      filteredLines = filteredLines.filter(
        (line) => line.sport_type === sportType
      );
    }

    if (team) {
      filteredLines = filteredLines.filter(
        (line) =>
          line.home_team.toLowerCase().includes(team.toLowerCase()) ||
          line.away_team.toLowerCase().includes(team.toLowerCase())
      );
    }

    setDailyLines(filteredLines);
  };

  // Handle loading state
  if (!dailyLines || !allLines) {
    return <CircularProgress />;
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Sport Type</InputLabel>
        <Select
          value={sportType}
          onChange={(e) => setSportType(e.target.value)}
        >
          <MenuItem value="NFL">NFL</MenuItem>
          <MenuItem value="NCAA">NCAA</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        fullWidth
      >
        Search
      </Button>
      {dailyLines.length === 0 && (
        <Alert severity="info" variant="outlined">
          No games match your search criteria.
        </Alert>
      )}
      {dailyLines.length > 0 && <DailyLines dailyLines={dailyLines} />}
    </div>
  );
};

export default DailyLinesSearch;
