import mongoose from "mongoose";


const connectDb = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        

    } catch (err) {
        console.log("Database connection error:", err.message);
    }
};

export default connectDb;