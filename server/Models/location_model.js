import mongoose from "mongoose";

const locationschema =new mongoose.Schema({
    location:{type:String,required:true,unique:true},
    status:{type:String,default:"active"}
})

export default  mongoose.model('Location',locationschema)