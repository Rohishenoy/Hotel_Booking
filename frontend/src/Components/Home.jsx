
import React from 'react'

export default function Home() {
  return (
    <div>
      <div>
  {/* loader  */}
  <div className="loader_bg">
    <div className="loader"><img src="images/loading.gif" alt="#" /></div>
  </div>
  {/* end loader */}
 
  {/* banner */}
  <section className="banner_main">
    <div id="myCarousel" className="carousel slide banner" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to={0} className="active" />
        <li data-target="#myCarousel" data-slide-to={1} />
        <li data-target="#myCarousel" data-slide-to={2} />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="first-slide" src="images/banner1.jpg" alt="First slide" />
          <div className="container">
          </div>
        </div>
        <div className="carousel-item">
          <img className="second-slide" src="images/banner2.jpg" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img className="third-slide" src="images/banner3.jpg" alt="Third slide" />
        </div>
      </div>
      <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>

<div className="booking_ocline">
  <div className="container">
    <div className="row">
      <div className="col-md-5">
        <div className="book_room">

          <h1>Book a Room Online</h1>

          <form className="book_now">
            <div className="row">

              {/* Arrival */}
              <div className="col-md-6">
                <span>Arrival</span>
                <img
                  className="date_cua"
                  src="images/date.png"
                  alt="date"
                />
                <input
                  className="online_book"
                  type="date"
                  name="arrival"
                />
              </div>

              {/* Departure */}
              <div className="col-md-6">
                <span>Departure</span>
                <img
                  className="date_cua"
                  src="images/date.png"
                  alt="date"
                />
                <input
                  className="online_book"
                  type="date"
                  name="departure"
                />
              </div>

              {/* Room Type */}
              <div className="col-md-6">
                <span>Room Type</span>
                <select
                  className="online_book"
                  name="roomType"
                >
                  <option value="">Select Room</option>
                  <option value="single">Single Room</option>
                  <option value="double">Double Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="suite">Suite</option>
                </select>
              </div>

              {/* Number of Rooms */}
              <div className="col-md-6">
                <span>Rooms</span>
                <input
                  className="online_book"
                  type="number"
                  name="rooms"
                  min="1"
                  placeholder="No. of rooms"
                />
              </div>

              {/* Adults */}
              <div className="col-md-6">
                <span>Adults</span>
                <input
                  className="online_book"
                  type="number"
                  name="adults"
                  min="1"
                  placeholder="No. of adults"
                />
              </div>

              {/* Children */}
              <div className="col-md-6">
                <span>Children</span>
                <input
                  className="online_book"
                  type="number"
                  name="children"
                  min="0"
                  placeholder="No. of children"
                />
              </div>

              {/* Book Button */}
              <div className="col-md-12">
                <button
                  type="submit"
                  className="book_btn"
                >
                  Book Now
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</div>


  </section>
  {/* end banner */}
  {/* about */}
  {/* <div className="about">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5">
          <div className="titlepage">
            <h2>About Us</h2>
            <p>The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum. </p>
            <a className="read_more" href="Javascript:void(0)"> Read More</a>
          </div>
        </div>
        <div className="col-md-7">
          <div className="about_img">
            <figure><img src="images/about.png" alt="#" /></figure>
          </div>
        </div>
      </div>
    </div>
  </div> */}
  {/* end about */}
  {/* our_room */}
  {/* <div className="our_room">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="titlepage">
            <h2>Our Room</h2>
            <p>Lorem Ipsum available, but the majority have suffered </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-sm-6">
          <div id="serv_hover" className="room">
            <div className="room_img">
              <figure><img src="images/room1.jpg" alt="#" /></figure>
            </div>
            <div className="bed_room">
              <h3>Bed Room</h3>
              <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div id="serv_hover" className="room">
            <div className="room_img">
              <figure><img src="images/room2.jpg" alt="#" /></figure>
            </div>
            <div className="bed_room">
              <h3>Bed Room</h3>
              <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div id="serv_hover" className="room">
            <div className="room_img">
              <figure><img src="images/room3.jpg" alt="#" /></figure>
            </div>
            <div className="bed_room">
              <h3>Bed Room</h3>
              <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div id="serv_hover" className="room">
            <div className="room_img">
              <figure><img src="images/room4.jpg" alt="#" /></figure>
            </div>
            <div className="bed_room">
              <h3>Bed Room</h3>
              <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div id="serv_hover" className="room">
            <div className="room_img">
              <figure><img src="images/room5.jpg" alt="#" /></figure>
            </div>
            <div className="bed_room">
              <h3>Bed Room</h3>
              <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div id="serv_hover" className="room">
            <div className="room_img">
              <figure><img src="images/room6.jpg" alt="#" /></figure>
            </div>
            <div className="bed_room">
              <h3>Bed Room</h3>
              <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
  {/* end our_room */}
  {/* gallery */}
  {/* <div className="gallery">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="titlepage">
            <h2>gallery</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <div className="gallery_img">
            <figure><img src="images/gallery1.jpg" alt="#" /></figure>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="gallery_img">
            <figure><img src="images/gallery2.jpg" alt="#" /></figure>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="gallery_img">
            <figure><img src="images/gallery3.jpg" alt="#" /></figure>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="gallery_img">
            <figure><img src="images/gallery4.jpg" alt="#" /></figure>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="gallery_img">
            <figure><img src="images/gallery5.jpg" alt="#" /></figure>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="gallery_img">
            <figure><img src="images/gallery6.jpg" alt="#" /></figure>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="gallery_img">
            <figure><img src="images/gallery7.jpg" alt="#" /></figure>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="gallery_img">
            <figure><img src="images/gallery8.jpg" alt="#" /></figure>
          </div>
        </div>
      </div>
    </div>
  </div> */}
  {/* end gallery */}
  {/* blog */}
  {/* <div className="blog">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="titlepage">
            <h2>Blog</h2>
            <p>Lorem Ipsum available, but the majority have suffered </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="blog_box">
            <div className="blog_img">
              <figure><img src="images/blog1.jpg" alt="#" /></figure>
            </div>
            <div className="blog_room">
              <h3>Bed Room</h3>
              <span>The standard chunk </span>
              <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generatorsIf you are </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="blog_box">
            <div className="blog_img">
              <figure><img src="images/blog2.jpg" alt="#" /></figure>
            </div>
            <div className="blog_room">
              <h3>Bed Room</h3>
              <span>The standard chunk </span>
              <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generatorsIf you are </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="blog_box">
            <div className="blog_img">
              <figure><img src="images/blog3.jpg" alt="#" /></figure>
            </div>
            <div className="blog_room">
              <h3>Bed Room</h3>
              <span>The standard chunk </span>
              <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generatorsIf you are </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
  {/* end blog */}
  {/*  contact */}
  {/* <div className="contact">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="titlepage">
            <h2>Contact Us</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <form id="request" className="main_form">
            <div className="row">
              <div className="col-md-12 ">
                <input className="contactus" placeholder="Name" type="type" name="Name" /> 
              </div>
              <div className="col-md-12">
                <input className="contactus" placeholder="Email" type="type" name="Email" /> 
              </div>
              <div className="col-md-12">
                <input className="contactus" placeholder="Phone Number" type="type" name="Phone Number" />                          
              </div>
              <div className="col-md-12">
                <textarea className="textarea" placeholder="Message" type="type" message="Name" defaultValue={"Message"} />
              </div>
              <div className="col-md-12">
                <button className="send_btn">Send</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <div className="map_main">
            <div className="map-responsive">
              <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France" width={600} height={400} frameBorder={0} style={{border: 0, width: '100%'}} allowFullScreen />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
  {/* end contact */}

</div>
    </div>
  )
}
