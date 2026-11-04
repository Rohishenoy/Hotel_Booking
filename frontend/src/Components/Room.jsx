import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { host } from "../Context/Host";

const fallbackImage = "/images/room1.jpg";
const today = new Date().toLocaleDateString("en-CA");

const getRoomImage = (room) => {
  if (room.image) {
    if (/^https?:\/\//i.test(room.image) || room.image.startsWith("data:")) return room.image;
    if (room.image.startsWith("/")) return room.image;
    return `${host}/image/${room.image}`;
  }

  const roomType = room.roomtype?.toLowerCase() || "";
  if (roomType.includes("double")) return "/images/room2.jpg";
  if (roomType.includes("deluxe")) return "/images/room3.jpg";
  if (roomType.includes("family")) return "/images/room4.jpg";
  if (roomType.includes("premium")) return "/images/room5.jpg";
  if (roomType.includes("suite")) return "/images/room6.jpg";
  return fallbackImage;
};

const getRoomStatus = (status) => {
  if (status === "booked") return { label: "Occupied · Booked", color: "error" };
  if (status === "available") return { label: "Available", color: "success" };
  return { label: "Unavailable", color: "default" };
};

export default function Room() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const hotels = [...new Map(
    rooms
      .filter((room) => room.hotel?._id && room.hotel?.hotelname)
      .map((room) => [room.hotel._id, room.hotel.hotelname])
  )].map(([id, name]) => ({ id, name }));
  const filteredRooms = selectedHotelId === "all"
    ? rooms
    : rooms.filter((room) => room.hotel?._id === selectedHotelId);

  useEffect(() => {
    let cancelled = false;

    const loadRooms = async () => {
      setLoading(true);
      setError("");

      try {
        const firstResponse = await axios.get(`${host}/Room/ViewRoom`, {
          params: { page: 1, limit: 100, date: today }
        });
        if (!firstResponse.data.success) {
          throw new Error(firstResponse.data.message || "Unable to load rooms");
        }

        const allRooms = firstResponse.data.allroom || [];
        const totalPages = firstResponse.data.totalpages || 1;
        const remainingPages = await Promise.all(
          Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) =>
            axios.get(`${host}/Room/ViewRoom`, {
              params: { page: index + 2, limit: 100, date: today }
            })
          )
        );

        remainingPages.forEach((response) => {
          if (!response.data.success) {
            throw new Error(response.data.message || "Unable to load all rooms");
          }
          allRooms.push(...(response.data.allroom || []));
        });

        if (!cancelled) setRooms(allRooms);
      } catch (requestError) {
        console.error("Room list loading error:", requestError);
        if (!cancelled) {
          setError(
            requestError.response?.data?.message ||
            requestError.message ||
            "Unable to load rooms"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadRooms();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRoomDetails = (room) => {
    navigate("/RoomAvailability", {
      state: {
        ...room,
        status: room.occupiedToday ? "booked" : room.status,
        title: room.roomtype,
        desc: room.description || "A comfortable room with thoughtful amenities.",
        roomNumbers: [room.roomnumber],
        image: getRoomImage(room)
      }
    });
  };

  return (
    <main className="rooms-page">
      <section className="rooms-intro">
        <p className="eyebrow">STAY HAVEN COLLECTION</p>
        <Typography component="h1" className="rooms-intro__title">
          Find your room
        </Typography>
        <p>Explore real room availability across our hotels. Booked rooms are clearly marked.</p>
      </section>

      <Container maxWidth="lg" className="rooms-container">
        {!loading && !error && rooms.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 240, mb: 3 }}>
            <InputLabel id="room-hotel-filter-label">Filter by hotel</InputLabel>
            <Select
              labelId="room-hotel-filter-label"
              id="room-hotel-filter"
              value={selectedHotelId}
              label="Filter by hotel"
              onChange={(event) => setSelectedHotelId(event.target.value)}
            >
              <MenuItem value="all">All hotels</MenuItem>
              {hotels.map((hotel) => (
                <MenuItem key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {loading && (
          <div className="room-list-message" role="status">Loading room availability…</div>
        )}

        {!loading && error && (
          <div className="room-list-message room-list-message--error" role="alert">
            <p>{error}</p>
            <Button onClick={() => window.location.reload()}>Try again</Button>
          </div>
        )}

        {!loading && !error && rooms.length === 0 && (
          <div className="room-list-message">
            No rooms have been added yet. Please check back soon.
          </div>
        )}

        {!loading && !error && filteredRooms.length > 0 && (
          <div className="room-grid">
            {filteredRooms.map((room, index) => {
              const status = getRoomStatus(
                room.occupiedToday ? "booked" : room.status
              );
              return (
                <div className="room-grid__item" key={room._id}>
                  <Card className="room-card" style={{ "--card-order": index % 12 }}>
                    <div className="room-card__image-wrap">
                      <CardMedia
                        component="img"
                        className="room-card__image"
                        image={getRoomImage(room)}
                        alt={`${room.roomtype} at ${room.hotel?.hotelname || "Stay Haven"}`}
                        onError={(event) => {
                          if (!event.currentTarget.dataset.fallbackApplied) {
                            event.currentTarget.dataset.fallbackApplied = "true";
                            event.currentTarget.src = fallbackImage;
                          }
                        }}
                      />
                      <span className="room-card__badge">Room {room.roomnumber}</span>
                    </div>
                    <CardContent className="room-card__content">
                      <div className="room-card__heading">
                        <Typography component="h2" className="room-card__title">
                          {room.roomtype}
                        </Typography>
                        <Chip
                          size="small"
                          color={status.color}
                          label={status.label}
                          aria-label={`Room ${room.roomnumber} status: ${status.label}`}
                        />
                      </div>
                      <Typography className="room-card__description">
                        {room.hotel?.hotelname || "Hotel details unavailable"}
                        {room.capacity ? ` · Up to ${room.capacity} guests` : ""}
                      </Typography>
                      <div className="room-card__bottom">
                        <p className="room-card__price">
                          <strong>₹{room.price}</strong> <span>/ night</span>
                        </p>
                        <Button
                          className="room-card__button"
                          variant="contained"
                          onClick={() => handleRoomDetails(room)}
                        >
                          Room details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
        {!loading && !error && rooms.length > 0 && filteredRooms.length === 0 && (
          <div className="room-list-message">
            No rooms are listed for this hotel.
          </div>
        )}
      </Container>
    </main>
  );
}
