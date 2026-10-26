import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Room() {

  const navigate = useNavigate();

  const rooms = [
    {
      image: "/images/room1.jpg",
      title: "Single Room",
      price: "₹2,000 / night",
      desc: "Comfortable room for one guest.",
      roomNumbers: ["101", "104", "105","106"]
    
    },
    {
      image: "/images/room2.jpg",
      title: "Double Room",
      price: "₹3,000 / night",
      desc: "Spacious room for two guests.",
      roomNumbers: ["201", "202", "203"]
    },
    {
      image: "/images/room3.jpg",
      title: "Deluxe Room",
      price: "₹4,000 / night",
      desc: "Premium room with modern facilities.",
      roomNumbers: ["301", "302", "303"]
    },
    {
      image: "/images/room4.jpg",
      title: "Family Room",
      price: "₹5,000 / night",
      desc: "Large room suitable for families.",
      roomNumbers: ["401", "402", "403"]
    },
    {
      image: "/images/room5.jpg",
      title: "Premium Room",
      price: "₹6,000 / night",
      desc: "Luxury room with excellent facilities.",
      roomNumbers: ["501", "502", "503"]
    },
    {
      image: "/images/room6.jpg",
      title: "Suite",
      price: "₹8,000 / night",
      desc: "Our best room for a luxury stay.",
      roomNumbers: ["601", "602", "603"]
    }
  ];

  const handleAvailability = (room) => {
    navigate("/roomavailability", {
      state: room
    });
  };

  return (
    <Container sx={{ py: 7 }}>

      <Typography
        variant="h3"
        textAlign="center"
        color="#8B5E3C"
        fontWeight="bold"
        mb={5}
      >
        Our Rooms
      </Typography>

      <Grid container spacing={3}>

        {rooms.map((room, index) => (

          <Grid item xs={12} sm={6} md={4} key={index}>

            <Card>

              <CardMedia
                component="img"
                height="220"
                image={room.image}
                alt={room.title}
              />

              <CardContent>

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="#8B5E3C"
                >
                  {room.title}
                </Typography>

                <Typography
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {room.price}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  {room.desc}
                </Typography>

                <Typography
                  fontWeight="bold"
                  sx={{ mt: 2 }}
                >
                  Available Room Numbers:
                </Typography>

                <div style={{ marginTop: "8px" }}>
                  {room.roomNumbers.map((number) => (
                    <Chip
                      key={number}
                      label={`Room ${number}`}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </div>

                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#8B5E3C"
                  }}
                  onClick={() => handleAvailability(room)}
                >
                  View Room Availability
                </Button>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Container>
  );
}