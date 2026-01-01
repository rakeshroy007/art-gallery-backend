import mongoose from "mongoose" ;
// const mongoURI = "mongodb://127.0.0.1:27017/artGallery"
import dotenv from "dotenv";

// This line loads your .env variables
dotenv.config();

const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;

console.log("object", MONGODB_ATLAS_URI )
const connectToMongo = async () => {
    if (!MONGODB_ATLAS_URI) {
        console.error("Error: MONGODB_ATLAS_URI is not defined in .env file");
        process.exit(1);
    }
    
    try {
        await mongoose.connect(MONGODB_ATLAS_URI)
        console.log("Connected to MongoDB Atlas successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
        process.exit(1); // Exit with failure code
    }
}

export default connectToMongo ;