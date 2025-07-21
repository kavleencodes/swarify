// to check whether the user is there or not 

import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        
   
    //cookies are accessed by cookie parser in the app file
    const token =req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")// it is possible that cookies are not accessible or check header

    if(!token){
        throw new ApiError(401,"unauthorized acess")
    }
    const decodedtoken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

   const user= await User.findById(decodedtoken?._id)
   .select("-password -refreshtoken" )

   if(!user){
    // frontens 
    throw new ApiError(401,"invaliD access token ")
   }
   req.user=user;
   next()
} 


catch (error) {
    throw new ApiError(401,"invalid acess token ")
        
}


})