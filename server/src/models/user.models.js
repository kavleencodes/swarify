

import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar:{
    type:String, // cloudinary url is to be used here 
    required:true
},
coverimage:{
    type:String
},
  watchhistory:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }
], 
refreshtoken:{
  type:String
}
 
}, { timestamps: true });

// package bcrypt-core nodejs package 
// bcryptjs optimized js code mostly used 
// it helps in hashing the password as our problem was also converting the password and then again decoding the password 
// for token jsonwebtoken to make the token this package secret makes evry token different

// direct encryption is not possible so we take the help of some hooks -pre just do something befor saving the data ex save password 
userSchema.pre("save",async function(next){

    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10)
    next()
}) 
// password also takes time so the await  

// save is basically the event used . do not use arrow function as we do not have the context of this in the arrow func and next important ki pass the flag next. this knows all the fields. hash needs two things -what to hash and the no of rounds. whenver the data is even edited the password will be changed everytime. change only when the password id sent

// some (methods) can also be done . methods- is given by the schema some custom methods can also be made 
userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)// this is true or false 
}


// jwt is a bearer token it is like a key the one who has the token data is send there 

// env variable access token secret cpmlec string written 
// access token not stored in data base but refresh token stored in database 

userSchema.methods.generateAccesstoken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username //payload
    },
    process.env.ACCESS_TOKEN_SECRET ,//access token and also the expiry 
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    } // this function can be async also

)
}

userSchema.methods.generateRefreshtoken=function(){// refresh token only less info
    _id:this._id


}
export default mongoose.model("User", userSchema);

// now file handling not done on the server
// file handling not done on the server what is the rate of the calculation etc
// cloudinary is through multer . using the multer we take the files from the user and keep them on the server and then through cloudinary on the  cloud from local storage to server   