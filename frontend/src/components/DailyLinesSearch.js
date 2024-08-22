import React, { useState, useEffect } from "react";
import dailyLineService from "../services/daily_lines";
import CircularProgress from "@mui/material/CircularProgress";
import DailyLines from "./DailyLines";
import Alert from "@mui/material/Alert";

// Parent Component to display daily lines
const DailyLinesSearch = () => {
  // Set state of daily lines & fetch daily lines from API
  const [allLines, setAllLines] = useState(null);
  const [dailyLines, setDailyLines] = useState(null);
  useEffect(() => {
    fetchDailyLines();
  }, []);
  const fetchDailyLines = async () => {
    const response = await dailyLineService.getAll();
    console.log(response.data);
    setAllLines(response.data);
    setDailyLines(response.data);
  };

  // Handle search
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search === "") {
      setDailyLines(allLines);
    } else {
      const filteredLines = allLines.filter((line) =>
        line.game.toLowerCase().includes(search.toLowerCase())
      );
      setDailyLines(filteredLines);
    }
  };

  // Handle loading state
  if (!dailyLines || !allLines) {
    return <CircularProgress />;
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
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
