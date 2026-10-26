
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
    hotel: {type: mongoose.Schema.Types.ObjectId,ref: "Hotel",required: true},
    location: {type: String,required: true},
    roomType: {type: String,required: true},
    arrival: {type: Date,required: true},
    departure: {type: Date,required: true},
    rooms: {type: Number,default: 1},
    adults: {type: Number,default: 1},
    children: {type: Number,default: 0},
    totalAmount: {type: Number,required: true},
    bookingStatus: {type: String,enum: ["pending", "approved", "rejected", "cancelled"],default: "pending"}

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
