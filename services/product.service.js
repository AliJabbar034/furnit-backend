const ProductModel = require("../models/product.model");
const catchAsync = require("../utils/catchAsync");

exports.getAllProductService= async(req)=>{
    const query={};

    const sort={createdAt:-1}

    const queryParams=req.query;
    const page= Number(queryParams.page) || 1
    const limit = 10;

    const skip =(page-1) * limit


    

  
    if(queryParams.title !==undefined){
        query["title"]=queryParams.title
    }
    if(queryParams.price){
       
        for(let key in queryParams.price){
            if(key==="lt"){
                queryParams.price["$lt"]=queryParams.price[key]
                delete queryParams.price[key]
            }
            if(key==="gt"){
                queryParams.price["$gt"]=queryParams.price[key]
                delete queryParams.price[key]
            }
            if(key==="eq"){
                queryParams.price["$eq"]=queryParams.price[key]
                delete queryParams.price[key]
            }
        
        }

       
        query["price"]=queryParams.price
    }
    if(query.colors){
        query["colors"]= query.colors;
    }
    
    if(queryParams.sort){
        sort["price"]=Number(queryParams.sort)
    }

    // console.log(query);
    // console.log(sort);

    
    const products= await ProductModel.find(query).sort(sort).limit(limit).skip(skip).select('-createdAt -updatedAt -__v');
   
    return products;
}