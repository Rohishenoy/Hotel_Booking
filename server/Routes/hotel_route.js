import express from "express";

import {AddHotel,ViewHotel,FilterHotelByLocation,GetHotelById,UpdateHotel,DeleteHotel} from "../Controller/hotel_controller.js";

const route = express.Router();


import upload from '../Middleware/imageupload.js'

route.post("/AddHotel",upload.single('image'), AddHotel);

route.get("/ViewHotel", ViewHotel);

route.get("/FilterHotelByLocation", FilterHotelByLocation);

route.get("/GetHotelById/:hid", GetHotelById);

route.put("/UpdateHotel/:hid",upload.single('image'), UpdateHotel);

route.delete("/DeleteHotel/:hid", DeleteHotel);

export default route;