import React, { useEffect, useState } from "react";

import {Container,Paper,Typography,Button,Radio,RadioGroup,FormControlLabel,TextField,Box,Divider,Chip} from "@mui/material";
import {useLocation,useNavigate} from "react-router-dom";
import axios from "axios";
import { host } from "../Context/Host";

export default function Payment() {

  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;
  const isLoggedIn = Boolean(localStorage.getItem("UserId"));
  const [method, setMethod] = useState("");
  const [payment, setPayment] = useState({
    upi: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Login", {
        replace: true,
        state: {
          returnTo: {
            pathname: location.pathname,
            state: booking
          }
        }
      });
    }
  }, [booking, isLoggedIn, location.pathname, navigate]);

  if (!isLoggedIn) {
    return null;
  }


  // Payment input
  const handleChange = (e) => {
  setPayment({...payment,[e.target.name]: e.target.value});
  };


  // Payment method
  const handleMethodChange = (e) => {
  setMethod(e.target.value);
};


  // Confirm payment

const handlePayment = async () => {

    if (!method) {
        alert("Please select payment method");
        return;
    }

    if (method === "UPI" && !payment.upi) {
        alert("Please enter UPI ID");
        return;
    }

    if (method === "Card") {
        if (
            !payment.cardName ||
            !payment.cardNumber ||
            !payment.expiry ||
            !payment.cvv
        ) {
            alert("Please enter all card details");
            return;
        }
    }

    const userId = localStorage.getItem("UserId");

    if (!userId) {
        alert("Please login first");
        navigate("/Login", {
            state: {
                returnTo: {
                    pathname: location.pathname,
                    state: booking
                }
            }
        });
        return;
    }

    try {

        const res = await axios.post(
            `${host}/Payment/ConfirmPayment`,
            {
                bookingId: booking._id,
                userId: userId,
                amount: booking.totalAmount,
                paymentMethod: method,
                transactionId: method === "UPI" ? payment.upi : ""
            }
        );

        console.log("Payment response:", res.data);

        if (res.data.success) {
            alert("Payment successful!");
            navigate("/MyBookings", { replace: true });
        }

    } catch (error) {

        console.log("Payment error:", error);

        alert(
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Payment failed"
        );
    }
};





  // No booking
  if (!booking) {
    return (
      <Container sx={{ py: 8 }}>
        <Paper
          elevation={8}
          sx={{
            maxWidth: 450,
            mx: "auto",
            p: 5,
            textAlign: "center",
            borderRadius: 4
          }}
        >

          <Typography variant="h5" fontWeight="bold" color="#8B5E3C" mb={3} >   No Booking Found </Typography>


          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#8B5E3C",
              px: 5,

              "&:hover": {
                backgroundColor: "#6F472D"
              }
            }}
          >
            Go to Home
          </Button>
        </Paper>
      </Container>
    );
  }


  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 6
      }}
    >

      <Paper
        elevation={12}
        sx={{
          borderRadius: 4,
          overflow: "hidden"
        }}
      >

        {/* Header */}

        <Box
          sx={{
            backgroundColor: "#8B5E3C",
            color: "white",
            p: 4,
            textAlign: "center"
          }}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Hotel Payment
          </Typography>

          <Typography
            sx={{
              mt: 1,
              opacity: 0.9
            }}
          >
            Complete your booking
          </Typography>

        </Box>


        <Box sx={{ p: 4 }}>


          {/* Booking Details */}

          <Typography
            variant="h6"
            fontWeight="bold"
            color="#8B5E3C"
            mb={2}
          >
            Booking Details
          </Typography>


          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              backgroundColor: "#faf7f4",
              borderRadius: 3
            }}
          >

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1
              }}
            >

              <Typography>
                Location
              </Typography>

              <Typography fontWeight="bold">
                {booking.location}
              </Typography>

            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1
              }}
            >

              <Typography>
                Room
              </Typography>

              <Typography fontWeight="bold">
                {booking.roomType}
              </Typography>

            </Box>


            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1
              }}
            >

              <Typography>
                Arrival
              </Typography>

              <Typography fontWeight="bold">
                {booking.arrival}
              </Typography>

            </Box>


            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1
              }}
            >

              <Typography>
                Departure
              </Typography>

              <Typography fontWeight="bold">
                {booking.departure}
              </Typography>

            </Box>


            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1
              }}
            >

              <Typography>
                Rooms
              </Typography>

              <Typography fontWeight="bold">
                {booking.rooms}
              </Typography>

            </Box>


            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >

              <Typography>
                Guests
              </Typography>

              <Typography fontWeight="bold">
                {booking.adults} Adults,{" "}
                {booking.children} Children
              </Typography>

            </Box>

          </Paper>


          <Divider sx={{ my: 3 }} />


          {/* Total */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3
            }}
          >

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Total Amount
            </Typography>


            <Typography
              variant="h5"
              fontWeight="bold"
              color="#8B5E3C"
            >
              ₹{booking.totalAmount}
            </Typography>

          </Box>


          {/* Payment Method */}

          <Typography
            variant="h6"
            fontWeight="bold"
            mb={1}
          >
            Select Payment Method
          </Typography>


          <RadioGroup
            value={method}
            onChange={handleMethodChange}
          >

            <Paper
              elevation={0}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                mb: 1
              }}
            >

              <FormControlLabel
                value="UPI"
                control={<Radio />}
                label="UPI Payment"
                sx={{
                  width: "100%",
                  px: 1
                }}
              />

            </Paper>


            <Paper
              elevation={0}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                mb: 1
              }}
            >

              <FormControlLabel
                value="Card"
                control={<Radio />}
                label="Credit / Debit Card"
                sx={{
                  width: "100%",
                  px: 1
                }}
              />

            </Paper>


            <Paper
              elevation={0}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2
              }}
            >

              <FormControlLabel
                value="COD"
                control={<Radio />}
                label="Cash on Arrival"
                sx={{
                  width: "100%",
                  px: 1
                }}
              />

            </Paper>

          </RadioGroup>


          {/* UPI */}

          {method === "UPI" && (

            <Box sx={{ mt: 3 }}>

              <TextField
                fullWidth
                label="UPI ID"
                name="upi"
                placeholder="example@upi"
                value={payment.upi}
                onChange={handleChange}
              />

            </Box>

          )}


          {/* Card */}

          {method === "Card" && (

            <Box sx={{ mt: 3 }}>

              <TextField
                fullWidth
                label="Card Holder Name"
                name="cardName"
                value={payment.cardName}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />


              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={payment.cardNumber}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />


              <Box sx={{  display: "flex", gap: 2 }}>

                <TextField
                  fullWidth
                  label="Expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={payment.expiry}
                  onChange={handleChange}
                />


                <TextField fullWidthlabel="CVV" name="cvv" type="password"value={payment.cvv} onChange={handleChange}/>
              </Box>
            </Box>
          )}
          {/* Cash */}
          {method === "COD" && (
            <Paper elevation={0} sx={{ mt: 3, p: 2, backgroundColor: "#faf7f4",borderRadius: 2}}>
              <Typography> You can pay the amount at thehotel during arrival.</Typography>
            </Paper>
          )}
          {/* Payment status */}
          {method && (
            <Box sx={{ mt: 3 }}>
              <Chip label={ method === "COD"? "Pay at Hotel" : "Secure Payment" }sx={{color: "#8B5E3C",borderColor: "#8B5E3C"}} variant="outlined"/>
            </Box>
          )}
          {/* Pay Button */}
          <Button fullWidth variant="contained" onClick={handlePayment}sx={{ mt: 4, py: 1.6, borderRadius: 2,fontSize: "16px",fontWeight: "bold",backgroundColor: "#8B5E3C",
              "&:hover": {backgroundColor: "#6F472D"}}}
          >Pay ₹{booking.totalAmount}</Button>
          <Typography textAlign="center"sx={{ mt:2,fontSize:"13px",color:"gray"}}>Your booking information is securely processed.</Typography>
        </Box>
      </Paper>
    </Container>

  );

}