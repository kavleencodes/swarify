import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import mongoose from "mongoose";

// Load environment variables
dotenv.config({
     path: "/.env" }); // since .env is in the same folder

// Connect to MongoDB
connectDB();

  
















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