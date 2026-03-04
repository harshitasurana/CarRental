import mongoose from "mongoose";

const connectDb = async ()=>{
    try{
        mongoose.connection.on('connected',()=> console.log("Database Connected")
        )
        await mongoose.connect(`mongodb+srv://harshitasurana:root@cluster0.d0ujkoj.mongodb.net/car-rentel`)
    }
    catch (err){
        console.log(err.message);
        
    }
}

export default connectDb