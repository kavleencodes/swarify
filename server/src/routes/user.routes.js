import { Router } from "express";
import { registeruser } from "../controllers/user.controller.js";

import { upload } from "../middleware/multer.js";// middleware 

// now router from Router
const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },// for cover image and one for avatar
        {
            name:"coverimage",
            maxCount:1
        }
    ]),
    registeruser)// to register user from the app.js file // before register use the middleware 



export default router