import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import { host } from "../Context/Host";

export default function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {

    try {

      const token = JSON.parse(
        localStorage.getItem("UserToken")
      );

      const userId =
        token?.userId || token?._id;

      if (!userId) {
        return;
      }

      const res = await axios.get(
        `${host}/Booking/ViewBookingByUser/${userId}`
      );

      if (res.data.success) {
        setBookings(res.data.data);
      }

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>

      <Typography
        variant="h4"
        marginBottom={3}
      >
        My Bookings
      </Typography>

      {bookings.map((booking) => (

        <Card
          key={booking._id}
          sx={{ marginBottom: 3 }}
        >

          <CardContent>

            <Typography variant="h5">
              {booking.roomType}
            </Typography>

            <Typography>
              Location: {booking.location}
            </Typography>

            <Typography>
              Arrival: {booking.arrival}
            </Typography>

            <Typography>
              Departure: {booking.departure}
            </Typography>

            <Typography>
              Rooms: {booking.rooms}
            </Typography>

            <Typography>
              Adults: {booking.adults}
            </Typography>

            <Typography>
              Total: ₹{booking.totalAmount}
            </Typography>

            <Typography
              variant="h6"
              sx={{ marginTop: 2 }}
            >
              Status: {booking.bookingStatus}
            </Typography>

          </CardContent>

        </Card>

      ))}

      {bookings.length === 0 && (
        <Typography>
          No bookings found.
        </Typography>
      )}

    </Container>
  );
}