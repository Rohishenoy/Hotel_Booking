import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { host } from "../Context/Host";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const Handlechange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    };

    const Handlelogin = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                `${host}/Admin/Login`,
                login
            );

            console.log("Login response:", res.data);

            // Check whether login was successful
            if (res.data.success) {

                alert(res.data.message);

                // Save admin token
                localStorage.setItem(
                    "AdminToken1",
                    res.data.token
                );

                // Go to dashboard
                navigate("/admindashboard");

            } else {

                // Do NOT navigate if login failed
                alert(res.data.message);

            }

        } catch (error) {

            console.log("Login error:", error);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "linear-gradient(135deg, #eef2ff 0%, #dbeafe 50%, #f0fdf4 100%)",
                p: 3
            }}
        >

            <Paper
                elevation={12}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 4,
                    borderRadius: 4,
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                        "0 20px 45px rgba(15, 23, 42, 0.12)"
                }}
            >

                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: "#0f172a"
                    }}
                >
                    Admin Login
                </Typography>

                <Box
                    component="form"
                    onSubmit={Handlelogin}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >

                    <TextField
                        label="Email"
                        fullWidth
                        name="email"
                        type="email"
                        value={login.email}
                        onChange={Handlechange}
                        variant="outlined"
                        required
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                backgroundColor: "#f8fafc"
                            }
                        }}
                    />

                    <TextField
                        label="Password"
                        fullWidth
                        name="password"
                        type="password"
                        value={login.password}
                        onChange={Handlechange}
                        variant="outlined"
                        required
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                backgroundColor: "#f8fafc"
                            }
                        }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        sx={{
                            mt: 1,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 700,
                            textTransform: "none",
                            background:
                                "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                            boxShadow: "none",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
                            }
                        }}
                    >
                        Login
                    </Button>

                </Box>

            </Paper>

        </Box>
    );
}