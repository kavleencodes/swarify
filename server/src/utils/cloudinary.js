// file comes through the file system and gives the path of the local file and also the file has to be removed from the local file system 
import {v2 as cloudinary} from "cloudinary";
import fs from "fs"//file system management file path important option unlink 

// as cloudinary here is the custom name 
import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name:CLOUDINARY_CLOUD_NAME , 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET
    });
}
)


const uploadoncloud=async(localfilepath)=>{
    try {
        if(!localfilepath) return null
        // upload 
        const response=await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto" //option setting 
        })
        // file upload success
        return response
    } catch (error) {
        fs.unlinkSync(localfilepath)// remove the local storage file 
        
    }
}    

// multer in the middleware 
  