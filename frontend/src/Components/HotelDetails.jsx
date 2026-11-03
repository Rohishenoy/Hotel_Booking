import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { host } from "../Context/Host";

const fallbackImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";

const getImageUrl = (image) => {
  if (!image) return fallbackImage;
  if (/^https?:\/\//i.test(image) || image.startsWith("data:")) return image;
  return `${host}/image/${image}`;
};

const getRoomImage = (room) => {
  const roomType = room.roomtype?.toLowerCase() || "";

  if (roomType.includes("single")) return "/images/room1.jpg";
  if (roomType.includes("double")) return "/images/room2.jpg";
  if (roomType.includes("deluxe")) return "/images/room3.jpg";
  if (roomType.includes("family")) return "/images/room4.jpg";
  if (roomType.includes("premium")) return "/images/room5.jpg";
  if (roomType.includes("suite")) return "/images/room6.jpg";

  return "/images/room1.jpg";
};

export default function HotelDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingInProgress, setBookingInProgress] = useState(false);

  const availableRooms = rooms.filter((room) => room.status === "available");

  const refreshRooms = useCallback(async () => {
    const response = await axios.get(`${host}/Room/ViewRoomByHotel/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Unable to refresh room availability");
    }
    setRooms(response.data.rooms || []);
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    const getHotelDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const [hotelResponse, roomResponse] = await Promise.all([
          axios.get(`${host}/Hotel/GetHotelById/${id}`),
          axios.get(`${host}/Room/ViewRoomByHotel/${id}`)
        ]);

        if (!hotelResponse.data.success) {
          throw new Error(hotelResponse.data.message || "Unable to load hotel");
        }
        if (!roomResponse.data.success) {
          throw new Error(roomResponse.data.message || "Unable to load rooms");
        }

        if (!cancelled) {
          setHotel(hotelResponse.data.hotel);
          setRooms(roomResponse.data.rooms || []);
        }
      } catch (requestError) {
        console.error("Hotel detail loading error:", requestError);
        if (!cancelled) {
          setError(
            requestError.response?.data?.message ||
            requestError.message ||
            "Unable to load hotel details"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    getHotelDetails();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    const refreshAvailability = () => {
      refreshRooms().catch((refreshError) => {
        console.error("Room availability refresh error:", refreshError);
      });
    };

    const refreshInterval = window.setInterval(refreshAvailability, 20000);
    window.addEventListener("focus", refreshAvailability);
    return () => {
      window.clearInterval(refreshInterval);
      window.removeEventListener("focus", refreshAvailability);
    };
  }, [refreshRooms]);

  const bookRoom = async (room) => {
    const userId = localStorage.getItem("UserId");

    if (!userId) {
      alert("Please log in or register to complete your booking.");
      navigate("/Register", {
        state: {
          returnTo: {
            pathname: location.pathname,
            state: bookingData
          }
        }
      });
      return;
    }

    setBookingError("");
    setBookingInProgress(true);

    try {
      const response = await axios.post(`${host}/Booking/AddBooking`, {
        userId,
        hotel: hotel._id,
        roomId: room._id,
        location: hotel.location?.location || bookingData?.location,
        arrival: bookingData?.arrival,
        departure: bookingData?.departure,
        rooms: bookingData?.rooms,
        adults: bookingData?.adults,
        children: bookingData?.children
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Unable to create booking");
      }

      navigate("/Booking", {
        state: {
          ...response.data.booking,
          location: hotel.location?.location || bookingData?.location,
          hotel,
          room
        }
      });
    } catch (requestError) {
      console.error("Booking error:", requestError);
      const responseMessage = requestError.response?.data?.message;
      setBookingError(responseMessage || requestError.message || "Booking failed. Please try again.");
      if (requestError.response?.status === 409) {
        setRooms((currentRooms) =>
          currentRooms.map((currentRoom) =>
            currentRoom._id === room._id
              ? { ...currentRoom, status: requestError.response?.data?.roomStatus || "booked" }
              : currentRoom
          )
        );
        refreshRooms().catch((refreshError) => {
          console.error("Room availability refresh after booking conflict failed:", refreshError);
        });
      }
    } finally {
      setBookingInProgress(false);
    }
  };

  return (
    <main className="hotel-detail-page">
      {hotel && (
        <section className="hotel-detail-hero">
          <img
            src={getImageUrl(hotel.image)}
            alt={hotel.hotelname}
            onError={(event) => {
              if (!event.currentTarget.dataset.fallbackApplied) {
                event.currentTarget.dataset.fallbackApplied = "true";
                event.currentTarget.src = fallbackImage;
              }
            }}
          />
          <div className="hotel-detail-hero__shade" />
          <div className="hotel-detail-hero__content">
            <p className="eyebrow">A STAY HAVEN WELCOME</p>
            <h1>{hotel.hotelname}</h1>
            <p><span aria-hidden="true">⌖</span> {hotel.address || hotel.location?.location}</p>
          </div>
        </section>
      )}

      <div className="hotel-detail-content">
        <button className="hotel-detail-back" type="button" onClick={() => navigate(-1)}>
          <span aria-hidden="true">←</span> Back to hotels
        </button>

        {loading && (
          <div className="hotel-detail-loading" role="status">
            <span className="hotel-detail-spinner" />
            <p>Preparing your stay details…</p>
          </div>
        )}

        {error && (
          <div className="hotel-detail-message hotel-detail-message--error" role="alert">
            <h2>We couldn’t load this stay</h2>
            <p>{error}</p>
            <button type="button" className="hotel-action" onClick={() => navigate("/hotels", { state: bookingData })}>
              Back to hotels <span aria-hidden="true">→</span>
            </button>
          </div>
        )}

        {hotel && !loading && !error && (
          <>
            <section className="hotel-detail-overview">
              <div>
                <p className="eyebrow">MAKE YOURSELF AT HOME</p>
                <h2>Welcome to {hotel.hotelname}</h2>
                <p className="hotel-detail-overview__description">
                  {hotel.description || "Settle in, slow down, and enjoy a comfortable stay with thoughtful hospitality."}
                </p>
              </div>
              <div className="hotel-detail-contact">
                {hotel.phone && (
                  <a href={`tel:${hotel.phone}`}>
                    <span aria-hidden="true">☎</span>
                    <span><small>CALL THE HOTEL</small>{hotel.phone}</span>
                  </a>
                )}
                {hotel.email && (
                  <a href={`mailto:${hotel.email}`}>
                    <span aria-hidden="true">✉</span>
                    <span><small>EMAIL</small>{hotel.email}</span>
                  </a>
                )}
              </div>
            </section>

            {bookingData?.arrival && bookingData?.departure && (
              <section className="hotel-detail-stay-summary" aria-label="Your stay details">
                <div><span>CHECK IN</span><strong>{new Date(`${bookingData.arrival}T00:00:00`).toLocaleDateString()}</strong></div>
                <div><span>CHECK OUT</span><strong>{new Date(`${bookingData.departure}T00:00:00`).toLocaleDateString()}</strong></div>
                <div><span>GUESTS</span><strong>{bookingData.adults || 1} adults · {bookingData.children || 0} children</strong></div>
                <button type="button" onClick={() => navigate("/", { state: bookingData })}>Change dates</button>
              </section>
            )}

            <section className="hotel-detail-rooms">
              <div className="hotel-detail-section-heading">
                <div>
                  <p className="eyebrow">REST EASY</p>
                  <h2>Rooms for your stay</h2>
                </div>
                <span>{availableRooms.length} available</span>
              </div>

              {rooms.length > 0 ? (
                <div className="hotel-detail-room-grid">
                  {rooms.map((room, index) => {
                    const isAvailable = room.status === "available";
                    return (
                      <article
                        className="hotel-detail-room-card"
                        key={room._id}
                        style={{ "--card-order": index }}
                      >
                        <div className="hotel-detail-room-card__image-wrap">
                          <img
                            src={room.image ? getImageUrl(room.image) : getRoomImage(room)}
                            alt={`${room.roomtype || "Guest"} room at ${hotel.hotelname}`}
                            loading={index > 2 ? "lazy" : "eager"}
                            onError={(event) => {
                              if (!event.currentTarget.dataset.fallbackApplied) {
                                event.currentTarget.dataset.fallbackApplied = "true";
                                event.currentTarget.src = getRoomImage(room);
                              }
                            }}
                          />
                          <span className={`hotel-detail-room-card__status${isAvailable ? " is-available" : ""}`}>
                            {isAvailable ? "Available" : room.status === "booked" ? "Occupied · Booked" : "Unavailable"}
                          </span>
                        </div>
                        <div className="hotel-detail-room-card__body">
                          <h3>{room.roomtype || "Guest room"}</h3>
                          {room.roomnumber && (
                            <p className="hotel-detail-room-card__number">Room {room.roomnumber}</p>
                          )}
                          <p className="hotel-detail-room-card__description">
                            {room.description || "A comfortable room with everything you need to unwind."}
                          </p>
                          <div className="hotel-detail-room-card__meta">
                            {room.capacity && <span>♧ Up to {room.capacity} guests</span>}
                            <span>✦ Flexible, restful stay</span>
                          </div>
                          <div className="hotel-detail-room-card__footer">
                            <p><strong>₹{room.price}</strong><span> / night</span></p>
                            <button
                              className="hotel-action"
                              type="button"
                              disabled={!isAvailable || bookingInProgress}
                              onClick={() => bookRoom(room)}
                            >
                              {!isAvailable ? (room.status === "booked" ? "Occupied / Booked" : "Unavailable") : bookingInProgress ? "Booking…" : "Book room"}
                              {isAvailable && !bookingInProgress && <span aria-hidden="true">→</span>}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                !loading && (
                  <div className="hotel-detail-message">
                    <h2>No rooms listed yet</h2>
                    <p>Please check back soon or explore another hotel.</p>
                  </div>
                )
              )}
              {bookingError && <p className="hotel-detail-booking-error" role="alert">{bookingError}</p>}
              {!loading && rooms.length > 0 && availableRooms.length === 0 && (
                <p className="hotel-detail-no-availability">No rooms are available at this hotel right now.</p>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
