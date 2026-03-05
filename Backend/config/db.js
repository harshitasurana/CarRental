import mongoose from "mongoose";


const connectDb = async () => {
    try {

        await mongoose.connect('mongodb+srv://harshitasurana2005:root@cluster0.rhysitg.mongodb.net/Car-Rental-App');

        console.log("Database Connected");

    } catch (err) {
        console.log("Database connection error:", err.message);
    }
};

export default connectDb;