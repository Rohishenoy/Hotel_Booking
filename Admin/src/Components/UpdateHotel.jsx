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

import {
    useNavigate,
    useParams
} from "react-router-dom";

import { host } from "../Context/Host";

export default function UpdateHotel() {

    const { hid } = useParams();

    const navigate = useNavigate();

    const [locations, setLocations] = useState([]);

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


    // GET LOCATIONS
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


    // GET HOTEL
    const getHotel = async () => {

        try {

            const res = await axios.get(
                `${host}/Hotel/GetHotelById/${hid}`
            );

            if (res.data.success) {

                const data = res.data.hotel;

                setHotel({

                    hotelname: data.hotelname || "",

                    location:
                        data.location?._id ||
                        data.location ||
                        "",

                    address: data.address || "",

                    description:
                        data.description || "",

                    image: data.image || "",

                    phone: data.phone || "",

                    email: data.email || "",

                    status:
                        data.status || "active"

                });

            }

        } catch (error) {

            console.log(error);

        }

    };


    // LOAD DATA
    useEffect(() => {

        getLocations();

        getHotel();

    }, [hid]);


    // HANDLE CHANGE
    const handleChange = (e) => {

        const { name, value } = e.target;

        setHotel({

            ...hotel,

            [name]: value

        });

    };


    // HANDLE IMAGE
    const handleImageChange = (e) => {

        setHotel({

            ...hotel,

            image: e.target.files[0]

        });

    };


    // UPDATE HOTEL
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!hotel.hotelname || !hotel.location) {

            alert(
                "Hotel name and location are required"
            );

            return;

        }

        try {

            const formData = new FormData();

            formData.append(
                "hotelname",
                hotel.hotelname
            );

            formData.append(
                "location",
                hotel.location
            );

            formData.append(
                "address",
                hotel.address
            );

            formData.append(
                "description",
                hotel.description
            );

            formData.append(
                "phone",
                hotel.phone
            );

            formData.append(
                "email",
                hotel.email
            );

            formData.append(
                "status",
                hotel.status
            );


            // IMAGE
            if (hotel.image instanceof File) {

                formData.append(
                    "image",
                    hotel.image
                );

            }


            const res = await axios.put(

                `${host}/Hotel/UpdateHotel/${hid}`,

                formData,

                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }

            );


            if (res.data.success) {

                alert(
                    "Hotel updated successfully"
                );

                navigate("/ManageHotel");

            }

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Hotel update failed"
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

                {/* TITLE */}

                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginBottom: 4
                    }}
                >
                    Update Hotel
                </Typography>


                {/* FORM */}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >

                    <Grid
                        container
                        spacing={3}
                    >


                        {/* HOTEL NAME */}

                        <Grid
                            item
                            xs={12}
                            md={6}size={6}
                        >

                            <TextField
                                fullWidth
                                required
                                label="Hotel Name"
                                name="hotelname"
                                value={
                                    hotel.hotelname
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </Grid>


                        {/* LOCATION */}

                        <Grid
                            item
                            xs={12}
                            md={6}size={6}
                        >

                            <TextField
                                select
                                fullWidth
                                required
                                label="Location"
                                name="location"
                                value={
                                    hotel.location
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <MenuItem value="">
                                    Select Location
                                </MenuItem>

                                {locations.map(
                                    (item) => (

                                        <MenuItem
                                            key={
                                                item._id
                                            }
                                            value={
                                                item._id
                                            }
                                        >
                                            {
                                                item.location
                                            }
                                        </MenuItem>

                                    )
                                )}

                            </TextField>

                        </Grid>


                        {/* ADDRESS */}

                        <Grid
                            item
                            xs={12}
                            md={6}size={6}
                        >

                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={
                                    hotel.address
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </Grid>


                        {/* DESCRIPTION */}

                        <Grid
                            item
                            xs={12}md={6}size={6}
                        >

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                name="description"
                                value={
                                    hotel.description
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </Grid>


                        {/* PHONE */}

                        <Grid
                            item
                            xs={12}
                            md={6}size={6}
                        >

                            <TextField
                                fullWidth
                                type="tel"
                                label="Phone"
                                name="phone"
                                value={
                                    hotel.phone
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </Grid>


                        {/* EMAIL */}

                        <Grid
                            item
                            xs={12}
                            md={6}size={6}
                        >

                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                name="email"
                                value={
                                    hotel.email
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </Grid>


                        {/* IMAGE */}

                        <Grid
                            item
                            xs={12}
                            md={6}size={6}
                        >

                            <TextField
                                fullWidth
                                type="file"
                                name="image"
                                onChange={
                                    handleImageChange
                                }
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />

                        </Grid>


                        {/* CURRENT IMAGE */}

                        <Grid
                            item
                            xs={12}
                            md={6}size={6}
                        >

                            {hotel.image &&
                                typeof hotel.image ===
                                "string" && (

                                    <Box>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                marginBottom: 1
                                            }}
                                        >
                                            Current Image
                                        </Typography>

                                        <img
                                            src={
                                                `${host}/image/${hotel.image}`
                                            }
                                            alt={
                                                hotel.hotelname
                                            }
                                            width="120"
                                            height="80"
                                            style={{
                                                objectFit:
                                                    "cover",
                                                borderRadius:
                                                    "5px"
                                            }}
                                        />

                                    </Box>

                                )}

                        </Grid>


                        {/* STATUS */}

                        <Grid
                            item
                            xs={12}
                            md={6}size={6}
                        >

                            <TextField
                                select
                                fullWidth
                                label="Status"
                                name="status"
                                value={
                                    hotel.status
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <MenuItem value="active">
                                    Active
                                </MenuItem>

                                <MenuItem value="inactive">
                                    Inactive
                                </MenuItem>

                            </TextField>

                        </Grid>


                        {/* BUTTONS */}

                        <Grid
                            item
                            xs={12}md={6}size={6}
                        >

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{
                                    marginRight: 2
                                }}
                            >
                                Update Hotel
                            </Button>


                            <Button
                                type="button"
                                variant="outlined"
                                size="large"
                                onClick={() =>
                                    navigate(
                                        "/ManageHotel"
                                    )
                                }
                            >
                                Cancel
                            </Button>

                        </Grid>

                    </Grid>

                </Box>

            </Paper>

        </Container>

    );

}