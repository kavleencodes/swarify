import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.models.js";
import uploadoncloud from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccesstoken()
        const refreshToken = user.generateRefreshtoken()

        user.refreshtoken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registeruser = asyncHandler(async (req, res) => {
    // 1. Get user details from request
    const { username, email, password } = req.body;

    // 2. Validate that no fields are empty
    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Username, email, and password are required");
    }

    // 3. Check if user already exists in the database
    const existeduser = await User.findOne({ $or: [{ username }, { email }] });
    if (existeduser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    // 4. Get file paths from multer
    const avatarlocalPath = req.files?.avatar?.[0]?.path;
    const coverimagelocalpath = req.files?.coverimage?.[0]?.path; // Correct lowercase name

    if (!avatarlocalPath) {
        throw new ApiError(400, "Avatar file is mandatory");
    }

    // 5. Upload files to Cloudinary (this is now safe)
    const avatar = await uploadoncloud(avatarlocalPath);
    const coverimage = await uploadoncloud(coverimagelocalpath); // This will return null if no file was provided

    if (!avatar) {
        // This checks if the uploadoncloud function itself failed
        throw new ApiError(500, "Failed to upload avatar, please try again");
    }

    // 6. Create user object and save to database
    const user = await User.create({
        username,
        email,
        password, // The model should handle hashing this automatically (using a pre-save hook)
        avatar: avatar.url,
        coverimage: coverimage?.url || "" // Safely access the URL, provide empty string if no cover image
    });

    // 7. Fetch the created user from DB but remove sensitive fields
    const createduser = await User.findById(user._id).select("-password -refreshtoken");

    if (!createduser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // 8. Send a success response back to the client
    return res.status(201).json(
        new ApiResponse(201, createduser, "User registered successfully")
    );
});




const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, username, password} = req.body
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
}

const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

const options = {
    httpOnly: true,
    secure: true
}

return res
.status(200)
.cookie("accessToken", accessToken, options)
.cookie("refreshToken", refreshToken, options)
.json(
    new ApiResponse(
        200, 
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully"
    )
)

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshaccesstoken=asyncHandler(async(req,res)=>{
    // i have this token 
    // we need the refresh token accessed via cookies 
    const incomingrefreshtoken=req.cookies.refreshToken || req.body.refreshToken

    if(!incomingrefreshtoken){
        throw new ApiError(401, "authorized request ")
    }

    // verifying the token now usin jwt we need the raw token stored in the db
    try {
        const decodedtoken=jwt.verify(
            incomingrefreshtoken,
            process.env.REFRESH_TOKEN_SECRET
            // after this we will get a decoded token 
        ) 
    
        // to find the user using the decoded token from the refresh token 
        const user=await User.findById(decodedtoken?._id)
    
        if(!user){
            throw new ApiError(401,"invalid refresh token ")
        }
        if(incomingrefreshtoken!==user?.refreshtoken){
             throw new ApiError(401,"refresh token is expired or used ")
    
        }
    
        const options={
            httpOnly:true,
            secure:true
        }
        const{accessToken,newrefreshToken}=await generateAccessAndRefereshTokens(user_.id)
        return res.
        status(200)
        .cookie("accesstoken",accessToken,options)
        .cookie("refreshtoken", newrefreshToken,options ).json(
            new ApiResponse(
                200,{
                    accessToken,refreshToken:newrefreshToken
                },"access token refreshed "
            )
        )
    } catch (error) {
        throw new ApiError(401,"error in the refresh token part ")
    }
      
})


// update and the other functions 
const changecurrentpassword=asyncHandler(async(req,res)=>{
    const {oldpassword,newpassword}=req.body// write the confirmpassword with new pass

    // if(newpassword!==confpassword){
    //     throw new ApiError(400,"password does not match!")
    // }

    // if the person is able to cheange the passwords he/she is logged in the the platform as auth.middleware works 
    
   const user= User.findById(req.user?.id)
   const isPasswordCorrect=user.isPasswordCorrect(oldpassword)// return true or false 

   if(!isPasswordCorrect){
    throw new ApiError(401,"INVALID PASSWORD !!!")
   }

   // NEW password
   user.password=newpassword// it is saving so the pre hook has to run this is set not saved 
   await user.save({validateBeforeSave:false}) // db 

   return res
   .status(200)
   .json(
    new ApiResponse(200, {}, "Password change successfully !!")
   )
    
})

// we need to get current the user!! we have the middleware if loggedin 
const getcurrentuser=asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(200,req.user,"current user fetched successfully!! ")
}) 

const updateaccountdetails=asyncHandler(async(req,res)=>{
    const {username,email}=req.body

    if(!username || !email){
        throw new ApiError(400,"ALL THE FIELDS ARE REQUIRED !! ")
    }

    const user=User.findByIdAndUpdate(
        req.user?.id,
    {
        // here to write the operator mongo db operators
        $set:{
            username:username,
            email:email
        }
    },
    {
        new:true// after update the new info returns 
    }
  ).select("-password")

  return res
  .status(200)
  .json(new ApiResponse(200,user,"ACCOUNT DETAILS UPDATED SUCESSFULLY!!"))

})

// for files update we will use the multer middleware 
// const updateuseravatar=asyncHandler(async(req,res)=>{
//     const avatarlocalPath=req.file?.path
    
// })

export { registeruser, loginUser,logoutUser ,
    refreshaccesstoken,
    changecurrentpassword,
    getcurrentuser,
    updateaccountdetails

};