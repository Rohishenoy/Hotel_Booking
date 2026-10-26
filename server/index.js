import express from 'express'

import URoute from './Routes/user_route.js'
import BRoute from "./Routes/booking_route.js";
import PRoute from "./Routes/payment_route.js";
import HRoute from "./Routes/hotel_route.js";
import RORoute from "./Routes/room_route.js";
import RERoute from "./Routes/review_route.js";
import LRoute from './Routes/location_route.js'
import ARoute from './Routes/admin_route.js'

import cors from 'cors'
import databaseconnection from './Database/database.js';


const app=express();

const PORT_NUMBER= 7009

app.listen(PORT_NUMBER,()=>{
    console.log(`Server is running on port number: ${PORT_NUMBER}`)
})



databaseconnection()
app.use(cors())

app.use(express.json())
app.use('/User',URoute)
app.use('/image',express.static('./Uploads'))
app.use('/Booking',BRoute);
app.use('/Payment',PRoute);
app.use("/Hotel",HRoute);
app.use("/Room",RORoute);
app.use("/Review",RERoute);
app.use("/Location",LRoute);
app.use('/Admin',ARoute)

const route = express.Router()