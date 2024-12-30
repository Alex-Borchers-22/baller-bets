import React from "react";
import { Typography, Card, CardContent } from "@mui/material";

const Home = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="div">
          Welcome to BallerBets
        </Typography>
        <Typography variant="body1" paragraph>
          BallerBets is your premier destination for sports betting. We offer a
          wide range of betting options for NFL and NCAA games.
        </Typography>
        <Typography variant="body1" paragraph>
          Join our community of sports enthusiasts and put your knowledge to the
          test. With competitive odds and a user-friendly platform, BallerBets
          makes sports betting accessible and exciting for everyone.
        </Typography>
        <Typography variant="body1">
          Sign up now and receive a welcome bonus on your first deposit!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Home;
