import mongoose from "mongoose";

async function Db() {
    try {
        const connect  = await mongoose.connect(process.env.MONGO_URI)
        if(connect){
            console.log("MongoDB Connected");
        }
    } catch (error) {
        console.log("Error to connect DB", error)
    }
    
}

export default Db