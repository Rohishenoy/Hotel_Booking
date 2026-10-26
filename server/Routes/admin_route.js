import express from "express";
import { InsertAdmin, Login } from "../Controller/admin_controller.js";

const route = express.Router();

route.post("/InsertAdmin", InsertAdmin);
route.post("/Login", Login);

export default route;