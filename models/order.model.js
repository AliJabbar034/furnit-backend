

const mongoose= require('mongoose');

const orderSchema= new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    address:{type:String},
    zipCode:{type:Number},
    phoneNo:{type:Number},
    state:{type:Number},
    totalPrice:{type:Number},
    quantity:{type:Number},
    productId:{type:mongoose.Schema.ObjectId,required:true},
    userId:{type:mongoose.Schema.ObjectId,required:true}
},{
    timestamps:true
})


const OrderModel = mongoose.model("OrderMOdel",orderSchema)
module.exports = OrderModel