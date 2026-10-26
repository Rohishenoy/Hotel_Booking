import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    MenuItem,
    Grid,
    Box
} from "@mui/material";

import { host } from "../Context/Host";

export default function AddHotel() {

    const [hotel, setHotel] = useState({
        hotelname: "",
        location: "",
        address: "",
        description: "",
        image: "",
        phone: "",
        email: "",
        status: "active"
    });

    const [locations, setLocations] = useState([]);

    // GET LOCATION
    const getLocations = async () => {

        try {

            const res = await axios.get(
                `${host}/Location/ViewLocation`
            );

            if (res.data.success) {

                setLocations(
                    res.data.alllocation || []
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getLocations();

    }, []);


    // HANDLE INPUT
    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "image") {

            setHotel({
                ...hotel,
                image: e.target.files[0]
            });

        } else {

            setHotel({
                ...hotel,
                [name]: value
            });

        }

    };


    // SUBMIT FORM
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!hotel.hotelname || !hotel.location) {

            alert("Hotel name and location are required");

            return;

        }

        try {

            const formData = new FormData();

            formData.append("hotelname", hotel.hotelname);
            formData.append("location", hotel.location);
            formData.append("address", hotel.address);
            formData.append("description", hotel.description);
            formData.append("phone", hotel.phone);
            formData.append("email", hotel.email);
            formData.append("status", hotel.status);

            if (hotel.image) {

                formData.append(
                    "image",
                    hotel.image
                );

            }

            const res = await axios.post(
                `${host}/Hotel/AddHotel`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.data.success) {

                alert("Hotel added successfully");

                setHotel({
                    hotelname: "",
                    location: "",
                    address: "",
                    description: "",
                    image: "",
                    phone: "",
                    email: "",
                    status: "active"
                });

            }

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Hotel adding failed"
            );

        }

    };


    return (

        <Container
            maxWidth="md"
            sx={{
                marginTop: 5,
                marginBottom: 5
            }}
        >

            <Paper
                elevation={4}
                sx={{
                    padding: 4
                }}
            >

                {/* FORM TITLE */}
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginBottom: 4
                    }}
                >
                    Add Hotel
                </Typography>


                {/* FORM */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >

                    <Grid container spacing={3}>

                        {/* HOTEL NAME */}
                        <Grid item xs={12} md={6}size={6}>

                            <TextField
                                fullWidth
                                required
                                label="Hotel Name"
                                name="hotelname"
                                value={hotel.hotelname}
                                onChange={handleChange}
                            />

                        </Grid>


                        {/* LOCATION */}
                        <Grid item xs={12} md={6} size={6}>

                            <TextField
                                select
                                fullWidth
                                required
                                label="Location"
                                name="location"
                                value={hotel.location}
                                onChange={handleChange}
                            >

                                <MenuItem value="">
                                    Select Location
                                </MenuItem>

                                {locations.map((item) => (

                                    <MenuItem
                                        key={item._id}
                                        value={item._id}
                                    >
                                        {item.location}
                                    </MenuItem>

                                ))}

                            </TextField>

                        </Grid>


                        {/* ADDRESS */}
                        <Grid item xs={12} size={6}>

                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={hotel.address}
                                onChange={handleChange}
                            />

                        </Grid>


                        {/* DESCRIPTION */}
                        <Grid item xs={12} size={6}>

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                name="description"
                                value={hotel.description}
                                onChange={handleChange}
                            />

                        </Grid>


                        {/* PHONE */}
                        <Grid item xs={12} md={6} size={6}>

                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                value={hotel.phone}
                                onChange={handleChange}
                            />

                        </Grid>


                        {/* EMAIL */}
                        <Grid item xs={12} md={6}size={6}>

                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={hotel.email}
                                onChange={handleChange}
                            />

                        </Grid>


                        {/* IMAGE */}
                        <Grid item xs={12} md={6}size={6}>

                            <TextField
                                fullWidth
                                type="file"
                                name="image"
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />

                        </Grid>


                        {/* STATUS */}
                        <Grid item xs={12} md={6} size={6}>

                            <TextField
                                select
                                fullWidth
                                label="Status"
                                name="status"
                                value={hotel.status}
                                onChange={handleChange}
                            >

                                <MenuItem value="active">
                                    Active
                                </MenuItem>

                                <MenuItem value="inactive">
                                    Inactive
                                </MenuItem>

                            </TextField>

                        </Grid>


                        {/* SUBMIT BUTTON */}
                        <Grid item xs={12} size={12}>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                            >
                                Add Hotel
                            </Button>

                        </Grid>

                    </Grid>

                </Box>

            </Paper>

        </Container>

    );

}

