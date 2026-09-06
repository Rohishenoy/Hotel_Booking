import React from 'react'

export default function Footer() {
  return (
    <div>
        {/* end our_room */}
  {/*  footer */}
  <footer>
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className=" col-md-4">
            <h3>Contact US</h3>
            <ul className="conta">
              <li><i className="fa fa-map-marker" aria-hidden="true" /> Address</li>
              <li><i className="fa fa-mobile" aria-hidden="true" /> +01 1234569540</li>
              <li> <i className="fa fa-envelope" aria-hidden="true" /><a href="#"> demo@gmail.com</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>Menu Link</h3>
            <ul className="link_menu">
              <li><a href="#">Home</a></li>
              <li><a href="about.html"> about</a></li>
              <li className="active"><a href="room.html">Our Room</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>News letter</h3>
            <form className="bottom_form">
              <input className="enter" placeholder="Enter your email" type="text" name="Enter your email" />
              <button className="sub_btn">subscribe</button>
            </form>
            <ul className="social_icon">
              <li><a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-youtube-play" aria-hidden="true" /></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <p>
                © 2019 All Rights Reserved. Design by <a href="https://html.design/"> Free Html Templates</a>
                <br /><br />
                Distributed by <a href="https://themewagon.com/" target="_blank">ThemeWagon</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* end footer */}
  {/* Javascript files*/}
  {/* sidebar */}
    </div>
  )
}
