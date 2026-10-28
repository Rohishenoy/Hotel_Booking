
import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import {
    Alert,
    Container,
    Typography,
    TextField,
    Button,
    Rating
} from "@mui/material";

import { host } from "../Context/Host";

export default function Review({ hotelId: providedHotelId }) {
    const [searchParams] = useSearchParams();
    const hotelId = providedHotelId || searchParams.get("hotelId");
    const hotelName = searchParams.get("hotelName");

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const submitReview = async () => {
        setError("");
        setSuccess("");
        if (!hotelId) {
            setError("Choose a hotel from your confirmed bookings before writing a review.");
            return;
        }
        try {
            const userId =
                localStorage.getItem("UserId");
            if (!userId) {
                setError("Please log in first.");
                return;
            }
            if (rating === 0) {
                setError("Please select a rating.");
                return;
            }

            setSubmitting(true);
            const res = await axios.post(
                `${host}/Review/AddReview`,
                {
                    user: userId,
                    hotel: hotelId,
                    rating: rating,
                    review: review
                }
            );

            if (res.data.success) {
                setSuccess("Your review was submitted successfully.");
                setRating(0);
                setReview("");
            }
        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.message ||
                "Failed to add review"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h5">
                Review {hotelName || "Your Hotel"}
            </Typography>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            {!hotelId && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    Open this form from an approved booking in My Bookings.
                </Alert>
            )}
            <Rating
                value={rating}
                onChange={(event, newValue) => {

                    setRating(newValue);

                }}
                sx={{ mt: 2 }}
            />


            <TextField
                fullWidth
                multiline
                rows={4}
                label="Write your review"
                value={review}
                onChange={(e) =>
                    setReview(e.target.value)
                }
                sx={{ mt: 2 }}
            />


            <Button
                variant="contained"
                onClick={submitReview}
                disabled={submitting || !hotelId}
                sx={{ mt: 2 }}
            >
                {submitting ? "Submitting..." : "Submit Review"}
            </Button>
        </Container>
    );
}
