import React, { useState } from 'react'
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Divider
} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { host } from '../Context/Host'

export default function Register() {
  const navigate = useNavigate()

  const [register, setRegister] = useState({
    uname: '',
    uemail: '',
    upassword: '',
    uphone: '',
    uaddress: '',
    uimage: ''
  })

  const HandleChange = (e) => {
    if (e.target.name === 'uimage') {
      setRegister({ ...register, uimage: e.target.files[0] })
    } else {
      setRegister({ ...register, [e.target.name]: e.target.value })
    }
  }

  const HandleSubmit = () => {
    const data = new FormData()
    data.append('uname', register.uname)
    data.append('uemail', register.uemail)
    data.append('upassword', register.upassword)
    data.append('uphone', register.uphone)
    data.append('uaddress', register.uaddress)
    if (register.uimage) {
      data.append('uimage', register.uimage)
    }

    axios.post(`${host}/User/AddUser`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        alert(res.data.message)
        navigate('/Login')
      })
      .catch((error) => {
        console.log(error)
        alert(error.response?.data?.message || 'Registration failed')
      })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        p: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)'
        }
      }}
    >
      <Paper
        elevation={15}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 520,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.96)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)'
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{ color: '#8B5E3C', mb: 2 }}
        >
          Create Account
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'text.secondary', mb: 3 }}
        >
          Join us and enjoy your perfect stay.
        </Typography>

        <Box component="form" noValidate sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Name" fullWidth name="uname" onChange={HandleChange} />
          <TextField label="Email" fullWidth name="uemail" type="email" onChange={HandleChange} />
          <TextField label="Password" fullWidth name="upassword" type="password" onChange={HandleChange} />
          <TextField label="Phone" fullWidth name="uphone" type="number" onChange={HandleChange} />
          <TextField label="Address" fullWidth name="uaddress" multiline minRows={3} onChange={HandleChange} />
          <TextField label="Upload Image" fullWidth name="uimage" type="file" onChange={HandleChange} InputLabelProps={{ shrink: true }} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Button
          variant="contained"
          fullWidth
          onClick={HandleSubmit}
          sx={{
            py: 1.5,
            borderRadius: 2,
            backgroundColor: '#8B5E3C',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#6F472D' }
          }}
        >
          Register
        </Button>

        <Typography sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
          Already have an account?{' '}
          <Button
            variant="text"
            onClick={() => navigate('/Login')}
            sx={{ color: '#8B5E3C', fontWeight: 'bold', p: 0 }}
          >
            Login
          </Button>
        </Typography>
      </Paper>
    </Box>
  )
}