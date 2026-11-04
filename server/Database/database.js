import mongoose from "mongoose";
import { configDotenv } from "dotenv";
// const MONGO_URL="mongodb://localhost:27017/hotel-management_project"
configDotenv()
const databaseconnection = async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database connected successfully!!!!")
} catch (err) {
    console.log(err)
}
}

export default databaseconnection