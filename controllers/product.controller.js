const ProductModel = require("../models/product.model");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");


exports.createProduct = catchAsync(
    async(req,res,next)=>{
       
        const {title,description,price,}=req.body;

        const product = await ProductModel.create({
            title,
            description,
            price
        })
        if (!product){
            return next(new ErrorHandler("could't create product",500))
        }

        return res.status(201).json({
            message:"Product created Succesffuly"
        })

    }
)





