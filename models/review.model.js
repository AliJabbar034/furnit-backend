
const mongoose=require('mongoose');

const reviewSchema= new mongoose.Schema({
    title:{
        type:String,

    }, description:{
        type:String
    },
    rating:{
        type:Number
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        required:true
    }

},{
    timestamps:true
})


reviewSchema.pre('save',  async function(next){

    await this.constructor.updateProductAverageRating(this.productId);

    next()

})

reviewSchema.pre('deleteOne', async function(next){
    await this.constructor.updateProductAverageRating(this.productId)
    next()
} )


reviewSchema.statics.updateProductAverageRating = async function(productId) {
    try {
        const Product = mongoose.model('ProductModel'); 

       
        const aggregation = await this.aggregate([
            { $match: { productId } },
            { $group: { _id: "$productId", averageRating: { $avg: "$rating" } } }
        ]);

        const averageRating = aggregation.length > 0 ? aggregation[0].averageRating : 0;

        await Product.findByIdAndUpdate(productId, { averageRating });
    } catch (error) {
        console.error('Error updating product average rating:', error);
    }
};



const ReviewModel= mongoose.model("ReviewModel",reviewSchema)

module.exports=ReviewModel