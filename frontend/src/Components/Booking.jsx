import React from "react";
import {useLocation,useNavigate} from "react-router-dom";
import {Container,Paper,Typography,Button,Divider,Box,Chip} from "@mui/material";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;
  const bookingStatus = booking?.bookingStatus || "pending";

  const statusConfig = {
    pending: { label: "Booking Pending", color: "#f5e6da", textColor: "#8B5E3C" },
    approved: { label: "Booking Confirmed", color: "#e6f4ea", textColor: "#1b5e20" },
    rejected: { label: "Booking Rejected", color: "#fdecea", textColor: "#b3261e" },
    cancelled: { label: "Booking Cancelled", color: "#f3f3f3", textColor: "#5f6368" }
  };

  const currentStatus = statusConfig[bookingStatus] || statusConfig.pending;

  // No booking
  if (!booking) {

    return (
      <Container sx={{py:8}}>

        <Paper elevation={8}sx={{maxWidth: 450,margin: "auto",padding: 5,textAlign: "center",borderRadius: 4 }}>
        <Typography variant="h5"fontWeight="bold"color="#8B5E3C"mb={3}> No Booking Found</Typography>

          <Button variant="contained"onClick={() => navigate("/")}sx={{backgroundColor: "#8B5E3C",px: 5,borderRadius: 2,"&:hover": {backgroundColor: "#6F472D"}}}>
    Go to Home</Button>
</Paper>
</Container>
);
}


  return (
    <Container maxWidth="sm"sx={{py: 6 }}>
      <Paper elevation={12}sx={{borderRadius: 4,overflow: "hidden"}}>
        {/* Header */}
        <Box sx={{backgroundColor: "#8B5E3C",color: "white",textAlign: "center",py: 4, px: 3}}>
          <Typography variant="h4" fontWeight="bold" > Booking Details</Typography>
          <Typography  sx={{   mt: 1,   opacity: 0.9 }}>  Review your hotel booking</Typography>
        </Box>
        {/* Content */}
        <Box sx={{ p: 4 }}>
        {/* Booking Status */}
          <Box sx={{ display: "flex",justifyContent: "space-between",alignItems: "center", mb: 3 }} >

            <Typography variant="h6"fontWeight="bold" > Your Reservation</Typography>


            <Chip label={currentStatus.label}
              sx={{
                backgroundColor: currentStatus.color,
                color: currentStatus.textColor,
                fontWeight: "bold"
              }}
            />

          </Box>


          <Divider sx={{ mb: 3 }} />


          {/* Details Card */}

          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#faf7f4",
              borderRadius: 3,
              p: 3
            }}
          >

            {/* Location */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2
              }}
            >

              <Typography color="text.secondary">
                Location
              </Typography>

              <Typography fontWeight="bold">
                {booking.location}
              </Typography>

            </Box>

            {booking.hotel?.hotelname && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2
                }}
              >
                <Typography color="text.secondary">
                  Hotel
                </Typography>
                <Typography fontWeight="bold">
                  {booking.hotel.hotelname}
                </Typography>
              </Box>
            )}

            {/* Room */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2
              }}
            >

              <Typography color="text.secondary">
                Room Type
              </Typography>

              <Typography
                fontWeight="bold"
                color="#8B5E3C"
              >
                {booking.roomType}
              </Typography>

            </Box>


            {/* Arrival */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2
              }}
            >

              <Typography color="text.secondary">
                Arrival
              </Typography>

              <Typography fontWeight="bold">
                {booking.arrival}
              </Typography>

            </Box>


            {/* Departure */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2
              }}
            >

              <Typography color="text.secondary">
                Departure
              </Typography>

              <Typography fontWeight="bold">
                {booking.departure}
              </Typography>

            </Box>


            {/* Rooms */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2
              }}
            >

              <Typography color="text.secondary">
                Number of Rooms
              </Typography>

              <Typography fontWeight="bold">
                {booking.rooms}
              </Typography>

            </Box>


            {/* Adults */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2
              }}
            >

              <Typography color="text.secondary"> Adults</Typography>
              <Typography fontWeight="bold">{booking.adults}</Typography>
           </Box>
            {/* Children */}

            <Box sx={{display: "flex",justifyContent: "space-between"}}>
              <Typography color="text.secondary">Children</Typography>
              <Typography fontWeight="bold">{booking.children}</Typography>
            </Box>
          </Paper>

          <Divider sx={{ my: 3 }} />

          {/* Total Amount */}
          <Box sx={{backgroundColor: "#8B5E3C", color: "white", borderRadius: 3, p: 3,display: "flex",justifyContent: "space-between",alignItems: "center"}}>
            <Box>
 <Typography sx={{ opacity: 0.9  }} >Total Amount</Typography>
              <Typography variant="h5"fontWeight="bold">₹{booking.totalAmount}</Typography>
            </Box>
            <Typography sx={{fontSize: "14px", opacity: 0.9}} >Pay Now </Typography>
          </Box>

          {/* Buttons */}

          <Button fullWidth variant="contained" onClick={() =>navigate("/Payment",{ state: booking})}
          sx={{mt: 4,py: 1.5,borderRadius: 2,fontSize: "16px",fontWeight: "bold",backgroundColor:"#8B5E3C","&:hover":{backgroundColor:"#6F472D"}}}> Continue to Payment
          </Button>
          <Button fullWidth variant="outlined"  onClick={() => navigate("/")}
            sx={{ mt: 1.5, py: 1.3, borderRadius: 2, color: "#8B5E3C", borderColor: "#8B5E3C", "&:hover": {  borderColor: "#6F472D",backgroundColor: "#faf7f4"  } }}>
            Back to Home
          </Button>
          <Typography textAlign="center"  sx={{mt: 3,fontSize: "13px",color: "gray" }}>
            Please check your booking details before
            continuing to payment.
          </Typography>
        </Box>
      </Paper>
    </Container>

  );

}