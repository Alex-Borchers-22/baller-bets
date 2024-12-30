import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import betsService from "../services/betsService";

const BettingMarket = () => {
  const [openBets, setOpenBets] = useState([]);

  useEffect(() => {
    fetchOpenBets();
  }, []);

  const fetchOpenBets = async () => {
    const bets = await betsService.get();
    setOpenBets(bets.filter((bet) => !bet.user_accepted_id));
  };

  const handleAcceptBet = async (betId) => {
    const userId = JSON.parse(localStorage.getItem("bb_user")).id;
    await betsService.update(betId, {
      user_accepted_id: userId,
      time_accepted: new Date().toISOString(),
    });
    fetchOpenBets();
  };

  return (
    <div>
      <Typography variant="h4" component="div">
        Betting Market
      </Typography>
      {openBets.map((bet) => (
        <Card key={bet.id} sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6">Game: {bet.game_id}</Typography>
            <Typography>Amount: ${bet.bet_amount}</Typography>
            <Typography>Placed by: {bet.user_placed_id}</Typography>
            <Typography>
              Placed at: {new Date(bet.time_placed).toLocaleString()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAcceptBet(bet.id)}
            >
              Accept Bet
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BettingMarket;
