// asynchandler everything not in the try catch which was the helper file
import asyncHandler from "../utils/asyncHandler.js"

const registeruser=asyncHandler(async(req,res)=>{
     res.status(200).json({
        message:"swarify"// we are able to do the work using this // next step is to create the route // we check if the return will help solving the error but not check asynchandler
        // we decide what we get the message 
    })
})

export {registeruser}