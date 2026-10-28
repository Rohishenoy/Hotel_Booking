import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid
} from "@mui/material";

import { host } from "../Context/Host";

const fallbackImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80";

const getImageUrl = (image) => {
  if (!image) return fallbackImage;
  if (/^https?:\/\//i.test(image) || image.startsWith("data:")) {
    return image;
  }
  return `${host}/image/${image}`;
};

export default function Hotels() {

  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state;

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(Boolean(bookingData?.locationId));
  const [error, setError] = useState("");

  useEffect(() => {

    if (bookingData?.locationId) {
      getHotels();
    }

  }, [bookingData?.locationId]);

  const getHotels = async () => {

    try {

      const res = await axios.get(
        `${host}/Hotel/FilterHotelByLocation?location=${bookingData.locationId}`
      );

      if (!res.data.success) {
        throw new Error(res.data.message || "Unable to load hotels");
      }

      setHotels(res.data.hotels);

    } catch (error) {

      console.error("Hotel loading error:", error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to load hotels"
      );

    } finally {

      setLoading(false);

    }
  };


  const selectHotel = (hotel) => {

    navigate(`/HotelDetails/${hotel._id}`, {
      state: bookingData
    });

  };


  return (

    <Container sx={{ marginTop: 4 }}>

      <Typography
        variant="h4"
        marginBottom={3}
        fontWeight="bold"
      >
        Available Hotels in {bookingData?.location}
      </Typography>

      {!bookingData?.locationId && (
        <Typography role="alert" sx={{ mb: 2 }}>
          Search for a location and travel dates before choosing a hotel.
        </Typography>
      )}

      {loading && (
        <Typography sx={{ mb: 2 }}>
          Loading hotels...
        </Typography>
      )}

      {error && (
        <Typography role="alert" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>

        {hotels.map((hotel) => (

          <Grid item xs={12} sm={6} md={4} key={hotel._id}>

            <Card>

              <CardMedia
                component="img"
                sx={{
                  height: 160,
                  width: "100%",
                  objectFit: "contain",
                  backgroundColor: "#f5f5f5"
                }}
                image={getImageUrl(hotel.image)}
                alt={hotel.hotelname}
              />

              <CardContent>

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="#8B5E3C"
                >
                  {hotel.hotelname}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  {hotel.address}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  {hotel.description}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Phone: {hotel.phone}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#8B5E3C"
                  }}
                  onClick={() => selectHotel(hotel)}
                >
                  View Hotel & Rooms
                </Button>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>


      {!loading && !error && bookingData?.locationId && hotels.length === 0 && (

        <Typography sx={{ mt: 3 }}>
          No hotels available for this location.
        </Typography>

      )}

    </Container>

  );
}