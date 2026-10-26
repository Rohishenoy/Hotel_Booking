import mongoose from "mongoose";

const MONGO_URL="mongodb://localhost:27017/hotel-management_project"

const databaseconnection = async()=>{
try {
    await mongoose.connect(MONGO_URL)
    console.log("Database connected successfully!!!!")
} catch (err) {
    console.log(err)
}
}

export default databaseconnection