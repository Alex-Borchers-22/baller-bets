import React from "react";
import GameCard from "./GameCard";

// Parent Component to display daily lines
const DailyLines = ({ dailyLines }) => {
  return (
    <div>
      {dailyLines.map((line) => (
        <div key={line.id}>
          <GameCard game={line} />
        </div>
      ))}
    </div>
  );
};

export default DailyLines;
