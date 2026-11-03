import React from "react";

const roomPhotos = [
  { image: "/images/room1.jpg", name: "Single Room", detail: "A restful place to recharge" },
  { image: "/images/room2.jpg", name: "Double Room", detail: "Space to share your stay" },
  { image: "/images/room3.jpg", name: "Deluxe Room", detail: "A little extra room to unwind" },
  { image: "/images/room4.jpg", name: "Family Room", detail: "Made for getaways together" },
  { image: "/images/room5.jpg", name: "Premium Room", detail: "Comfort with a refined touch" },
  { image: "/images/room6.jpg", name: "Signature Suite", detail: "A stay worth celebrating" }
];

export default function Gallery() {
  return (
    <main className="gallery-page">
      <section className="gallery-intro">
        <p className="eyebrow">A LOOK INSIDE STAY HAVEN</p>
        <h1>Rooms to feel at home in</h1>
        <p>Explore the spaces waiting to welcome you on your next stay.</p>
      </section>

      <section className="gallery-grid" aria-label="Hotel room photos">
        {roomPhotos.map((room, index) => (
          <article className="gallery-card" key={room.name} style={{ "--card-order": index }}>
            <img src={room.image} alt={`${room.name} at Stay Haven`} loading="lazy" />
            <div className="gallery-card__caption">
              <span>0{index + 1}</span>
              <div>
                <h2>{room.name}</h2>
                <p>{room.detail}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
