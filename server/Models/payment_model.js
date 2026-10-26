import mongoose from "mongoose";

const paymentschema = new mongoose.Schema({
     booking:{type:mongoose.Schema.Types.ObjectId,ref:"Booking",required:true},
     user:{type: mongoose.Schema.Types.ObjectId,ref:"User",required:true},
     amount:{type:Number,required:true},
     paymentMethod:{type:String,enum:["COD","UPI","Card"],required:true },
     paymentStatus:{type:String,enum:["pending","paid","failed"],default:"pending"},
     transactionId:{type:String}
},{timestamps:true})

export default mongoose.model("Payment",paymentschema)