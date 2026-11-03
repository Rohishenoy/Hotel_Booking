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
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { host } from "../Context/Host";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState({ uemail: "", upassword: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setLogin((currentLogin) => ({
      ...currentLogin,
      [event.target.name]: event.target.value
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await axios.post(`${host}/User/Login`, login);
      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
      }

      localStorage.setItem("UserToken-1", response.data.token);
      localStorage.setItem("UserId", response.data.user._id);

      const returnTo = location.state?.returnTo;
      navigate(returnTo?.pathname || "/", { state: returnTo?.state });
    } catch (requestError) {
      console.error("Login error:", requestError);
      setError(
        requestError.response?.data?.message ||
        requestError.message ||
        "Unable to sign in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = () => {
    navigate("/Register", { state: location.state });
  };

  return (
    <Box className="auth-page auth-page--login">
      <aside className="auth-story auth-story--login">
        <div className="auth-story__brand">
          <span className="auth-story__monogram">S</span>
          <span><strong>STAY HAVEN</strong><small>HOTELS &amp; RETREATS</small></span>
        </div>
        <div className="auth-story__copy">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Your next<br />great stay<br /><em>starts here.</em></h1>
          <p>Come back to thoughtful comfort, warm hospitality, and places that feel like your own.</p>
        </div>
        <span className="auth-story__footer">MAKE YOURSELF AT HOME · STAY HAVEN</span>
      </aside>

      <Paper className="auth-card auth-card--login" elevation={0}>
        <div className="auth-card__mobile-brand">
          <span className="auth-story__monogram">S</span>
          <span><strong>STAY HAVEN</strong><small>HOTELS &amp; RETREATS</small></span>
        </div>
        <Box className="auth-card__heading">
          <p className="eyebrow">YOUR ACCOUNT</p>
          <Typography component="h2">Sign in</Typography>
          <Typography>Pick up where your next getaway begins.</Typography>
        </Box>
        <Divider className="auth-card__divider" />

        {error && <Alert severity="error" className="auth-alert">{error}</Alert>}

        <Box component="form" className="auth-form" onSubmit={handleLogin}>
          <TextField
            label="Email address"
            fullWidth
            name="uemail"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={login.uemail}
            onChange={handleChange}
            required
            InputProps={{ startAdornment: <EmailIcon className="auth-field-icon" /> }}
          />
          <TextField
            label="Password"
            fullWidth
            name="upassword"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={login.upassword}
            onChange={handleChange}
            required
            InputProps={{ startAdornment: <LockIcon className="auth-field-icon" /> }}
          />
          <Button className="auth-submit" variant="contained" fullWidth size="large" type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
            {!submitting && <span aria-hidden="true">→</span>}
          </Button>
        </Box>
        <Typography className="auth-card__switch">
          New to Stay Haven?{" "}
          <Button variant="text" onClick={handleRegister}>Create an account</Button>
        </Typography>
        <p className="auth-card__note">Your next restful stay is just around the corner.</p>
      </Paper>
    </Box>
  );
}
