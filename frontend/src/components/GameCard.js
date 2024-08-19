import React from "react";
import { red, blue } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
      return formatPrice(outcomes[0].price);
    } else {
      return formatPrice(outcomes[1].price);
    }
  };

  // Handles formatting the price on games
  const formatPrice = (price) => {
    if (price > 0) {
      return "+" + price;
    } else {
      return price;
    }
  };

  return (
    <div className="p-2">
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {getFirstLetter(game.home_team)}
            </Avatar>
          }
          action={
            <button className="btn btn-primary" style={{ width: "4em" }}>
              {getFirstLine(game, "home_team")}
            </button>
          }
          title={game.home_team}
        />
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[700] }} aria-label="recipe">
              {getFirstLetter(game.away_team)}
            </Avatar>
          }
          action={
            <button className="btn btn-primary" style={{ width: "4em" }}>
              {getFirstLine(game, "away_team")}
            </button>
          }
          title={game.away_team}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {game.commence_time}
          </Typography>
        </CardContent>
        {/* <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions> */}
      </Card>
    </div>
  );
};

export default GameCard;
