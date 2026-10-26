import express from "express";

import {ConfirmPayment} from "../Controller/payment_controller.js";

const route = express.Router();

route.post("/ConfirmPayment",ConfirmPayment);

export default route;



