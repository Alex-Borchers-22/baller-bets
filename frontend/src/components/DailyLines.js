import React from "react";
import GameCard from "./GameCard";

// Parent Component to display daily lines
const DailyLines = ({ dailyLines }) => {
  return (
    <div>
      <h2>Daily Lines</h2>
      {dailyLines.map((line) => (
        <div key={line.id}>
          <GameCard game={line} />
        </div>
      ))}
    </div>
  );
};

export default DailyLines;
