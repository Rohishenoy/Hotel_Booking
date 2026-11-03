import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { host } from "../Context/Host";

const today = new Date().toLocaleDateString("en-CA");

const experiences = [
  {
    image: "/images/room-1.jpg",
    category: "REST & RECHARGE",
    title: "Rooms made for slowing down",
    description: "Thoughtful details, soft linens, and space to make yourself at home."
  },
  {
    image: "/images/about-img2.jpg",
    category: "A PLACE TO UNWIND",
    title: "A little escape, any day",
    description: "Find your own corner of calm, whether you’re away for a night or a week."
  },
  {
    image: "/images/room-3.jpg",
    category: "THE STAY YOU DESERVE",
    title: "Comfort in every detail",
    description: "Warm hospitality and considered comforts from check-in to checkout."
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    location: "",
    arrival: "",
    departure: "",
    rooms: "1",
    adults: "2",
    children: "0"
  });
  const [locations, setLocations] = useState([]);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.get(`${host}/Location/ViewLocation?limit=100`);
        if (!response.data.success) {
          throw new Error(response.data.message || "Unable to load locations");
        }
        setLocations(response.data.alllocation || []);
      } catch (error) {
        console.error("Location loading error:", error);
        setLocationError(
          error.response?.data?.message || error.message || "Unable to load locations"
        );
      }
    };

    getLocations();
  }, []);

  const handleChange = (event) => {
    setBooking((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!booking.location || !booking.arrival || !booking.departure || !booking.rooms || !booking.adults) {
      setLocationError("Choose a destination, dates, and guest count to search.");
      return;
    }
    if (booking.arrival < today) {
      setLocationError("Arrival date cannot be before today.");
      return;
    }
    if (booking.departure <= booking.arrival) {
      setLocationError("Departure date must be after arrival date.");
      return;
    }

    const selectedLocation = locations.find((location) => location._id === booking.location);
    if (!selectedLocation) {
      setLocationError("Please select a valid destination.");
      return;
    }

    setLocationError("");
    navigate("/hotels", {
      state: {
        ...booking,
        locationId: selectedLocation._id,
        location: selectedLocation.location
      }
    });
  };

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="eyebrow">A WARM WELCOME AWAITS</p>
          <h1>Make room for <em>memorable</em> stays.</h1>
          <p className="home-hero__subtitle">
            Find a place to unwind, reconnect, and feel right at home — wherever the journey takes you.
          </p>
          <Link className="home-hero__link" to="/Room">
            Discover our rooms <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="home-hero__caption">
          <span>STAY A LITTLE LONGER</span>
          <span>01 — 03</span>
        </div>
      </section>

      <section className="booking-search" aria-labelledby="booking-search-title">
        <div className="booking-search__heading">
          <div>
            <p className="eyebrow">START YOUR GETAWAY</p>
            <h2 id="booking-search-title">Find your stay</h2>
          </div>
          <p>Great stays begin with a simple search.</p>
        </div>
        <form className="booking-search__form" onSubmit={handleSubmit}>
          <label className="booking-field booking-field--destination">
            <span>Destination</span>
            <select name="location" value={booking.location} onChange={handleChange} disabled={!locations.length}>
              <option value="">{locations.length ? "Choose a location" : "Loading locations..."}</option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>{location.location}</option>
              ))}
            </select>
          </label>
          <label className="booking-field">
            <span>Check in</span>
            <input type="date" name="arrival" min={today} value={booking.arrival} onChange={handleChange} />
          </label>
          <label className="booking-field">
            <span>Check out</span>
            <input
              type="date"
              name="departure"
              min={booking.arrival || today}
              value={booking.departure}
              onChange={handleChange}
            />
          </label>
          <label className="booking-field booking-field--guests">
            <span>Rooms &amp; guests</span>
            <span className="booking-field__guests">
              <input aria-label="Rooms per booking" type="number" value="1" disabled />
              <span>room per booking</span>
              <input aria-label="Adults" type="number" name="adults" min="1" value={booking.adults} onChange={handleChange} />
              <span>adult(s)</span>
              <input aria-label="Children" type="number" name="children" min="0" value={booking.children} onChange={handleChange} />
              <span>child(ren)</span>
            </span>
          </label>
          <button className="booking-search__button" type="submit">
            Search stays <span aria-hidden="true">→</span>
          </button>
        </form>
        {locationError && <p className="booking-search__error" role="alert">{locationError}</p>}
      </section>

      <section className="home-intro">
        <p className="eyebrow">A STAY THAT FEELS LIKE YOURS</p>
        <h2>More than a room.<br /><em>A place to belong.</em></h2>
        <p>From the first hello to the last slow morning, we make the little things feel special. Choose your room, plan your dates, and leave the rest to us.</p>
      </section>

      <section className="home-experiences" aria-label="Explore the Stay Haven experience">
        {experiences.map((experience, index) => (
          <article className={`experience-card experience-card--${index + 1}`} key={experience.title}>
            <img src={experience.image} alt="" />
            <div className="experience-card__overlay">
              <p>{experience.category}</p>
              <h3>{experience.title}</h3>
              <span>{experience.description}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="home-perks">
        <div>
          <span aria-hidden="true">✦</span>
          <h3>Comfort comes standard</h3>
          <p>Fresh, inviting rooms with the thoughtful essentials for a restful stay.</p>
        </div>
        <div>
          <span aria-hidden="true">⌖</span>
          <h3>Stay close to what matters</h3>
          <p>Explore welcoming destinations and find a hotel that fits your plans.</p>
        </div>
        <div>
          <span aria-hidden="true">♡</span>
          <h3>Hospitality, from the heart</h3>
          <p>Our team is here to make your time away feel easy and personal.</p>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>Ready to feel right at home?</h2>
        </div>
        <Link to="/Room">Explore rooms <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
