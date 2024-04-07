const express = require('express');
const cors=require('cors')
const bodyParser= require('body-parser')
const morgan=require('morgan');

require('dotenv').config()



const app=express();

app.use(bodyParser.json(bodyParser.urlencoded({extended:true})))
app.use(morgan('dev'))
app.use(cors("*"))


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Welcome to EXpress Js"
    })
})





module.exports=app;