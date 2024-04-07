

const express= require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/user.controller');
const Authenticate = require('../middleware/authenticate');

const userRouter= express.Router();

userRouter.route("/").post(registerUser)
userRouter.route("/me").get( Authenticate,getProfile)
userRouter.route("/login").post(loginUser)


module.exports=userRouter