import mongoose from "mongoose";
import { configDotenv } from "dotenv";
// const MONGO_URL="mongodb://localhost:27017/hotel-management_project"
configDotenv()
const databaseconnection = async()=>{
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL environment variable is required");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
}

export default databaseconnection