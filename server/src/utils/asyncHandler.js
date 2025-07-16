const asyncHandler=(requesthandler)=>{
    (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).catch((err)=>next(err))
    }
}// fn and func written in form of requesthandler


export {asyncHandler}


// const asyncHandler=(fn)=>async (req,res,next)=>{
//     try {
//         await fn(req,res,next)// this is the wrapper function which is everywhere ahead 
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }
// higher order function 