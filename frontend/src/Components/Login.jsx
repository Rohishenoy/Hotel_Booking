import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import { useLocation, useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'

import axios from 'axios'
import { host } from '../Context/Host'

export default function Login() {

  const navigate = useNavigate()
  const location = useLocation()

  const [login, setLogin] = useState({
    uemail: '',
    upassword: ''
  })

  const handlechange = (event) => {
    console.log({
      ...login,
      [event.target.name]: event.target.value
    })

    setLogin({
      ...login,
      [event.target.name]: event.target.value
    })
  }


const HandleLogin = () => {

    console.log("login details", login);

    axios.post(`${host}/User/Login`, login)

        .then((res) => {

            console.log("Login response:", res.data);

            if (res.data.success) {

                // Save token
                localStorage.setItem(
                    "UserToken-1",
                    JSON.stringify(res.data.token)
                );


                // Save User ID
                localStorage.setItem(
                    "UserId",
                    res.data.user._id
                );


                console.log(
                    "UserId:",
                    res.data.user._id
                );


                alert(res.data.message);


                const returnTo = location.state?.returnTo
                navigate(returnTo?.pathname || "/", {
                    state: returnTo?.state
                });

            } else {

                alert(res.data.message);

            }

        })

        .catch((error) => {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        });
};



  const HandleRegister = () => {
    navigate('/register')
  }

  return (

    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundImage:
          'url("https://images.unsplash.com/photo-1566073771259-6a8506099945")',

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

        position: 'relative',
        padding: 2,

        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
        },
      }}
    >

      {/* Login Card */}

      <Paper
        elevation={15}
        sx={{
          position: 'relative',
          zIndex: 1,

          width: '100%',
          maxWidth: 450,

          padding: {
            xs: 3,
            sm: 4
          },

          borderRadius: 4,

          backgroundColor:
            'rgba(255,255,255,0.96)',

          boxShadow:
            '0 20px 50px rgba(0,0,0,0.35)',
        }}
      >

        {/* Heading */}

        <Box
          sx={{
            textAlign: 'center',
            mb: 3,
          }}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: '#8B5E3C',
              letterSpacing: 1,
            }}
          >
            HOTEL MANAGEMENT
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'gray',
              mt: 0.5,
            }}
          >
            Welcome Back
          </Typography>

        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Email */}

        <TextField
          label="Email"
          fullWidth
          name="uemail"
          type="email"
          placeholder="Enter your email"
          value={login.uemail}
          onChange={handlechange}
          sx={{ mb: 2 }}

          InputProps={{
            startAdornment: (
              <EmailIcon
                sx={{
                  color: '#8B5E3C',
                  mr: 1,
                }}
              />
            ),
          }}
        />

        {/* Password */}

        <TextField
          label="Password"
          fullWidth
          name="upassword"
          type="password"
          placeholder="Enter your password"
          value={login.upassword}
          onChange={handlechange}
          sx={{ mb: 1 }}

          InputProps={{
            startAdornment: (
              <LockIcon
                sx={{
                  color: '#8B5E3C',
                  mr: 1,
                }}
              />
            ),
          }}
        />

        {/* Forgot Password */}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mb: 3,
          }}
        >

          <Button
            variant="text"
            sx={{
              color: '#8B5E3C',
              textTransform: 'none',
              fontSize: 14,
              padding: 0,

              '&:hover': {
                backgroundColor: 'transparent',
                color: '#6F472D',
              },
            }}
          >
            Forgot Password?
          </Button>

        </Box>

        {/* Login Button */}

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={HandleLogin}
          sx={{
            py: 1.5,

            borderRadius: 2,

            fontSize: '16px',
            fontWeight: 'bold',
            letterSpacing: 1,

            backgroundColor: '#8B5E3C',

            '&:hover': {
              backgroundColor: '#6F472D',

              transform: 'translateY(-2px)',

              boxShadow:
                '0 8px 20px rgba(111,71,45,0.35)',
            },

            transition: '0.3s',
          }}
        >
          LOGIN
        </Button>

        {/* Register */}

        <Typography
          align="center"
          sx={{
            mt: 3,
            color: 'gray',
            fontSize: 14,
          }}
        >
          Don't have an account?{' '}

          <Button
            variant="text"
            onClick={HandleRegister}
            sx={{
              color: '#8B5E3C',
              fontWeight: 'bold',
              textTransform: 'none',
              padding: 0,
              minWidth: 'auto',

              '&:hover': {
                backgroundColor: 'transparent',
                color: '#6F472D',
              },
            }}
          >
            Register
          </Button>

        </Typography>

      </Paper>

    </Box>
  )
}