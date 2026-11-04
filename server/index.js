import express from 'express'

import URoute from './Routes/user_route.js'
import BRoute from "./Routes/booking_route.js";
import PRoute from "./Routes/payment_route.js";
import HRoute from "./Routes/hotel_route.js";
import RORoute from "./Routes/room_route.js";
import RERoute from "./Routes/review_route.js";
import LRoute from './Routes/location_route.js'
import ARoute from './Routes/admin_route.js'
import CRoute from './Routes/contact_route.js'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import databaseconnection from './Database/database.js';

configDotenv();
const app=express();

app.use(cors())
app.use(express.json())
app.get('/',(_req,res)=>{
    res.status(200).json({success:true,message:"Hotel booking API is running"})
})
app.use('/User',URoute)
app.use('/image',express.static('./Uploads'))
app.use('/Booking',BRoute);
app.use('/Payment',PRoute);
app.use("/Hotel",HRoute);
app.use("/Room",RORoute);
app.use("/Review",RERoute);
app.use("/Location",LRoute);
app.use('/Admin',ARoute)
app.use('/Contact',CRoute)

const port=process.env.PORT || process.env.PORT_NUMBER || 7009

try {
    await databaseconnection()
    app.listen(port,()=>{
        console.log(`Server is running on port number: ${port}`)
    })
} catch (error) {
    console.error("Unable to start server:",error)
    process.exit(1)
}