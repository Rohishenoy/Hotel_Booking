import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { host } from "../Context/Host";

export default function Home() {

    const navigate = useNavigate();

    // Today's date
    const today = new Date().toISOString().split("T")[0];

    const [booking, setBooking] = useState({
        location: "",
        arrival: "",
        departure: "",
        rooms: "",
        adults: "",
        children: "0"
    });

    const [locations, setLocations] = useState([]);
    const [locationError, setLocationError] = useState("");

    useEffect(() => {
        const getLocations = async () => {
            try {
                const response = await axios.get(
                    `${host}/Location/ViewLocation?limit=100`
                );

                if (!response.data.success) {
                    throw new Error(response.data.message || "Unable to load locations");
                }

                setLocations(response.data.alllocation);
            } catch (error) {
                console.error("Location loading error:", error);
                setLocationError(
                    error.response?.data?.message ||
                    error.message ||
                    "Unable to load locations"
                );
            }
        };

        getLocations();
    }, []);


    // Handle input change
    const handleChange = (e) => {

        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });

    };


    // Search hotels for the selected stay
    const handleSubmit = (e) => {

        e.preventDefault();


        // Required field validation
        if (
            !booking.location ||
            !booking.arrival ||
            !booking.departure ||
            !booking.rooms ||
            !booking.adults
        ) {

            alert("Please fill all required fields");
            return;

        }


        // Arrival date validation
        if (booking.arrival < today) {

            alert("Arrival date cannot be before today");
            return;

        }


        // Departure date validation
        if (booking.departure <= booking.arrival) {

            alert("Departure date must be after arrival date");
            return;

        }

        const selectedLocation = locations.find(
            (location) => location._id === booking.location
        );

        if (!selectedLocation) {
            alert("Please select a valid location");
            return;
        }

        navigate("/hotels", {
            state: {
                ...booking,
                locationId: selectedLocation._id,
                location: selectedLocation.location
            }
        });

    };


    return (

        <div>

            {/* Banner */}

            <section className="banner_main">

                <div
                    id="myCarousel"
                    className="carousel slide banner"
                    data-ride="carousel"
                >

                    {/* Indicators */}

                    <ol className="carousel-indicators">

                        <li
                            data-target="#myCarousel"
                            data-slide-to="0"
                            className="active"
                        />

                        <li
                            data-target="#myCarousel"
                            data-slide-to="1"
                        />

                        <li
                            data-target="#myCarousel"
                            data-slide-to="2"
                        />

                    </ol>


                    {/* Images */}

                    <div className="carousel-inner">

                        <div className="carousel-item active">

                            <img
                                className="first-slide"
                                src="images/banner1.jpg"
                                alt="Hotel"
                            />

                        </div>


                        <div className="carousel-item">

                            <img
                                className="second-slide"
                                src="images/banner2.jpg"
                                alt="Hotel"
                            />

                        </div>


                        <div className="carousel-item">

                            <img
                                className="third-slide"
                                src="images/banner3.jpg"
                                alt="Hotel"
                            />

                        </div>

                    </div>


                    {/* Previous */}

                    <a
                        className="carousel-control-prev"
                        href="#myCarousel"
                        role="button"
                        data-slide="prev"
                    >

                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        />

                        <span className="sr-only">
                            Previous
                        </span>

                    </a>


                    {/* Next */}

                    <a
                        className="carousel-control-next"
                        href="#myCarousel"
                        role="button"
                        data-slide="next"
                    >

                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        />

                        <span className="sr-only">
                            Next
                        </span>

                    </a>

                </div>


                {/* Booking Form */}

                <div className="booking_ocline">

                    <div className="container">

                        <div className="row">

                            <div className="col-md-5">

                                <div className="book_room">

                                    <h1>
                                        Book a Room Online
                                    </h1>


                                    <form
                                        className="book_now"
                                        onSubmit={handleSubmit}
                                    >

                                        <div className="row">


                                            {/* Location */}

                                            <div className="col-md-12">

                                                <span>
                                                    Location
                                                </span>


                                                <select
                                                    className="location_book"
                                                    name="location"
                                                    value={booking.location}
                                                    onChange={handleChange}
                                                    disabled={locations.length === 0}
                                                >

                                                    <option value="">
                                                        {locations.length
                                                            ? "Select Location"
                                                            : "Loading locations..."}
                                                    </option>

                                                    {locations.map((location) => (
                                                        <option
                                                            key={location._id}
                                                            value={location._id}
                                                        >
                                                            {location.location}
                                                        </option>
                                                    ))}

                                                </select>

                                            </div>

                                            {locationError && (
                                                <div className="col-md-12" role="alert">
                                                    <span>{locationError}</span>
                                                </div>
                                            )}


                                            {/* Arrival */}

                                            <div className="col-md-6">

                                                <span>
                                                    Arrival
                                                </span>


                                                <input
                                                    className="online_book"
                                                    type="date"
                                                    name="arrival"
                                                    value={booking.arrival}
                                                    min={today}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            {/* Departure */}

                                            <div className="col-md-6">

                                                <span>
                                                    Departure
                                                </span>


                                                <input
                                                    className="online_book"
                                                    type="date"
                                                    name="departure"
                                                    value={booking.departure}
                                                    min={
                                                        booking.arrival ||
                                                        today
                                                    }
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            {/* Rooms */}

                                            <div className="col-md-6">

                                                <span>
                                                    Rooms
                                                </span>


                                                <input
                                                    className="online_book"
                                                    type="number"
                                                    name="rooms"
                                                    min="1"
                                                    placeholder="No. of rooms"
                                                    value={booking.rooms}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            {/* Adults */}

                                            <div className="col-md-6">

                                                <span>
                                                    Adults
                                                </span>


                                                <input
                                                    className="online_book"
                                                    type="number"
                                                    name="adults"
                                                    min="1"
                                                    placeholder="No. of adults"
                                                    value={booking.adults}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            {/* Children */}

                                            <div className="col-md-6">

                                                <span>
                                                    Children
                                                </span>


                                                <input
                                                    className="online_book"
                                                    type="number"
                                                    name="children"
                                                    min="0"
                                                    placeholder="No. of children"
                                                    value={booking.children}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            {/* Book Button */}
                                            <div className="col-md-12">
                                                <button type="submit"className="book_btn">Book Now</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
