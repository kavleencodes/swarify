// middelware is jaate hue mil ke jaana 
// disk and memory storage -disk storage better 
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    // file is not config in the json data
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
   export const upload = multer({ storage: storage })