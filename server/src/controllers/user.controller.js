// asynchandler everything not in the try catch which was the helper file
import asyncHandler from "../utils/asyncHandler.js"

import {ApiError} from "../utils/ApiError.js"

import User from "../models/user.models.js"

import uploadoncloud from "../utils/cloudinary.js"

import ApiResponse from "../utils/ApiResponse.js"


const registeruser=asyncHandler(async(req,res)=>{

    //  res.status(200).json({
    //     message:"swarify" // we are able to do the work using this // next step is to create the route // we check if the return will help solving the error but not check asynchandler
        // we decide what we get the message 
    // })


  // now the logic 
  // steps 
  // 1 get the user details from the front end 
  // 2  validation username empty , email etc -not empty
  // 3 check if user already exist -easiest to check from the email 
  // 4 check if file is not there or there images etc
  // 5 upload them to cloudinary 
  // 6 checking on the cloud avatar create user object 
  // 7 create obj-create db entry 
  //8 res is to go to the frontend also -remove password and refresh token field 
  // 9 check for the response , user created successfully or not -return response or return error 

  //get user details data can be through url, form 
  const{username, email,password}=req.body;
  console.log(req.body)
  console.log(req.files)

  console.log("email", email) 
  //file handling is also be done // done in thr route importing multer 

  if(username===""){
    throw new ApiError(400,"username is req!!!")


  }

  // now to check if user exists or not import user
  const existeduser= await User.findOne({
    $or:[{username},{email}]
}) //check the username and email

if(existeduser){
    throw new ApiError(409,"username already exists ")
    
}

console.log(req.files)
// avatar check // we need the first prop of the avatar
// const avatarlocalpath=req.files?.avatar[0]?.path// till now not on the server
const avatarlocalPath  = req.files?.avatar?.[0]?.path;

// const coverimglocalpath=req.files?.coverimage[0]?.path// can exist or cannot

const coverimglocalpath = req.files?.coverImage?.[0]?.path || "";


// let coverimglocalpath;
// if(req.files && Array.isArray(req.files.coverimage) && req.files.coverimage.length>0){
//    coverimglocalpath=req.files.coverimage[0].path
// }

// check for avatar
if(!avatarlocalPath){
    throw new ApiError(400,"avatar file is req!!!")
}

// now upload to cloudinary
// import the cld file 
 const avatar=await uploadoncloud(avatarlocalPath)// this will take time so await 

 const coverimage= await uploadoncloud(coverimglocalpath)
 // again check for avatar
 if(!avatar){
    throw new  ApiError(400, "avatar is reqd!!!")
 }

 // now make the obj and make the db entry only the user is taking to the db 
  const user =await User.create({
    username,
    avatar:avatar.url,
    coverimage:coverimage?.url|| "",//here url is not reqd bec we have not checked the possiblity
    email,
    password
 })// check if the user is made 
 // mongodb gives the _id field with every entry 
 const createduser=await User.findById(user._id).select(
    "-password -refreshtoken"
 )
 // and now remove the password using the chaining with the above only here we write the filds what we do not want 


 // check for the user
 if(!createduser){
    throw new ApiError(500, "something went wrong ")
 }

 return res.status(201).json(
    new ApiResponse(200,createduser,"User regd success fully")
 )
// .status is the better way of sending the res
})

// if we donot send the cover image then there is undefined error check with if-else


export {registeruser}