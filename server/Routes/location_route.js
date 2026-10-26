import express from "express";

import{AddLocation,ViewLocation,GetLocationById,UpdateLocation,DeleteLocation} from "../Controller/location_controller.js";

const route = express.Router();

// Add Location
route.post("/AddLocation", AddLocation);
// View All Locations
route.get("/ViewLocation", ViewLocation);
// Get Location By ID
route.get("/GetLocationById/:lid", GetLocationById);
// Update Location
route.put("/UpdateLocation/:lid", UpdateLocation);
// Delete Location
route.delete("/DeleteLocation/:lid", DeleteLocation);


export default route;
