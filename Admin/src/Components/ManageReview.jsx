import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Rating
} from "@mui/material";
import { host } from "../Context/Host";

export default function ManageReview() {

    const [reviews, setReviews] = useState([]);

    const [totalPages, setTotalPages] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);

    const limit = 5;

    const getReviews = async () => {

        try {

            const res = await axios.get(
                `${host}/Review/ViewReview`,
                {
                    params: {
                        page: currentPage,
                        limit: limit
                    }
                }
            );

            if (res.data.success) {

                setReviews(
                    res.data.allreview || []
                );

                setTotalPages(
                    res.data.totalpages || 1
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getReviews();

    }, [currentPage]);

    const deleteReview = async (id) => {

        if (!window.confirm("Delete this review?")) {
            return;
        }

        try {

            const res = await axios.delete(
                `${host}/Review/DeleteReview/${id}`
            );

            if (res.data.success) {

                alert("Review deleted successfully");

                getReviews();

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <Container sx={{ mt: 4 }}>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Manage Review
            </Typography>

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>User</TableCell>

                            <TableCell>Hotel</TableCell>

                            <TableCell>Rating</TableCell>

                            <TableCell>Review</TableCell>

                            <TableCell>Status</TableCell>

                            <TableCell>Action</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {reviews.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No reviews have been submitted yet.
                                </TableCell>
                            </TableRow>
                        ) : reviews.map((review) => (

                            <TableRow key={review._id}>

                                <TableCell>
                                    {review.user?.name || review.user?.email || "-"}
                                </TableCell>

                                <TableCell>
                                    {review.hotel?.hotelname || "-"}
                                </TableCell>

                                <TableCell>
                                    <Rating value={Number(review.rating) || 0} readOnly size="small" />
                                </TableCell>

                                <TableCell>
                                    {review.review || "No written comment"}
                                </TableCell>

                                <TableCell>
                                    {review.status}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        color="error"
                                        variant="contained"
                                        size="small"
                                        onClick={() =>
                                            deleteReview(
                                                review._id
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) =>
                    setCurrentPage(value)
                }
                sx={{ mt: 3 }}
            />

        </Container>

    );

}