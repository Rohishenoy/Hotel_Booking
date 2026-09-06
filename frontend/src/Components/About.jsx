import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

import HotelIcon from '@mui/icons-material/Hotel'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import PoolIcon from '@mui/icons-material/Pool'
import WifiIcon from '@mui/icons-material/Wifi'
import SpaIcon from '@mui/icons-material/Spa'
import RoomServiceIcon from '@mui/icons-material/RoomService'
import StarIcon from '@mui/icons-material/Star'
import GroupsIcon from '@mui/icons-material/Groups'

export default function About() {
return (
<Box sx={{ backgroundColor: '#faf8f5' }}>

    {/* ================= HERO SECTION ================= */}
  


    {/* ================= ABOUT HOTEL ================= */}
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>

        <Grid container spacing={5} alignItems="center">

            {/* Image */}
            <Grid size={{ xs: 12, md: 6 }}>

                <Box sx={{
                position: 'relative',
              }}>

                    <Box component="img" src="https://images.unsplash.com/photo-1564501049412-61c2a3083791"
                        alt="Luxury Hotel" sx={{
                  width: '100%',
                  height: { xs: 300, md: 430 },
                  objectFit: 'cover',
                  borderRadius: 4,

                  boxShadow:
                    '0 15px 40px rgba(0,0,0,0.2)',
                }} />

                    {/* Experience badge */}
                    <Paper elevation={5} sx={{
                  position: 'absolute',
                  bottom: -20,
                  right: { xs: 10, md: -20 },

                  backgroundColor: '#8B5E3C',
                  color: 'white',

                  px: 3,
                  py: 2,

                  borderRadius: 3,
                  textAlign: 'center',
                }}>
                        <Typography variant="h4" fontWeight="bold">
                            15+
                        </Typography>

                        <Typography variant="body2">
                            Years of Hospitality
                        </Typography>
                    </Paper>

                </Box>

            </Grid>


            {/* Content */}
            <Grid size={{ xs: 12, md: 6 }}>

                <Typography variant="overline" sx={{
                color: '#8B5E3C',
                fontWeight: 'bold',
                letterSpacing: 2,
              }}>
                    WELCOME TO OUR HOTEL
                </Typography>

                <Typography variant="h3" fontWeight="bold" sx={{
                color: '#3d2b1f',
                mb: 2,
                fontSize: { xs: 32, md: 42 },
              }}>
                    Your Comfort Is Our Priority
                </Typography>

                <Typography variant="body1" sx={{
                color: '#666',
                lineHeight: 1.9,
                mb: 2,
              }}>
                    Welcome to our Hotel Management platform, where
                    comfort meets quality service. We are committed to
                    providing our guests with a memorable and relaxing
                    stay.
                </Typography>

                <Typography variant="body1" sx={{
                color: '#666',
                lineHeight: 1.9,
                mb: 3,
              }}>
                    From elegant rooms and delicious dining to modern
                    facilities and personalized service, every detail is
                    carefully designed to make your stay comfortable,
                    enjoyable and unforgettable.
                </Typography>

                <Button variant="contained" size="large" sx={{
                backgroundColor: '#8B5E3C',
                px: 4,
                py: 1.4,
                borderRadius: 2,
                fontWeight: 'bold',

                '&:hover': {
                  backgroundColor: '#6F472D',
                  transform: 'translateY(-2px)',
                },

                transition: '0.3s',
              }}>
                    EXPLORE OUR HOTEL
                </Button>

            </Grid>

        </Grid>

    </Container>


    {/* ================= OUR SERVICES ================= */}
    <Box sx={{
          backgroundColor: '#fff',
          py: { xs: 6, md: 8 },
        }}>

        <Container maxWidth="lg">

            <Box textAlign="center" mb={5}>

                <Typography variant="overline" sx={{
                color: '#8B5E3C',
                fontWeight: 'bold',
                letterSpacing: 2,
              }}>
                    WHAT WE OFFER
                </Typography>

                <Typography variant="h3" fontWeight="bold" sx={{
                color: '#3d2b1f',
                mt: 1,
                fontSize: { xs: 30, md: 42 },
              }}>
                    Our Hotel Facilities
                </Typography>

                <Typography sx={{
                color: 'gray',
                maxWidth: 650,
                mx: 'auto',
                mt: 2,
              }}>
                    Everything you need for a comfortable and relaxing
                    hotel experience.
                </Typography>

            </Box>


            <Grid container spacing={3}>

                {/* Room */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <FacilityCard icon={<HotelIcon />}
                    title="Luxury Rooms"
                    description="Beautifully designed rooms with comfortable beds and modern facilities."
                    />
                </Grid>

                {/* Restaurant */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <FacilityCard icon={<RestaurantIcon />}
                    title="Restaurant"
                    description="Enjoy delicious meals prepared by our experienced chefs."
                    />
                </Grid>

                {/* Swimming Pool */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <FacilityCard icon={<PoolIcon />}
                    title="Swimming Pool"
                    description="Relax and refresh yourself in our clean and spacious swimming pool."
                    />
                </Grid>

                {/* WiFi */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <FacilityCard icon={<WifiIcon />}
                    title="Free Wi-Fi"
                    description="Stay connected with high-speed Wi-Fi throughout the hotel."
                    />
                </Grid>

                {/* Spa */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <FacilityCard icon={<SpaIcon />}
                    title="Spa & Wellness"
                    description="Relax your body and mind with our wellness and spa services."
                    />
                </Grid>

                {/* Room Service */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <FacilityCard icon={<RoomServiceIcon />}
                    title="24/7 Room Service"
                    description="Our team is available around the clock to assist you."
                    />
                </Grid>

            </Grid>

        </Container>

    </Box>


    {/* ================= WHY CHOOSE US ================= */}
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>

        <Grid container spacing={5} alignItems="center">

            <Grid size={{ xs: 12, md: 5 }}>

                <Typography variant="overline" sx={{
                color: '#8B5E3C',
                fontWeight: 'bold',
                letterSpacing: 2,
              }}>
                    WHY CHOOSE US
                </Typography>

                <Typography variant="h3" fontWeight="bold" sx={{
                color: '#3d2b1f',
                mt: 1,
                mb: 2,
                fontSize: { xs: 32, md: 42 },
              }}>
                    Hospitality That Feels Like Home
                </Typography>

                <Typography sx={{
                color: '#666',
                lineHeight: 1.9,
                mb: 3,
              }}>
                    We believe great hospitality is more than just
                    providing a room. It is about creating an experience
                    where every guest feels welcomed, valued and cared for.
                </Typography>

                <Button variant="contained" sx={{
                backgroundColor: '#8B5E3C',
                borderRadius: 2,
                px: 4,

                '&:hover': {
                  backgroundColor: '#6F472D',
                },
              }}>
                    BOOK YOUR STAY
                </Button>

            </Grid>


            <Grid size={{ xs: 12, md: 7 }}>

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <InfoCard icon={<StarIcon />}
                        number="4.9"
                        text="Guest Rating"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <InfoCard icon={<GroupsIcon />}
                        number="10K+"
                        text="Happy Guests"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <InfoCard icon={<HotelIcon />}
                        number="100+"
                        text="Luxury Rooms"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <InfoCard icon={<RoomServiceIcon />}
                        number="24/7"
                        text="Guest Support"
                        />
                    </Grid>

                </Grid>

            </Grid>

        </Grid>

    </Container>


    {/* ================= MISSION ================= */}
    <Box sx={{
          backgroundColor: '#8B5E3C',
          color: 'white',
          py: { xs: 6, md: 8 },
        }}>

        <Container maxWidth="md">

            <Box textAlign="center">

                <Typography variant="h3" fontWeight="bold" sx={{
                fontSize: { xs: 30, md: 42 },
                mb: 2,
              }}>
                    Our Mission
                </Typography>

                <Divider sx={{
                width: 70,
                mx: 'auto',
                mb: 3,
                borderColor: '#f0d7bd',
                borderWidth: 2,
              }} />

                <Typography sx={{
                fontSize: { xs: 16, md: 19 },
                lineHeight: 1.9,
                color: '#f8eee7',
              }}>
                    Our mission is to provide exceptional hospitality,
                    comfortable accommodation and memorable experiences
                    to every guest. We continuously strive to improve our
                    services and make every stay special.
                </Typography>

            </Box>

        </Container>

    </Box>


    {/* ================= FOOTER CTA ================= */}
    <Box sx={{
          backgroundColor: '#faf8f5',
          textAlign: 'center',
          py: 7,
        }}>

        <Typography variant="h4" fontWeight="bold" sx={{
            color: '#3d2b1f',
            mb: 1,
          }}>
            Ready for a Relaxing Stay?
        </Typography>

        <Typography sx={{
            color: 'gray',
            mb: 3,
          }}>
            Book your room today and experience our hospitality.
        </Typography>

        <Button variant="contained" size="large" sx={{
            backgroundColor: '#8B5E3C',
            px: 5,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 'bold',

            '&:hover': {
              backgroundColor: '#6F472D',
            },
          }}>
            BOOK NOW
        </Button>

    </Box>

</Box>
)
}


/* =====================================================
FACILITY CARD
===================================================== */

function FacilityCard({ icon, title, description }) {
return (
<Paper elevation={3} sx={{
        height: '100%',
        p: 3,
        textAlign: 'center',
        borderRadius: 3,

        transition: '0.3s',

        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
        },
      }}>

    <Box sx={{
          width: 65,
          height: 65,
          borderRadius: '50%',

          backgroundColor: '#f3e6dc',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          mx: 'auto',
          mb: 2,

          color: '#8B5E3C',

          '& svg': {
            fontSize: 32,
          },
        }}>
        {icon}
    </Box>

    <Typography variant="h6" fontWeight="bold" sx={{
          color: '#3d2b1f',
          mb: 1,
        }}>
        {title}
    </Typography>

    <Typography variant="body2" sx={{
          color: 'gray',
          lineHeight: 1.7,
        }}>
        {description}
    </Typography>

</Paper>
)
}


/* =====================================================
INFO CARD
===================================================== */

function InfoCard({ icon, number, text }) {
return (
<Paper elevation={3} sx={{
        p: 3,
        borderRadius: 3,

        display: 'flex',
        alignItems: 'center',
        gap: 2,

        transition: '0.3s',

        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}>

    <Box sx={{
          width: 55,
          height: 55,
          minWidth: 55,

          borderRadius: '50%',

          backgroundColor: '#f3e6dc',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          color: '#8B5E3C',

          '& svg': {
            fontSize: 28,
          },
        }}>
        {icon}
    </Box>

    <Box>

        <Typography variant="h5" fontWeight="bold" sx={{
            color: '#8B5E3C',
          }}>
            {number}
        </Typography>

        <Typography variant="body2" sx={{
            color: 'gray',
          }}>
            {text}
        </Typography>

    </Box>

</Paper>
)
}