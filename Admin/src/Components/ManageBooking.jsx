import React from "react";
import {useEffect,useState} from 'react'
import axios from "axios";
import Pagination from '@mui/material/Pagination';

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
    FormControl,
    Select,
    MenuItem
} from "@mui/material";
import { host } from "../Context/Host";

export default function ManageBooking() {

    const [bookings, setBookings] = useState([]);

    const [totalPages, setTotalPages] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);

    const limit = 5;

    const getBookings = async () => {

        try {

            const res = await axios.get(
                `${host}/Booking/ViewBooking`,
                {
                    params: {
                        page: currentPage,
                        limit: limit
                    }
                }
            );

            if (res.data.success) {

                setBookings(res.data.allbooking || []);

                setTotalPages(
                    res.data.totalpages || 1
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getBookings();

    }, [currentPage]);

    const deleteBooking = async (id) => {

        if (!window.confirm("Delete this booking?")) {
            return;
        }

        try {

            const res = await axios.delete(
                `${host}/Booking/DeleteBooking/${id}`
            );

            if (res.data.success) {

                alert("Booking deleted successfully");

                getBookings();

            }

        } catch (error) {

            console.log(error);

        }

    };

    const updateBookingStatus = async (id, bookingStatus) => {
        try {
            const res = await axios.put(
                `${host}/Booking/UpdateBookingStatus/${id}`,
                { bookingStatus }
            );

            if (res.data.success) {
                setBookings((currentBookings) =>
                    currentBookings.map((booking) =>
                        booking._id === id
                            ? { ...booking, bookingStatus: res.data.booking.bookingStatus }
                            : booking
                    )
                );
            }
        } catch (error) {
            console.error("Booking status update failed:", error);
            alert(error.response?.data?.message || "Unable to update booking status");
        }
    };

    return (

        <Container sx={{ mt: 4 }}>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Manage Booking
            </Typography>

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>User</TableCell>

                            <TableCell>Location</TableCell>

                            <TableCell>Arrival</TableCell>

                            <TableCell>Departure</TableCell>

                            <TableCell>Room Type</TableCell>

                            <TableCell>Rooms</TableCell>

                            <TableCell>Adults</TableCell>

                            <TableCell>Total</TableCell>

                            <TableCell>Status</TableCell>

                            <TableCell>Action</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {bookings.map((booking) => (

                            <TableRow key={booking._id}>

                                <TableCell>
                                    {booking.user?.uname ||
                                        booking.user?.name ||
                                        booking.user}
                                </TableCell>

                                <TableCell>
                                    {booking.location}
                                </TableCell>

                                <TableCell>
                                    {booking.arrival}
                                </TableCell>

                                <TableCell>
                                    {booking.departure}
                                </TableCell>

                                <TableCell>
                                    {booking.roomType}
                                </TableCell>

                                <TableCell>
                                    {booking.rooms}
                                </TableCell>

                                <TableCell>
                                    {booking.adults}
                                </TableCell>

                                <TableCell>
                                    ₹{booking.totalAmount}
                                </TableCell>

                                <TableCell>
                                    <FormControl size="small" sx={{ minWidth: 130 }}>
                                        <Select
                                            value={booking.bookingStatus || "pending"}
                                            onChange={(event) =>
                                                updateBookingStatus(booking._id, event.target.value)
                                            }
                                            aria-label={`Booking status for ${booking._id}`}
                                        >
                                            <MenuItem value="pending">Pending</MenuItem>
                                            <MenuItem value="approved">Approved</MenuItem>
                                            <MenuItem value="rejected">Rejected</MenuItem>
                                            <MenuItem value="cancelled">Cancelled</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>

                                <TableCell>

                                    <Button
                                        color="error"
                                        variant="contained"
                                        size="small"
                                        onClick={() =>
                                            deleteBooking(
                                                booking._id
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
