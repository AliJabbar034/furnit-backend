const mongoose=require('mongoose')
const jsonToken= require('jsonwebtoken');
const bcrypt= require('bcrypt')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minLength:6,
        select:false,

    },
    role:{
        type:String,
        default:"user"
    }
},{
    timestamps:true
})

userSchema.pre("save", async function(next){

    console.log("prev save");
    if (!this.isModified('password')){
        return next()
    }

    this.password = await bcrypt.hash(this.password,10);
    next()

})


userSchema.methods.generateJwtToken=  async function(){

const token = await jsonToken.sign({_id:this._id},process.env.SECRET_KEY , {expiresIn:"30d"})

return token

}

userSchema.methods.compareHashPassword= async function(enteredpass, userPass){
    
    const isMatch= await bcrypt.compare(enteredpass,userPass);
    return isMatch;

}

const userModel= mongoose.model("userModel",userSchema);

module.exports=userModel