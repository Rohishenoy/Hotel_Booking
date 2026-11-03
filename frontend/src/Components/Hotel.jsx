import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { host } from "../Context/Host";

const fallbackImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80";

const getImageUrl = (image) => {
  if (!image) return fallbackImage;
  if (/^https?:\/\//i.test(image) || image.startsWith("data:")) return image;
  return `${host}/image/${image}`;
};

const formatDate = (date) => {
  if (!date) return "";
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

export default function Hotels() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  const locationId = bookingData?.locationId;
  const [result, setResult] = useState({ locationId: null, hotels: [], error: "" });
  const isCurrentResult = result.locationId === locationId;
  const hotels = isCurrentResult ? result.hotels : [];
  const error = isCurrentResult ? result.error : "";
  const loading = Boolean(locationId) && !isCurrentResult;

  useEffect(() => {
    if (!locationId) return undefined;

    let cancelled = false;

    const getHotels = async () => {
      try {
        const response = await axios.get(
          `${host}/Hotel/FilterHotelByLocation?location=${locationId}`
        );

        if (!response.data.success) {
          throw new Error(response.data.message || "Unable to load hotels");
        }

        if (!cancelled) {
          setResult({
            locationId,
            hotels: response.data.hotels || [],
            error: ""
          });
        }
      } catch (requestError) {
        console.error("Hotel loading error:", requestError);
        if (!cancelled) {
          setResult({
            locationId,
            hotels: [],
            error: requestError.response?.data?.message ||
              requestError.message ||
              "Unable to load hotels"
          });
        }
      }
    };

    getHotels();
    return () => {
      cancelled = true;
    };
  }, [locationId]);

  const selectHotel = (hotel) => {
    navigate(`/HotelDetails/${hotel._id}`, { state: bookingData });
  };

  return (
    <main className="hotel-results-page">
      <section className="hotel-results-intro">
        <p className="eyebrow">YOUR NEXT STAY STARTS HERE</p>
        <h1>{bookingData?.location ? `Hotels in ${bookingData.location}` : "Find your next stay"}</h1>
        <p>
          {bookingData?.location
            ? "Choose a welcoming place to stay and explore the rooms available for your trip."
            : "Search for a destination and travel dates to find the right hotel for your trip."}
        </p>
      </section>

      <section className="hotel-results-content" aria-label="Hotel search results">
        {bookingData?.locationId && (
          <div className="hotel-search-summary">
            <div className="hotel-search-summary__item">
              <span>DESTINATION</span>
              <strong>{bookingData.location}</strong>
            </div>
            {bookingData.arrival && (
              <div className="hotel-search-summary__item">
                <span>CHECK IN</span>
                <strong>{formatDate(bookingData.arrival)}</strong>
              </div>
            )}
            {bookingData.departure && (
              <div className="hotel-search-summary__item">
                <span>CHECK OUT</span>
                <strong>{formatDate(bookingData.departure)}</strong>
              </div>
            )}
            <div className="hotel-search-summary__item">
              <span>YOUR GROUP</span>
              <strong>
                {bookingData.rooms || 1} room{Number(bookingData.rooms || 1) === 1 ? "" : "s"} ·{" "}
                {bookingData.adults || 1} adult{Number(bookingData.adults || 1) === 1 ? "" : "s"}
                {Number(bookingData.children) > 0
                  ? ` · ${bookingData.children} child${Number(bookingData.children) === 1 ? "" : "ren"}`
                  : ""}
              </strong>
            </div>
            <button className="hotel-search-summary__edit" type="button" onClick={() => navigate("/")}>
              Change search
            </button>
          </div>
        )}

        {!bookingData?.locationId && (
          <div className="hotel-results-message">
            <span className="hotel-results-message__icon" aria-hidden="true">⌖</span>
            <h2>Start with a destination</h2>
            <p>Add your location and travel dates to see hotels that match your trip.</p>
            <button className="hotel-action" type="button" onClick={() => navigate("/")}>
              Search destinations <span aria-hidden="true">→</span>
            </button>
          </div>
        )}

        {loading && (
          <>
            <p className="hotel-results-status" role="status">Finding welcoming stays for you…</p>
            <div className="hotel-results-grid" aria-hidden="true">
              {[0, 1, 2].map((item) => (
                <div className="hotel-skeleton" key={item}>
                  <div className="hotel-skeleton__image" />
                  <div className="hotel-skeleton__line hotel-skeleton__line--title" />
                  <div className="hotel-skeleton__line" />
                  <div className="hotel-skeleton__line hotel-skeleton__line--short" />
                </div>
              ))}
            </div>
          </>
        )}

        {error && (
          <div className="hotel-results-message hotel-results-message--error" role="alert">
            <span className="hotel-results-message__icon" aria-hidden="true">!</span>
            <h2>We couldn’t load the hotels</h2>
            <p>{error}</p>
            <button className="hotel-action" type="button" onClick={() => navigate("/")}>
              Return to search <span aria-hidden="true">→</span>
            </button>
          </div>
        )}

        {!loading && !error && bookingData?.locationId && hotels.length > 0 && (
          <>
            <div className="hotel-results-heading">
              <div>
                <p className="eyebrow">HANDPICKED FOR YOUR TRIP</p>
                <h2>{hotels.length} {hotels.length === 1 ? "stay" : "stays"} to explore</h2>
              </div>
              <span>Choose a hotel to view its rooms</span>
            </div>
            <div className="hotel-results-grid">
              {hotels.map((hotel, index) => (
                <article className="hotel-result-card" key={hotel._id} style={{ "--card-order": index }}>
                  <div className="hotel-result-card__image-wrap">
                    <img
                      className="hotel-result-card__image"
                      src={getImageUrl(hotel.image)}
                      alt={`${hotel.hotelname} hotel`}
                      loading={index > 2 ? "lazy" : "eager"}
                      onError={(event) => {
                        if (!event.currentTarget.dataset.fallbackApplied) {
                          event.currentTarget.dataset.fallbackApplied = "true";
                          event.currentTarget.src = fallbackImage;
                        }
                      }}
                    />
                    <span className="hotel-result-card__badge">Stay Haven collection</span>
                  </div>
                  <div className="hotel-result-card__body">
                    <p className="hotel-result-card__location">
                      <span aria-hidden="true">⌖</span> {hotel.address || bookingData.location}
                    </p>
                    <h3>{hotel.hotelname}</h3>
                    <p className="hotel-result-card__description">
                      {hotel.description || "A comfortable, welcoming stay for your time in this destination."}
                    </p>
                    <div className="hotel-result-card__footer">
                      {hotel.phone && (
                        <a href={`tel:${hotel.phone}`} className="hotel-result-card__phone">
                          <span aria-hidden="true">☎</span> {hotel.phone}
                        </a>
                      )}
                      <button className="hotel-action" type="button" onClick={() => selectHotel(hotel)}>
                        View hotel &amp; rooms <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {!loading && !error && bookingData?.locationId && hotels.length === 0 && (
          <div className="hotel-results-message">
            <span className="hotel-results-message__icon" aria-hidden="true">⌖</span>
            <h2>No hotels found just yet</h2>
            <p>There aren’t any listed stays in {bookingData.location} at the moment. Try another destination.</p>
            <button className="hotel-action" type="button" onClick={() => navigate("/")}>
              Search another destination <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
