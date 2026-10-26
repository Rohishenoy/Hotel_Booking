
import React, { useState } from "react";
import axios from "axios";

import {
    Container,
    Typography,
    TextField,
    Button,
    Rating
} from "@mui/material";

import { host } from "../Context/Host";

export default function Review({ hotelId }) {

    const [rating, setRating] = useState(0);

    const [review, setReview] = useState("");


    const SubmitReview = async () => {

        try {

            const userId =
                localStorage.getItem("UserId");


            if (!userId) {

                alert("Please login first");

                return;
            }


            if (rating === 0) {

                alert("Please select rating");

                return;
            }


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

                alert("Review added successfully");

                setRating(0);

                setReview("");

            }

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add review"
            );
        }
    };


    return (

        <Container sx={{ mt: 5 }}>

            <Typography variant="h5">
                Give Your Rating
            </Typography>


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
                onClick={SubmitReview}
                sx={{ mt: 2 }}
            >
                Submit Review
            </Button>

        </Container>
    );
}

