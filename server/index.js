import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import mongoose from "mongoose";
import app from "./app.js"

// Load environment variables
dotenv.config({
     path: "/.env" }); // since .env is in the same folder

// Connect to MongoDB
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port `,process.env.PORT)
    })
})
.catch((err)=>{
    console.log("connection failed !!!!!",err)
})// returns a promise as we have the async method so use then and catch
// till now server has not started only the db is connected , "then" is used in which "app listens"

  
















// import express from "express"
// const app=express()

// (async ()=>{
//     try {
//       await  mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_NAME}`)

//       app.on("error", (error)=>{
//         console.log("error:")
//         throw error
//       })
//     } catch (error) {
//         console.log("error",error)
//         throw error
        
//     }
// })()