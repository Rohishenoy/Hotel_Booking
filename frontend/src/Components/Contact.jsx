import React, { useState } from "react";
import axios from "axios";
import { Alert, Grid, Paper, Typography } from "@mui/material";
import { host } from "../Context/Host";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateForm = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value
    }));
  };

  const submitContact = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await axios.post(`${host}/Contact/SubmitContact`, form);
      if (!response.data.success) {
        setError(response.data.message || "Unable to send your message.");
        return;
      }

      setSuccess("Your message has been sent. We will be in touch soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Unable to send your message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
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
      <div className="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
              <form id="request" className="main_form" onSubmit={submitContact}>
                <div className="row">
                  <div className="col-md-12">
                    <input
                      className="contactus"
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={updateForm}
                      maxLength={100}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      className="contactus"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateForm}
                      maxLength={254}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      className="contactus"
                      placeholder="Phone Number"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={updateForm}
                      maxLength={30}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="textarea"
                      placeholder="Message"
                      name="message"
                      value={form.message}
                      onChange={updateForm}
                      maxLength={2000}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <button className="send_btn" type="submit" disabled={submitting}>
                      {submitting ? "Sending..." : "Send"}
                    </button>
                  </div>
                </div>
              </form>

              <Grid container sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <Paper sx={{ padding: 4, height: "100%" }}>
                    <Typography variant="h5" color="#8B5E3C" fontWeight="bold">
                      Hotel Stay
                    </Typography>
                    <Typography sx={{ mt: 3 }}>
                      Address: Mangalore, Karnataka, India
                    </Typography>
                    <Typography sx={{ mt: 2 }}>Phone: +91 98765 43210</Typography>
                    <Typography sx={{ mt: 2 }}>Email: hotelstay@gmail.com</Typography>
                    <Typography sx={{ mt: 2 }}>Open 24 hours</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </div>
            <div className="col-md-6">
              <div className="map_main">
                <div className="map-responsive">
                  <iframe
                    title="Map showing Mangalore, Karnataka"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124436.39980392618!2d74.77132435199506!3d12.931004976351293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x827bbc7a74fcfe64!2sMangaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1792997963704!5m2!1sen!2sin"
                    width={600}
                    height={400}
                    frameBorder={0}
                    style={{ border: 0, width: "100%" }}
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
