const userModel = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

const jwt= require('jsonwebtoken')



const Authenticate= catchAsync(
    async(req,res,next)=>{
        const authHeader = req.headers["authorization"];



        if (!authHeader || !authHeader.startsWith("Bearer ")){
            return next(new ErrorHandler("unauthorize access",401))
        }

        const token= authHeader.split(' ')[1];

    




        const tokenData= await jwt.verify(token,process.env.SECRET_KEY);

        if(Date.now() > tokenData.exp * 1000) {
            return next(new ErrorHandler("unauthorixe access",401))
        }

        const _id= tokenData._id;


        const user= await userModel.findById(_id)


        if (!user){
            return next(new ErrorHandler("unauthorize access",401))
        }


        req.user=user;

        next()




        
    }
)


module.exports=Authenticate;