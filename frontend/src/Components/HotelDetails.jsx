import React, { useEffect, useState } from "react";
import axios from "axios";

import {useParams,useLocation,useNavigate} from "react-router-dom";
import {Container,Card,CardContent,CardMedia,Typography,Button,Grid} from "@mui/material";
import { host } from "../Context/Host";

export default function HotelDetails() {

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingInProgress, setBookingInProgress] = useState(false);


  useEffect(() => {

    const getHotelDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const [hotelResponse, roomResponse] = await Promise.all([
          axios.get(`${host}/Hotel/GetHotelById/${id}`),
          axios.get(`${host}/Room/ViewRoomByHotel/${id}`)
        ]);

        if (!hotelResponse.data.success) {
          throw new Error(hotelResponse.data.message || "Unable to load hotel");
        }
        if (!roomResponse.data.success) {
          throw new Error(roomResponse.data.message || "Unable to load rooms");
        }

        setHotel(hotelResponse.data.hotel);
        setRooms(roomResponse.data.rooms);
      } catch (requestError) {
        console.error("Hotel detail loading error:", requestError);
        setError(
          requestError.response?.data?.message ||
          requestError.message ||
          "Unable to load hotel details"
        );
      } finally {
        setLoading(false);
      }
    };

    getHotelDetails();
  }, [id]);


  const bookRoom = async (room) => {
    const userId = localStorage.getItem("UserId");

    if (!userId) {
      alert("Please log in to complete your booking.");
      navigate("/Login", {
        state: {
          returnTo: {
            pathname: location.pathname,
            state: bookingData
          }
        }
      });
      return;
    }

    setBookingError("");
    setBookingInProgress(true);

    try {
      const response = await axios.post(`${host}/Booking/AddBooking`, {
        userId,
        hotel: hotel._id,
        roomId: room._id,
        location: hotel.location?.location || bookingData?.location,
        arrival: bookingData?.arrival,
        departure: bookingData?.departure,
        rooms: bookingData?.rooms,
        adults: bookingData?.adults,
        children: bookingData?.children
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Unable to create booking");
      }

      navigate("/booking", {
        state: {
          ...response.data.booking,
          location: hotel.location?.location || bookingData?.location,
          hotel,
          room
        }
      });
    } catch (requestError) {
      console.error("Booking error:", requestError);
      setBookingError(
        requestError.response?.data?.message ||
        requestError.message ||
        "Booking failed. Please try again."
      );
    } finally {
      setBookingInProgress(false);
    }

  };


  return (

    <Container sx={{ marginTop: 4 }}>

      {loading && (
        <Typography sx={{ mb: 2 }}>
          Loading hotel and available rooms...
        </Typography>
      )}

      {error && (
        <Typography role="alert" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* HOTEL DETAILS */}

      {hotel && (

        <Card sx={{ marginBottom: 5 }}>

          <CardMedia
            component="img"
            height="300"width="100"
            image={hotel.image}
            alt={hotel.hotelname}
          />

          <CardContent>

            <Typography
              variant="h3"
              fontWeight="bold"
              color="#8B5E3C"
            >
              {hotel.hotelname}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              {hotel.description}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Address: {hotel.address}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Phone: {hotel.phone}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Email: {hotel.email}
            </Typography>

          </CardContent>

        </Card>

      )}


      {/* ROOMS */}

      <Typography
        variant="h4"
        marginBottom={3}
        fontWeight="bold"
      >
        Available Rooms
      </Typography>


      <Grid container spacing={3}>

        {rooms
          .filter((room) => room.status === "available")
          .map((room) => (

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={room._id}
            >

              <Card>

                <CardMedia
                  component="img"
                  height="200"width={100}
                  image={room.image}
                  alt={room.roomtype}
                />

                <CardContent>

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >
                    {room.roomtype}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    ₹{room.price} / night
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    Capacity: {room.capacity}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    {room.description}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2,
                      color: "green",
                      fontWeight: "bold"
                    }}
                  >
                    Available
                  </Typography>

                  <Button
                    variant="contained"
                    disabled={bookingInProgress}
                    sx={{
                      marginTop: 2,
                      backgroundColor: "#8B5E3C"
                    }}
                    onClick={() => bookRoom(room)}
                  >
                    {bookingInProgress ? "Booking..." : "Book Now"}
                  </Button>

                </CardContent>

              </Card>

            </Grid>

          ))}

      </Grid>

      {bookingError && (
        <Typography role="alert" color="error" sx={{ mt: 3 }}>
          {bookingError}
        </Typography>
      )}

      {!loading && !error && rooms.filter(
        (room) => room.status === "available"
      ).length === 0 && (

        <Typography sx={{ mt: 3 }}>
          No rooms available for this hotel.

        </Typography>

      )}

    </Container>

  );
}