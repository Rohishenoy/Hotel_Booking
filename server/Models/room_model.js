import mongoose from "mongoose";

const roomschema = new mongoose.Schema({
    hotel:{type:mongoose.Schema.Types.ObjectId,ref:"Hotel",required:true},
    roomtype:{type:String,required:true},
    price:{type:Number,required:true},
    capacity:{type:Number},
    description:{type:String},
    image:{type:String},
    status:{type: String,enum: ["available", "booked", "inactive"],default: "available"}
});

export default mongoose.model("Room", roomschema);
