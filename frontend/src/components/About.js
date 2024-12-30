import React from "react";
import { Typography, Card, CardContent } from "@mui/material";

const About = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="div">
          About BallerBets
        </Typography>
        <Typography variant="body1" paragraph>
          BallerBets was founded in 2023 with a mission to provide a fair,
          transparent, and exciting platform for sports betting enthusiasts.
        </Typography>
        <Typography variant="body1" paragraph>
          Our team consists of experienced professionals from the sports and
          technology industries, ensuring that we deliver the best possible
          experience for our users.
        </Typography>
        <Typography variant="body1" paragraph>
          At BallerBets, we prioritize responsible gambling and provide
          resources for our users to enjoy betting in a safe and controlled
          manner.
        </Typography>
        <Typography variant="body1">
          Join us in revolutionizing the world of sports betting!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default About;
