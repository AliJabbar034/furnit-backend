
const mongoose=require("mongoose")


const connectDB = async ()=>{

    try {

        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("connection successfull");
        
    } catch (error) {

        console.log("couldn't connect to database");
        console.log("shutting down server.......");
        process.exit(1)
        
    }
}

module.exports=connectDB