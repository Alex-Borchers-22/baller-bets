import React from "react";
import { red } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const GameCardBetSlip = ({ game, choice, handleClose }) => {
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

  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth={"md"}>
      <DialogTitle className="main_header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4>Bet Slip</h4>
          </div>
          <div>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="p-4">
          <Card className="p-2">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {getFirstLetter(game[choice])}
                </Avatar>
              }
              action={
                <>
                  {" "}
                  {/* <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Amount"
                  /> */}
                </>
              }
              title={`${game[choice]} (${getPrice(game, choice)})`}
              subheader={`(${getPointSpread(game, "home_team")})`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {game[choice]} @ {game.away_team} -{" "}
                {formatDate(game.commence_time)}
              </Typography>
            </CardContent>
          </Card>
          <div className="mt-2">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Amount"
            />
            <button className="btn btn-primary mt-2 w-100">Place Bet</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameCardBetSlip;
