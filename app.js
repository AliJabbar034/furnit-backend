const express = require('express');
const cors=require('cors')
const bodyParser= require('body-parser')
const morgan=require('morgan');
const productRouter = require('./routes/product.routes');
const reviewRouter = require('./routes/review.routes');
const userRouter = require('./routes/user.routes');
const path= require('path')
const errorMiddleware = require('./middleware/errorMiddleware');
const orderRouter = require('./routes/order.routes');

require('dotenv').config()



const app=express();
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.json(bodyParser.urlencoded({extended:true})))
app.use(morgan('dev'))
app.use(cors("*"))


app.use("/api/v1/user",userRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/reviews",reviewRouter)
app.use("/api/v1/order",orderRouter)

app.get("/",(req,res)=>{
   
    res.status(200).json({
        message:"Welcome to EXpress Js"
    })
})



app.use(errorMiddleware)

module.exports=app;