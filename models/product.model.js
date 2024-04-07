const mongoose=require('mongoose')


const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,

    }
    , price:{
        type:Number,
        required:true
    },
    images:[String],
    totalReviews:{
        type:Number
    },
    averageRating:Number,

},{
    timestamps:true
})


const ProductModel= mongoose.model("ProductModel",productSchema)

module.exports=ProductModel