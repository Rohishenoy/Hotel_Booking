import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { host } from "../Context/Host";

const statusStyles = {
  pending: { label: "Pending confirmation", background: "#fff4e5", color: "#9a5b00" },
  approved: { label: "Confirmed", background: "#e6f4ea", color: "#1b5e20" },
  rejected: { label: "Rejected", background: "#fdecea", color: "#b3261e" },
  cancelled: { label: "Cancelled", background: "#f1f3f4", color: "#5f6368" }
};

const bookingSteps = ["Booking requested", "Booking confirmed"];

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getBookings = useCallback(async () => {
    const userId = localStorage.getItem("UserId");

    if (!userId) {
      setError("Please log in to track your bookings.");
      setBookings([]);
      setLoading(false);
      return;
    }

    try {
      setError("");
      const res = await axios.get(`${host}/Booking/ViewBookingByUser/${userId}`);

      if (!res.data.success) {
        throw new Error(res.data.message || "Unable to load bookings");
      }

      setBookings(res.data.bookings || []);
    } catch (requestError) {
      console.error("Booking tracking error:", requestError);
      setError(
        requestError.response?.data?.message ||
        requestError.message ||
        "Unable to load bookings"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBookings();
    const refreshInterval = window.setInterval(getBookings, 30000);
    return () => window.clearInterval(refreshInterval);
  }, [getBookings]);

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h4" fontWeight="bold">
          Track My Bookings
        </Typography>
        <Button onClick={getBookings} disabled={loading}>
          Refresh status
        </Button>
      </Box>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Booking statuses refresh automatically every 30 seconds.
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={getBookings}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {loading && (
        <Container sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Container>
      )}

      {!loading && !error && bookings.length === 0 && (
        <Alert severity="info">You do not have any bookings to track yet.</Alert>
      )}

      {!loading && bookings.map((booking) => {
        const status = statusStyles[booking.bookingStatus] || statusStyles.pending;
        const isTerminal = ["rejected", "cancelled"].includes(booking.bookingStatus);
        const activeStep = booking.bookingStatus === "approved" ? bookingSteps.length : 0;

        return (
          <Card key={booking._id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                {booking.hotel?.hotelname || booking.roomType} booking
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                Booking reference: {booking._id}
              </Typography>

              <Chip
                label={status.label}
                sx={{
                  mt: 2,
                  backgroundColor: status.background,
                  color: status.color,
                  fontWeight: "bold"
                }}
              />

              {!isTerminal ? (
                <Stepper activeStep={activeStep} sx={{ mt: 3, mb: 3 }}>
                  {bookingSteps.map((step) => (
                    <Step key={step}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              ) : (
                <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                  This booking is {booking.bookingStatus}. Contact the hotel if you need help.
                </Alert>
              )}

              <Divider sx={{ mb: 2 }} />
              <Typography>Location: {booking.location}</Typography>
              <Typography>
                Arrival: {new Date(booking.arrival).toLocaleDateString()}
              </Typography>
              <Typography>
                Departure: {new Date(booking.departure).toLocaleDateString()}
              </Typography>
              <Typography>Rooms: {booking.rooms}</Typography>
              <Typography>Guests: {booking.adults} adults, {booking.children} children</Typography>
              <Typography sx={{ mt: 1 }} fontWeight="bold">
                Total: ₹{booking.totalAmount}
              </Typography>
              {booking.bookingStatus === "approved" && booking.hotel?._id && (
                <Button
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "#8B5E3C" }}
                  onClick={() => navigate(`/Review?hotelId=${booking.hotel._id}&hotelName=${encodeURIComponent(booking.hotel.hotelname || "")}`)}
                >
                  Write a review
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
}
