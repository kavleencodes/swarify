// import { Router } from "express";
// import {registeruser} from "../controllers/user.controller.js";

// import { verifyJWT } from "../middleware/auth.middleware.js";

// import { upload } from "../middleware/multer.js";// middleware 

// // now router from Router
// const router=Router()

// router.route("/register").post(
//     upload.fields([
//         {
//             name:"avatar",
//             maxCount:1
//         },// for cover image and one for avatar
//         {
//             name:"coverimage",
//             maxCount:1
//         }
//     ]),
//     registeruser)// to register user from the app.js file // before register use the middleware 

// // router.route("/login").post(loginuser)

// // secured routes 
// // router.route("/logout").post(verifyJWT,logoutUser)



// export default router

// import { Router } from "express";
// import { registeruser } from "../controllers/user.controller.js";
// import { upload } from "../middleware/multer.middleware.js";

// const router = Router();

// router.route("/register").post(
//     // This is the correct order: Multer middleware runs first to parse files
//     upload.fields([
//         {
//             name: "avatar",
//             maxCount: 1
//         },
//         {
//             name: "coverimage", // Use all lowercase to match controller
//             maxCount: 1
//         }
//     ]),
//     registeruser
// );

// export default router;


import { Router } from "express";
import { registeruser ,loginUser,logoutUser,refreshaccesstoken} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import User from "../models/user.models.js"

const router = Router();

// --- ADD THIS NEW ROUTE ---
router.route("/healthcheck").get((req, res) => {
    console.log("HEALTH CHECK ENDPOINT WAS HIT SUCCESSFULLY!");
    res.status(200).send("Server is alive and responding!");
});
// -------------------------
// router.get("/", (req, res) => {
//     res.status(200).json({ message: "Users API root reached!" });
//   });

// router.get("/", getAllUsers);
router.get("/", async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json({
        success: true,
        count: users.length,
        users
      });
    } catch (error) {
      console.error("🔥 Error while fetching users:", error); // 👈 add this
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverimage", maxCount: 1 }
    ]),
    registeruser
);

router.route("/login").post(loginUser)

//secured routes 
router.route("/logout").post(verifyJWT,logoutUser)

router.route("/refresh-token").post(refreshaccesstoken)
export default router;