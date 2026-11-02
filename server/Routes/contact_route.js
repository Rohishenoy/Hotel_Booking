import express from "express";
import {
    DeleteContact,
    SubmitContact,
    ViewContact
} from "../Controller/contact_controller.js";

const route = express.Router();

route.post("/SubmitContact", SubmitContact);
route.get("/ViewContact", ViewContact);
route.delete("/DeleteContact/:id", DeleteContact);

export default route;
