import express from "express";

import {
    ConfirmPayment,
    ViewPayment,
    MonthlyRevenue,
    DeletePayment
} from "../Controller/payment_controller.js";

const route = express.Router();

route.post("/ConfirmPayment", ConfirmPayment);
route.get("/ViewPayment", ViewPayment);
route.get("/MonthlyRevenue", MonthlyRevenue);
route.delete("/DeletePayment/:pid", DeletePayment);

export default route;


