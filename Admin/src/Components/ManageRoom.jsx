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
    Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { host } from "../Context/Host";

export default function ManageRoom() {

    const navigate = useNavigate();

    const [rooms, setRooms] = useState([]);

    const [totalPages, setTotalPages] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);

    const limit = 5;

    const getRooms = async () => {

        try {

            const res = await axios.get(
                `${host}/Room/ViewRoom`,
                {
                    params: {
                        page: currentPage,
                        limit: limit
                    }
                }
            );

            if (res.data.success) {

                setRooms(res.data.allroom || []);

                setTotalPages(
                    res.data.totalpages || 1
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getRooms();

    }, [currentPage]);

    const deleteRoom = async (id) => {

        if (!window.confirm("Delete this room?")) {
            return;
        }

        try {

            const res = await axios.delete(
                `${host}/Room/DeleteRoom/${id}`
            );

            if (res.data.success) {

                alert("Room deleted successfully");

                getRooms();

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
                Manage Room
            </Typography>

            <Button
                variant="contained"
                sx={{ mb: 3 }}
                onClick={() => navigate("/AddRoom")}
            >
                Add Room
            </Button>

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>Hotel</TableCell>

                            <TableCell>Room No</TableCell>

                            <TableCell>Room Type</TableCell>

                            <TableCell>Price</TableCell>

                            <TableCell>Capacity</TableCell>

                            <TableCell>Status</TableCell>

                            <TableCell>Action</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {rooms.map((room) => (

                            <TableRow key={room._id}>

                                <TableCell>
                                    {room.hotel?.hotelname}
                                </TableCell>

                                <TableCell>
                                    {room.roomnumber}
                                </TableCell>

                                <TableCell>
                                    {room.roomtype}
                                </TableCell>

                                <TableCell>
                                    ₹{room.price}
                                </TableCell>

                                <TableCell>
                                    {room.capacity}
                                </TableCell>

                                <TableCell>
                                    {room.status}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{ mr: 1 }}
                                        onClick={() =>
                                            navigate(
                                                `/UpdateRoom/${room._id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() =>
                                            deleteRoom(room._id)
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