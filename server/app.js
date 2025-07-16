import express from "express"


// data comes through req.params and req.body
// sometimes data is also taken through cookies cookie parser and cors 
// now install cookie parser
// app.use used when middleware or the config settings is done 
import cors from "cors"
import cookieParser from "cookie-parser"
// now how to configure them ?? these are configured after making the app

const app=express()

// app.use(cors()) here is it ok but also some more changes and setting can be done 
//origin to allowed 

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

// data is to be coming so some required and json required 
app.use(express.json({
    limit:"20kb"
}))// config doing middleware is there json is accepting previously body parser was used but not now this is the data of form 


// now data is coming from the url 
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))// directly available 

// some files and pdf are to be stored public assets 
app.use(express.static("public"))// alredy this folder is made with gitkeep

// now cookieparser - user server cookies to be set and crud operations can be performed 
app.use(cookieParser())







export default app
