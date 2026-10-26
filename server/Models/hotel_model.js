import mongoose from "mongoose";

const hotelschema = new mongoose.Schema({
    hotelname:{type:String,required:true},
    location:{type: mongoose.Schema.Types.ObjectId,ref:"Location",required:true},
    address:{type: String},
    description:{type:String},
    image:{type:String},
    phone:{type:Number},
    email:{type:String},
    status:{type:String,default: "active"}
});

export default mongoose.model("Hotel", hotelschema);