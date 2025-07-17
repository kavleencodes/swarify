const asyncHandler=(requesthandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).catch((err)=>next(err))
        // we have to return the function also 
    }
}// fn and func written in form of requesthandler


export default asyncHandler


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