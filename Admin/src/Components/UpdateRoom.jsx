import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    MenuItem
} from "@mui/material";
import { host } from "../Context/Host";

export default function UpdateRoom() {

    const { rid } = useParams();

    const navigate = useNavigate();

    const [hotels, setHotels] = useState([]);

    const [room, setRoom] = useState({
        hotel: "",
        roomnumber: "",
        roomtype: "",
        price: "",
        capacity: "",
        description: "",
        image: "",
        status: "available"
    });

    useEffect(() => {

        getRoom();
        getHotels();

    }, []);

    const getRoom = async () => {

        try {

            const res = await axios.get(
                `${host}/Room/GetRoomById/${rid}`
            );

            if (res.data.success) {

                const data = res.data.room;

                setRoom({
                    hotel: data.hotel?._id || data.hotel || "",
                    roomnumber: data.roomnumber || "",
                    roomtype: data.roomtype || "",
                    price: data.price || "",
                    capacity: data.capacity || "",
                    description: data.description || "",
                    image: data.image || "",
                    status: data.status || "available"
                });

            }

        } catch (error) {

            console.log(error);

        }

    };

    const getHotels = async () => {

        try {

            const res = await axios.get(
                `${host}/Hotel/ViewHotel`,
                {
                    params: {
                        page: 1,
                        limit: 100
                    }
                }
            );

            if (res.data.success) {

                setHotels(res.data.hotels || []);

            }

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setRoom({
            ...room,
            [e.target.name]: e.target.value
        });

    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.put(
                `${host}/Room/UpdateRoom/${rid}`,
                room
            );

            if (res.data.success) {

                alert("Room updated successfully");

                navigate("/ManageRoom");

            }

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to update room"
            );

        }

    };

    return (

        <Container sx={{ mt: 4 }}>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Update Room
            </Typography>

            <TextField
                select
                fullWidth
                label="Hotel"
                name="hotel"
                value={room.hotel}
                onChange={handleChange}
                sx={{ mb: 2 }}
            >

                {hotels.map((item) => (

                    <MenuItem
                        key={item._id}
                        value={item._id}
                    >
                        {item.hotelname}
                    </MenuItem>

                ))}

            </TextField>

            <TextField
                fullWidth
                label="Room Number"
                name="roomnumber"
                value={room.roomnumber}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            <TextField
                select
                fullWidth
                label="Room Type"
                name="roomtype"
                value={room.roomtype}
                onChange={handleChange}
                sx={{ mb: 2 }}
            >

                <MenuItem value="single">
                    Single Room
                </MenuItem>

                <MenuItem value="double">
                    Double Room
                </MenuItem>

                <MenuItem value="deluxe">
                    Deluxe Room
                </MenuItem>

                <MenuItem value="suite">
                    Suite
                </MenuItem>

            </TextField>

            <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={room.price}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                type="number"
                label="Capacity"
                name="capacity"
                value={room.capacity}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={room.description}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

           

            <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={room.status}
                onChange={handleChange}
                sx={{ mb: 2 }}
            >

                <MenuItem value="available">
                    Available
                </MenuItem>

                <MenuItem value="booked">
                    Booked
                </MenuItem>

                <MenuItem value="inactive">
                    Inactive
                </MenuItem>

            </TextField>

            <Button
                variant="contained"
                onClick={handleUpdate}
            >
                Update Room
            </Button>

        </Container>

    );
}