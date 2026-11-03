import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { host } from "../Context/Host";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [register, setRegister] = useState({
    uname: "",
    uemail: "",
    upassword: "",
    uphone: "",
    uaddress: "",
    uimage: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setRegister((currentRegister) => ({
      ...currentRegister,
      [name]: name === "uimage" ? files?.[0] || null : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const data = new FormData();
    data.append("uname", register.uname);
    data.append("uemail", register.uemail);
    data.append("upassword", register.upassword);
    data.append("uphone", register.uphone);
    data.append("uaddress", register.uaddress);
    if (register.uimage) data.append("uimage", register.uimage);

    try {
      const response = await axios.post(`${host}/User/AddUser`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Registration failed");
      }

      alert(response.data.message);
      navigate("/Login", { state: location.state });
    } catch (requestError) {
      console.error("Registration error:", requestError);
      setError(
        requestError.response?.data?.message ||
        requestError.message ||
        "Unable to create your account. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="auth-page auth-page--register">
      <aside className="auth-story auth-story--register">
        <div className="auth-story__brand">
          <span className="auth-story__monogram">S</span>
          <span><strong>STAY HAVEN</strong><small>HOTELS &amp; RETREATS</small></span>
        </div>
        <div className="auth-story__copy">
          <p className="eyebrow">YOUR JOURNEY, YOUR WAY</p>
          <h1>Make room<br />for <em>memorable</em><br />stays.</h1>
          <p>Create your account to discover places worth returning to and keep every trip close at hand.</p>
        </div>
        <span className="auth-story__footer">A WARM WELCOME AWAITS · STAY HAVEN</span>
      </aside>

      <Paper className="auth-card auth-card--register" elevation={0}>
        <div className="auth-card__mobile-brand">
          <span className="auth-story__monogram">S</span>
          <span><strong>STAY HAVEN</strong><small>HOTELS &amp; RETREATS</small></span>
        </div>
        <Box className="auth-card__heading">
          <p className="eyebrow">JOIN STAY HAVEN</p>
          <Typography component="h2">Create your account</Typography>
          <Typography>A few details, then your next stay is within reach.</Typography>
        </Box>
        <Divider className="auth-card__divider" />

        {error && <Alert severity="error" className="auth-alert">{error}</Alert>}

        <Box component="form" className="auth-form auth-form--register" onSubmit={handleSubmit}>
          <TextField
            size="small"
            label="Full name"
            fullWidth
            name="uname"
            value={register.uname}
            onChange={handleChange}
            autoComplete="name"
            required
          />
          <TextField
            size="small"
            label="Email address"
            fullWidth
            name="uemail"
            type="email"
            value={register.uemail}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <TextField
            size="small"
            label="Password"
            fullWidth
            name="upassword"
            type="password"
            value={register.upassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <TextField
            size="small"
            label="Phone number"
            fullWidth
            name="uphone"
            type="tel"
            value={register.uphone}
            onChange={handleChange}
            autoComplete="tel"
            required
          />
          <TextField
            size="small"
            label="Address"
            fullWidth
            name="uaddress"
            value={register.uaddress}
            onChange={handleChange}
            autoComplete="street-address"
            required
          />
          <Button className="auth-upload" variant="outlined" component="label">
            <span aria-hidden="true">＋</span>
            <span>{register.uimage?.name || "Add a profile photo (optional)"}</span>
            <input hidden name="uimage" type="file" accept="image/*" onChange={handleChange} />
          </Button>
          <Button className="auth-submit" variant="contained" fullWidth size="large" type="submit" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
            {!submitting && <span aria-hidden="true">→</span>}
          </Button>
        </Box>
        <Typography className="auth-card__switch">
          Already have an account?{" "}
          <Button
            variant="text"
            onClick={() => navigate("/Login", { state: location.state })}
          >
            Sign in
          </Button>
        </Typography>
        <p className="auth-card__note">By joining, you’re one step closer to your next getaway.</p>
      </Paper>
    </Box>
  );
}
