const AuthorizeRole= async (...role)=>{
    return (req,res,next)=>{

        if (!role.includes(req.user.role)){
                return res.status(401).json({
                    message:"unauthorize access"
                })
        }

        next()
       
        

    }
}

module.exports=AuthorizeRole