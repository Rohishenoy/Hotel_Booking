import mongoose from "mongoose";

const reviewschema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    hotel:{type:mongoose.Schema.Types.ObjectId,ref:"Hotel",required: true},
    rating:{type:Number,required:true,min:1,max:5},
    review:{type:String},
    status:{type:String,enum:["active","hidden"],default:"active"}
},{timestamps:true})

export default mongoose.model("Review", reviewschema);