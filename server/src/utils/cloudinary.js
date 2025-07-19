// file comes through the file system and gives the path of the local file and also the file has to be removed from the local file system 
// import {v2} from "cloudinary";
// import fs from "fs"//file system management file path important option unlink 

// // as cloudinary here is the custom name 
// import { v2 as cloudinary } from 'cloudinary';

// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name:CLOUDINARY_CLOUD_NAME , 
//         api_key: CLOUDINARY_API_KEY, 
//         api_secret: CLOUDINARY_API_SECRET
//     });
// }
// )


// const uploadoncloud=async(localfilepath)=>{
//     try {
//         if(!localfilepath) return null
//         // upload 
//         const response=await cloudinary.uploader.upload(localfilepath,{
//             resource_type:"auto" //option setting 
//         })
//         // file upload success
//         return response
//     } catch (error) {
//         fs.unlinkSync(localfilepath)// remove the local storage file 
        
//     }
// }    

// export default uploadoncloud;

// multer in the middleware 


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Ensure your Cloudinary configuration is correct
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadoncloud = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully, now remove the local file
    fs.unlinkSync(localFilePath);
    return response;

  } catch (error) {
    // Log the detailed error from Cloudinary
    console.error("Cloudinary upload failed. Error:", error);

    // If the local file exists, remove it as the upload failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    
    return null;
  }
};

export default uploadoncloud;
  