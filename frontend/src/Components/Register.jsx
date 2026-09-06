
import React from 'react'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import PhoneIcon from '@mui/icons-material/Phone'
import HomeIcon from '@mui/icons-material/Home'

export default function Register() {
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

      <Paper
        elevation={15}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 450,
          padding: { xs: 3, sm: 4 },
          borderRadius: 4,

          backgroundColor: 'rgba(255,255,255,0.96)',

          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
        }}
      >

        {/* Heading */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>

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
            Create your account
          </Typography>

        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Name */}
        <TextField
          label="Full Name"
          fullWidth
          name="uname"
          placeholder="Enter your name"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <PersonIcon sx={{ color: '#8B5E3C', mr: 1 }} />
            ),
          }}
        />

        {/* Email */}
        <TextField
          label="Email"
          fullWidth
          name="uemail"
          type="email"
          placeholder="Enter your email"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <EmailIcon sx={{ color: '#8B5E3C', mr: 1 }} />
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
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <LockIcon sx={{ color: '#8B5E3C', mr: 1 }} />
            ),
          }}
        />

        {/* Phone */}
        <TextField
          label="Phone Number"
          fullWidth
          name="uphone"
          type="tel"
          placeholder="Enter your phone number"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <PhoneIcon sx={{ color: '#8B5E3C', mr: 1 }} />
            ),
          }}
        />

        {/* Address */}
        <TextField
          label="Address"
          fullWidth
          name="uaddress"
          multiline
          rows={2}
          placeholder="Enter your address"
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <HomeIcon sx={{ color: '#8B5E3C', mr: 1, mt: 1 }} />
            ),
          }}
        />

        {/* Register Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
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
              boxShadow: '0 8px 20px rgba(111,71,45,0.35)',
            },

            transition: '0.3s',
          }}
        >
          REGISTER
        </Button>

        {/* Login */}
        <Typography
          align="center"
          sx={{
            mt: 3,
            color: 'gray',
            fontSize: 14,
          }}
        >
          Already have an account?{' '}

          <Button
            variant="text"
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
            Login
          </Button>
        </Typography>

      </Paper>
    </Box>
  )
}

