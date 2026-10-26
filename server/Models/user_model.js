import mongoose from "mongoose";

const userschema= new mongoose.Schema({
   name:{type:String,default:"unknown"} ,
    email:{type:String,unique:true,required:true},
    phone:{type:Number},
    password:{type:String},
    address:{type:String},
    profileimage:{type:String,required:false}
})
export  default mongoose.model('User',userschema)