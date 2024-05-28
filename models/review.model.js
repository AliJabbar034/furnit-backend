
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

  try {
      await this.constructor.updateProductAverageRating(this.productId);

    next()

  } catch (error) {
     console.log(error.message);

     
  }
})

reviewSchema.pre('deleteOne', async function(next){
    const query= this.find();
    await this.constructor.updateProductAverageRating(this.productId)
    next(query)
} )


reviewSchema.post("deleteOne", function (){

    
})


reviewSchema.statics.updateProductAverageRating = async function(productId) {
    try {
        const Product = mongoose.model('ProductModel'); 

       
        const aggregation = await this.aggregate([
            { $match: { productId } },
            { $group: { _id: "$productId", averageRating: { $avg: "$rating" } } }
        ]);

        const averageRating = aggregation.length > 0 ? aggregation[0].averageRating : 0;


      const updatedProdct=  await Product.findByIdAndUpdate(productId, { averageRating },{new:true});
     
    } catch (error) {
        console.error('Error updating product average rating:', error);
    }
};



const ReviewModel= mongoose.model("ReviewModel",reviewSchema)

module.exports=ReviewModel