import React, { useEffect, useState } from "react";
import axios from "axios";
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
    Box
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
            const res = await axios.get(`${host}/Room/ViewRoom`, {
                params: {
                    page: currentPage,
                    limit: limit
                }
            });

            if (res.data.success) {
                setRooms(res.data.allroom || []);
                setTotalPages(res.data.totalpages || 1);
            } else {
                setRooms([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.log(error);
            setRooms([]);
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
            const res = await axios.delete(`${host}/Room/DeleteRoom/${id}`);

            if (res.data.success) {
                alert("Room deleted successfully");
                getRooms();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f3f4f6",
                px: 3,
                py: 3,
                fontFamily: "Segoe UI, sans-serif"
            }}
        >
            <Container maxWidth="xl" sx={{ px: 0 }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: "2.3rem", md: "4rem" },
                        fontWeight: 300,
                        color: "#2d3748",
                        letterSpacing: "-0.04em",
                        mb: 3,
                        lineHeight: 1.2,
                        fontFamily: "Segoe UI, sans-serif"
                    }}
                >
                    Manage Room
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        mb: 3,
                        background: "linear-gradient(135deg, #1f8fe5 0%, #0d6fb8 100%)",
                        borderRadius: "8px",
                        px: 3,
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        boxShadow: "none",
                        '&:hover': {
                            background: "linear-gradient(135deg, #147ad2 0%, #0c5e9d 100%)",
                        }
                    }}
                    onClick={() => navigate("/AddRoom")}
                >
                    Add Room
                </Button>

                <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                        border: "1px solid #dfe3e8",
                        borderRadius: "10px",
                        overflow: "hidden",
                        backgroundColor: "#f5f5f5",
                        boxShadow: "none"
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f2f2f2" }}>
                                <TableCell sx={{ fontWeight: 600, color: "#3a3a3a", py: 2, fontSize: "1rem" }}>Hotel</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: "#3a3a3a", py: 2, fontSize: "1rem" }}>Room No</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: "#3a3a3a", py: 2, fontSize: "1rem" }}>Room Type</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: "#3a3a3a", py: 2, fontSize: "1rem" }}>Price</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: "#3a3a3a", py: 2, fontSize: "1rem" }}>Capacity</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: "#3a3a3a", py: 2, fontSize: "1rem" }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: "#3a3a3a", py: 2, fontSize: "1rem" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rooms.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} sx={{ py: 5, textAlign: "center", color: "#6b7280" }}>
                                        No rooms available.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rooms.map((room) => (
                                    <TableRow key={room._id} sx={{ backgroundColor: "#f9fafb" }}>
                                        <TableCell>{room.hotel?.hotelname || "-"}</TableCell>
                                        <TableCell>{room.roomnumber || "-"}</TableCell>
                                        <TableCell>{room.roomtype || "-"}</TableCell>
                                        <TableCell>₹{room.price || 0}</TableCell>
                                        <TableCell>{room.capacity || 0}</TableCell>
                                        <TableCell>{room.status || "available"}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: "#3182ce",
                                                        textTransform: "none",
                                                        boxShadow: "none",
                                                        '&:hover': { backgroundColor: "#2563eb" }
                                                    }}
                                                    onClick={() => navigate(`/UpdateRoom/${room._id}`)}
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="error"
                                                    sx={{ boxShadow: "none", textTransform: "none" }}
                                                    onClick={() => deleteRoom(room._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ display: "flex", alignItems: "center", mt: 4, ml: 0, gap: 1, width: "fit-content" }}>
                    <Button
                        variant="text"
                        sx={{ minWidth: 0, color: "#4b5563", fontSize: "1.7rem", px: 1, py: 0 }}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </Button>

                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            backgroundColor: "#e5e7eb",
                            color: "#111827",
                            fontWeight: 600,
                            fontSize: "1.05rem"
                        }}
                    >
                        {currentPage}
                    </Box>

                    <Button
                        variant="text"
                        sx={{ minWidth: 0, color: "#4b5563", fontSize: "1.7rem", px: 1, py: 0 }}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage >= totalPages}
                    >
                        &gt;
                    </Button>
                </Box>

                <Box
                    sx={{
                        mt: 8,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        color: "#4b5563",
                        fontSize: "1.15rem",
                        flexWrap: "wrap",
                        gap: 2
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: "1.15rem", color: "#4b5563", mb: 0.5 }}>
                            Copyright 2026 adminHMD.
                        </Typography>
                        <Typography sx={{ fontSize: "1.15rem", color: "#4b5563" }}>
                            Developed by <Box component="span" sx={{ color: "#1bbf7a", fontWeight: 600 }}>Rohith</Box>
                        </Typography>
                    </Box>

                    <Typography sx={{ fontSize: "1.15rem", color: "#4b5563" }}>
                        Professional dashboard template.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}