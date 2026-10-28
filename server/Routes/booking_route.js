import express from "express";

const route = express.Router();

import {
    AddBooking,
    ViewBooking,
    ViewBookingByUser,
    DeleteBooking,
    UpdateBookingStatus
} from "../Controller/booking_controller.js";

route.post("/AddBooking", AddBooking);
route.get("/ViewBooking", ViewBooking);
route.get("/ViewBookingByUser/:userId", ViewBookingByUser);
route.put("/UpdateBookingStatus/:bid", UpdateBookingStatus);
route.delete("/DeleteBooking/:bid", DeleteBooking);

export default route;




