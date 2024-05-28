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
    colors:[String],
    images:[String],

    averageRating:{
        type:Number,
        default:0
    },
    // averageRating:Number,

},{
    timestamps:true
})


const ProductModel= mongoose.model("ProductModel",productSchema)

module.exports=ProductModel