import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

export default function RoomAvailability() {

  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state;

  if (!room) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography>
          Room details not found.
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/room")}
        >
          Back to Rooms
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 7 }}>

      <Typography
        variant="h3"
        textAlign="center"
        color="#8B5E3C"
        fontWeight="bold"
        mb={5}
      >
        Room Availability
      </Typography>

      <Card>

        <CardContent>

          <Typography
            variant="h4"
            color="#8B5E3C"
            fontWeight="bold"
          >
            {room.title}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            {room.desc}
          </Typography>

          <Typography
            fontWeight="bold"
            sx={{ mt: 3 }}
          >
            Price:
          </Typography>

          <Typography>
            {room.price}
          </Typography>

          <Typography
            fontWeight="bold"
            sx={{ mt: 3 }}
          >
            Available Rooms:
          </Typography>

          <div style={{ marginTop: "10px" }}>

            {room.roomNumbers.map((number) => (

              <Chip
                key={number}
                label={`Room ${number} - Available`}
                sx={{
                  mr: 2,
                  mb: 2
                }}
              />

            ))}

          </div>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#8B5E3C"
            }}
            onClick={() => navigate("/")}
          >
            Continue Booking
          </Button>

        </CardContent>

      </Card>

    </Container>
  );
}