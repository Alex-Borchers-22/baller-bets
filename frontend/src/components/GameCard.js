import React, { useState } from "react";
import { red, blue } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import GameCardBetSlip from "./GameCardBetSlip";

const GameCard = ({ game }) => {
  // Get first letter of word as a capital letter
  const getFirstLetter = (word) => {
    return word.charAt(0).toUpperCase();
  };

  // Get first line from bookmakers (if available)
  // type = "home_team" | "away_team"
  const getFirstLine = (game, type) => {
    const team = game[type];
    const bookmakers = game.bookmakers;
    if (bookmakers.length === 0) {
      return "+100";
    }
    const firstBookmaker = bookmakers[0];
    const markets = firstBookmaker.markets;
    const outcomes = markets[0].outcomes;
    if (outcomes[0].name === team) {
      return outcomes[0];
    } else {
      return outcomes[1];
    }
  };

  // Get price for first line
  const getPrice = (game, type) => {
    const firstLine = getFirstLine(game, type);
    return formatSpread(firstLine.price);
  };

  // Get point spread for first line
  const getPointSpread = (game, type) => {
    const firstLine = getFirstLine(game, type);
    return formatSpread(firstLine.point);
  };

  // Handles formatting the price on games
  const formatSpread = (pointSpread) => {
    if (pointSpread > 0) {
      return "+" + pointSpread;
    } else {
      return pointSpread;
    }
  };

  // Format date from UTC to local time
  const formatDate = (date) => {
    // Format as MM/DD/YYYY at HH:MM (PM|AM)
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Handle state of showing bet slip\
  const [homeOrAway, setHomeOrAway] = useState(null);

  // Set function to render card header
  const renderCardHeader = (team, type) => {
    return (
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: type === "home_team" ? red[500] : blue[700] }}
            aria-label="recipe"
          >
            {getFirstLetter(team)}
          </Avatar>
        }
        action={
          <button
            className="btn btn-primary"
            style={{ width: "4em" }}
            onClick={() => setHomeOrAway(type)}
          >
            {getPrice(game, type)}
          </button>
        }
        title={team}
        subheader={`(${getPointSpread(game, type)})`}
      />
    );
  };

  return (
    <>
      <div className="p-2">
        <Card>
          {renderCardHeader(game.home_team, "home_team")}
          {renderCardHeader(game.away_team, "away_team")}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {formatDate(game.commence_time)}
            </Typography>
          </CardContent>
        </Card>
      </div>
      {homeOrAway && (
        <GameCardBetSlip
          game={game}
          choice={homeOrAway}
          handleClose={() => {
            setHomeOrAway(null);
          }}
        />
      )}
    </>
  );
};

export default GameCard;
