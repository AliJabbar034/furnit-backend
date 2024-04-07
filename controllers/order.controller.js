const OrderModel = require("../models/order.model");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");



exports.createOrder= catchAsync(
    async(req,res,next)=>{

        req.body.userId= req.user._id

        const order= await OrderModel.create(req.body);

        if (!order){
            return next(new ErrorHandler("couldn't create order",500))
        }


        return res.status(201).json({
            order
        })

    }
)