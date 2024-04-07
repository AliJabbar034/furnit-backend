const userModel = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");


const responseUser={
    name:"",
    email:""
}

exports.registerUser= catchAsync(
    async(req,res,next)=>{

        const {name, email, password}=req.body;

        const user = await userModel.create({
            name,email,password
        })

        if (!user){
            return next(new ErrorHandler("couldn't create user", 500))
        }


        const token= await user.generateJwtToken()

         responseUser.email=user.email;
         responseUser.name=user.name


         return res.status(200).json({
            user:responseUser,
            token:token
         })
    }
)


exports.loginUser= catchAsync(
    async(req,res,next)=>{
        const {email,password}= req.body;


        const userExist = await userModel.findOne({email}).select("+password");
        if (!userExist){
            return next(new ErrorHandler("invalid credentials",401))
        }

        const isMatch= await userExist.compareHashPassword(password,userExist.password);
        if (!isMatch){
            return next(new ErrorHandler("invalid credentials", 401))
        }


        const token = await userExist.generateJwtToken();
         
        responseUser.name=userExist.name;
        responseUser.email=userExist.email

        return res.status(200).json({
            user:responseUser,
            token:token
        })



    }
)

exports.getProfile= catchAsync(
    async(req,res,next)=>{

        const user= req.user;

        responseUser.name=user.name;
        responseUser.email= user.email

        return res.status(200).json({
           user:responseUser
        })
    }
)



