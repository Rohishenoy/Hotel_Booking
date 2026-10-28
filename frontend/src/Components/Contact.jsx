import React from 'react'
import { Typography,Paper,Grid } from '@mui/material'
export default function Contact() {
  return (
    <div>
       <div>


  <div className="back_re">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title">
            <h2>Contact Us</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*  contact */}
  <div className="contact">
    <div className="container">
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
              {/* Contact information */}
        <Grid item xs={12} md={6}>

          <Paper sx={{ padding: 4, height: "100%" }}>

            <Typography
              variant="h5"
              color="#8B5E3C"
              fontWeight="bold"
            >
              Hotel Stay
            </Typography>

            <Typography sx={{ mt: 3 }}>
              📍 Address: Mangalore, Karnataka, India
            </Typography>

            <Typography sx={{ mt: 2 }}>
              📞 Phone: +91 98765 43210
            </Typography>

            <Typography sx={{ mt: 2 }}>
              ✉ Email: hotelstay@gmail.com
            </Typography>

            <Typography sx={{ mt: 2 }}>
              🕐 Open 24 hours
            </Typography>

          </Paper>

        </Grid>
          </form>
        </div>
        <div className="col-md-6">
          <div className="map_main">
            <div className="map-responsive">
              
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124436.39980392618!2d74.77132435199506!3d12.931004976351293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x827bbc7a74fcfe64!2sMangaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1792997963704!5m2!1sen!2sin" width={600} height={400} frameBorder={0} style={{border: 0, width: '100%'}} allowFullScreen />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* end contact */}
 
</div>
    </div>
  )
}
 
