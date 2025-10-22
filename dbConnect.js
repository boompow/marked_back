import mongoose from "mongoose";
import "dotenv/config";

const dbConnect = async()=>{
    try {
        mongoose.connection.on("error", (err) => {
            console.log(`Failed connection \n ${err}`);
        });

        mongoose.connection.on("connected", () => {
            console.log("200: connected to MongoDB Atlas successfully!");
        });

        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log("Failed to connect", error)
    }


}

export default dbConnect;