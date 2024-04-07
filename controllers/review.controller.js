const ReviewModel = require("../models/review.model");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");


exports.createReview= catchAsync(
    async(req,res,next)=>{

        const {productId}= req.params;

        const {title,description, rating}= req.body;

        const review = await ReviewModel.create({
            title,
            description,
            rating,
            productId
        })

        if (!review){
            return next(new ErrorHandler("could't create review", 500))
        }

        return res.status(200).json({
            message:"review created succesffully"
        })

    }
)


exports.getAllReviews= catchAsync(
    async(req,res,next)=>{
        
        const {productId}= req.params;

        const reviews = await ReviewModel.find({productId:productId});
        if (reviews.length ===0){
            return next(new ErrorHandler("no review found",404) )
        }

        return res.status(200).json({
            reviews
        })
    }
)