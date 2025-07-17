import { Router } from "express";
import { registeruser } from "../controllers/user.controller.js";

// now router from Router
const router=Router()

router.route("/register").post(registeruser)// to register user from the app.js file 



export default router