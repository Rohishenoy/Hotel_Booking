import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { host } from "../Context/Host";

const emptyProfile = { name: "", email: "", phone: "", address: "" };

function getToken() {
  const savedToken = localStorage.getItem("UserToken-1");
  if (!savedToken) return "";
  try {
    return JSON.parse(savedToken);
  } catch {
    return savedToken;
  }
}

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(emptyProfile);
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!localStorage.getItem("UserId") || !token) {
        navigate("/Login", { replace: true, state: { returnTo: { pathname: "/Profile" } } });
        return;
      }

      try {
        const response = await axios.get(`${host}/User/Profile`, {
          headers: { "auth-token": token }
        });
        if (!response.data.success) {
          throw new Error(response.data.message || "Unable to load your profile.");
        }

        const user = response.data.userprofile;
        setProfile({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || ""
        });
        setProfileImage(user.profileimage || "");
      } catch (requestError) {
        console.error("Profile loading error:", requestError);
        setError(requestError.response?.data?.message || requestError.message || "Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (event) => {
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("uname", profile.name);
      data.append("uemail", profile.email);
      data.append("uphone", profile.phone);
      data.append("uaddress", profile.address);
      if (image) data.append("uimage", image);

      const response = await axios.put(`${host}/User/UpdateProfile`, data, {
        headers: { "auth-token": getToken() }
      });
      if (!response.data.updateuser) {
        throw new Error(response.data.message || "Unable to save your profile.");
      }

      const updatedProfile = response.data.updateuser;
      setProfile({
        name: updatedProfile.name || "",
        email: updatedProfile.email || "",
        phone: updatedProfile.phone || "",
        address: updatedProfile.address || ""
      });
      setProfileImage(updatedProfile.profileimage || profileImage);
      setImage(null);
      setSuccess("Your profile has been updated.");
    } catch (requestError) {
      console.error("Profile update error:", requestError);
      setError(requestError.response?.data?.message || requestError.message || "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Container className="profile-page"><CircularProgress aria-label="Loading profile" /></Container>;
  }

  return (
    <Container maxWidth="sm" className="profile-page">
      <Paper className="profile-card" elevation={0}>
        <p className="eyebrow">YOUR STAY HAVEN ACCOUNT</p>
        <Typography component="h1" className="profile-card__title">Manage your profile</Typography>
        <Typography className="profile-card__intro">Keep your contact details up to date for a smoother stay.</Typography>

        {profileImage && (
          <img className="profile-card__image" src={`${host}/image/${profileImage}`} alt="Your profile" />
        )}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} className="profile-form">
          <TextField label="Full name" name="name" value={profile.name} onChange={handleChange} required fullWidth />
          <TextField label="Email address" name="email" type="email" value={profile.email} onChange={handleChange} required fullWidth />
          <TextField label="Phone number" name="phone" type="tel" value={profile.phone} onChange={handleChange} fullWidth />
          <TextField label="Address" name="address" value={profile.address} onChange={handleChange} multiline minRows={3} fullWidth />
          <Button component="label" variant="outlined" className="profile-upload">
            {image?.name || "Choose a profile photo"}
            <input hidden type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0] || null)} />
          </Button>
          <Button type="submit" variant="contained" disabled={saving} className="profile-save">
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
