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
  const isBooked = room?.status === "booked";
  const isAvailable = room?.status === "available";
  const statusLabel = isBooked ? "Occupied · Booked" : isAvailable ? "Available" : "Unavailable";
  const roomNumbers = room?.roomNumbers || [];

  if (!room) {
    return (
      <main className="room-availability-page">
        <Container className="room-availability-content">
          <div className="room-availability-empty">
            <p className="eyebrow">STAY HAVEN ROOMS</p>
            <Typography component="h1">Room details not found</Typography>
            <Button className="room-availability-button" variant="contained" onClick={() => navigate("/Room")}>
              Back to rooms
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="room-availability-page">
      <section className="room-availability-intro">
        <p className="eyebrow">A ROOM TO CALL YOUR OWN</p>
        <Typography component="h1">Room details</Typography>
        <p>Take a closer look at the comfort waiting for you.</p>
      </section>
      <Container maxWidth="md" className="room-availability-content">
        <Card className="room-availability-card">
          <div className="room-availability-card__image">
            <img src={room.image} alt={room.title || room.roomtype || "Hotel room"} />
            <span>Stay Haven collection</span>
          </div>
          <CardContent className="room-availability-card__content">
            <div className="room-availability-card__heading">
              <div>
                <p className="eyebrow">COMFORT, THOUGHTFULLY MADE</p>
                <Typography component="h2">{room.title || room.roomtype}</Typography>
                {room.hotel?.hotelname && <p>{room.hotel.hotelname}</p>}
              </div>
              <p className="room-availability-card__price">₹{room.price}<span> / night</span></p>
            </div>
            <Typography className="room-availability-card__description">
              {room.desc || room.description || "A comfortable room with thoughtful amenities."}
            </Typography>
            <div className="room-availability-card__availability">
              <h3>Room status</h3>
              <div>
                {roomNumbers.length > 0 ? roomNumbers.map((number) => (
                  <Chip
                    key={number}
                    color={isBooked ? "error" : isAvailable ? "success" : "default"}
                    label={`Room ${number} · ${statusLabel}`}
                  />
                )) : (
                  <Chip
                    color={isBooked ? "error" : isAvailable ? "success" : "default"}
                    label={statusLabel}
                  />
                )}
              </div>
            </div>
            <Button
              className="room-availability-button"
              variant="contained"
              onClick={() => navigate("/")}
            >
              {isAvailable ? "Search dates to book" : "Search other rooms"} <span aria-hidden="true">→</span>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}