
const mongoose=require("mongoose")


const connectDB = async ()=>{

    try {

        console.log(process.env.MONGODB_URI);
        await mongoose.connect(`${process.env.MONGODB_URI}`,{
            useNewUrlParser: true,
          
        });
        console.log("connection successfull");
        
    } catch (error) {

        console.log("couldn't connect to database");
        console.log("shutting down server.......");
        process.exit(1)
        
    }
}

module.exports=connectDB