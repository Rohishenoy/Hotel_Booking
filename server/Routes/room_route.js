import express from "express";

import {AddRoom,ViewRoom,ViewRoomByHotel,GetRoomById,UpdateRoom,DeleteRoom,ViewAvailableRoom,ViewBookedRoom} from "../Controller/room_controller.js";

const route = express.Router();


// Add Room
route.post("/AddRoom", AddRoom);

// View All Rooms
route.get("/ViewRoom", ViewRoom);

// View Rooms By Hotel
route.get("/ViewRoomByHotel/:hotel", ViewRoomByHotel);

// Get Room By ID
route.get("/GetRoomById/:rid", GetRoomById);

// Update Room
route.put("/UpdateRoom/:rid", UpdateRoom);
// Delete Room
route.delete("/DeleteRoom/:rid", DeleteRoom);

route.get("/ViewAvailableRoom/:hotel", ViewAvailableRoom);

route.get("/ViewBookedRoom/:hotel", ViewBookedRoom);
export default route;