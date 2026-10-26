import express from "express";

const route = express.Router()

import {AddBooking,ViewBookingByUser} from "../Controller/booking_controller.js";

route.post("/AddBooking",AddBooking);
route.get("/ViewBookingByUser/:userId",ViewBookingByUser)

export default route;





