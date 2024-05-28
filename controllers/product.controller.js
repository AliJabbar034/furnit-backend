const ProductModel = require("../models/product.model");
const { getAllProductService } = require("../services/product.service");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const path= require('path')


exports.createProduct = catchAsync(
    async(req,res,next)=>{
       

       
        const uploadedFiles = req.files;
    const uploadedPaths = uploadedFiles.map((file) => file.path);


        const {title,description,price,colors}=req.body;

        const product = await ProductModel.create({
            title,
            description,
            price,
            images:uploadedPaths,
            colors
           
        })
        if (!product){
            return next(new ErrorHandler("could't create product",500))
        }

        return res.status(201).json({
            message:"Product created Succesffuly",
            product
        })

    }
)


exports.getAllProduct= catchAsync(
    async(req,res,next)=>{
        
        const products = await getAllProductService(req)
        if (!products){
            return next(new ErrorHandler("no product found",404))
        }
        
        return res.status(200).json({
            products
        })

    }
)


exports.getAProduct= catchAsync(
    async (req,res,next)=>{
        const {productId}= req.params;
        const product = await ProductModel.findById(productId).select('-createdAt -updatedAt -__v');

        if (!product){
            return next(new ErrorHandler("not product found",404))
        }

        return res.status(200).json({
            product
        })
    }
)













