import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
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
    <Container className="my-bookings-page">
      <header className="my-bookings-header">
        <div>
          <p className="eyebrow">YOUR STAY, ALL IN ONE PLACE</p>
          <Typography component="h1" variant="h4">My bookings</Typography>
          <p className="my-bookings-header__description">
            Follow each reservation from request to confirmation.
          </p>
        </div>
        <Button
          className="my-bookings-refresh"
          onClick={getBookings}
          disabled={loading}
          variant="outlined"
        >
          Refresh status
        </Button>
      </header>
      <p className="my-bookings-refresh-note">Statuses refresh automatically every 30 seconds.</p>

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
        <Container className="my-bookings-loading">
          <CircularProgress />
        </Container>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="my-bookings-empty">
          <span aria-hidden="true">✦</span>
          <Typography component="h2">Your next stay starts here</Typography>
          <p>You do not have any bookings yet. Explore our rooms and find a place to unwind.</p>
          <Button variant="contained" onClick={() => navigate("/Room")}>Explore rooms</Button>
        </div>
      )}

      {!loading && bookings.map((booking) => {
        const status = statusStyles[booking.bookingStatus] || statusStyles.pending;
        const statusKey = statusStyles[booking.bookingStatus] ? booking.bookingStatus : "pending";
        const isTerminal = ["rejected", "cancelled"].includes(booking.bookingStatus);
        const statusStepLabel = booking.bookingStatus === "pending"
          ? "Pending confirmation"
          : booking.bookingStatus === "approved"
            ? "Booking confirmed"
            : booking.bookingStatus === "rejected"
              ? "Booking rejected"
              : "Booking cancelled";
        const bookingSteps = ["Booking requested", statusStepLabel];
        const activeStep = booking.bookingStatus === "pending" ? 0 : 1;

        return (
          <Card className={`my-bookings-card my-bookings-card--${statusKey}`} key={booking._id}>
            <CardContent>
              <div className="my-bookings-card__top">
                <div>
                  <p className="eyebrow">RESERVATION</p>
                  <Typography component="h2" variant="h5">
                    {booking.hotel?.hotelname || booking.roomType} booking
                  </Typography>
                  <Typography className="my-bookings-reference" color="text.secondary">
                    Reference · {booking._id}
                  </Typography>
                  {booking.room?.roomnumber && (
                    <Typography className="my-bookings-room" color="text.secondary">
                      Room {booking.room.roomnumber} · {booking.room.roomtype}
                    </Typography>
                  )}
                </div>
                <Chip
                  className={`my-bookings-status my-bookings-status--${statusKey}`}
                  label={status.label}
                />
              </div>

              <Stepper className="my-bookings-stepper" activeStep={activeStep}>
                {bookingSteps.map((step, index) => (
                  <Step key={step}>
                    <StepLabel error={isTerminal && index === activeStep}>
                      {step}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {isTerminal && (
                <Alert className="my-bookings-terminal-alert" severity="error">
                  This booking is {booking.bookingStatus}. Contact the hotel if you need help.
                </Alert>
              )}

              <Divider className="my-bookings-divider" />
              <div className="my-bookings-details">
                <div><span>LOCATION</span><strong>{booking.location}</strong></div>
                <div><span>CHECK IN</span><strong>{new Date(booking.arrival).toLocaleDateString()}</strong></div>
                <div><span>CHECK OUT</span><strong>{new Date(booking.departure).toLocaleDateString()}</strong></div>
                <div><span>ROOMS &amp; GUESTS</span><strong>{booking.rooms} room · {booking.adults} adults, {booking.children} children</strong></div>
              </div>
              <div className="my-bookings-card__footer">
                <div className="my-bookings-total">
                  <span>TOTAL STAY</span>
                  <strong>₹{booking.totalAmount}</strong>
                </div>
              {booking.bookingStatus === "approved" && booking.hotel?._id && (
                <>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/Payment", { state: booking })}
                  >
                    Continue to payment
                  </Button>
                  <Button
                    className="my-bookings-review"
                    variant="outlined"
                    onClick={() => navigate(`/Review?hotelId=${booking.hotel._id}&hotelName=${encodeURIComponent(booking.hotel.hotelname || "")}`)}
                  >
                    Write a review
                  </Button>
                </>
              )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
}
