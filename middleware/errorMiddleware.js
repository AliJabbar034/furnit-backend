const { MongooseError } = require("mongoose")


const errorMiddleware= function(err,req,res,next){

//  if (err instanceof MongooseError){
//     err.statusCode= err.statusCode || 500
//  }

    return res.status(err.statusCode || 500 ).json({
        error:err.message
    })
}

module.exports=errorMiddleware;