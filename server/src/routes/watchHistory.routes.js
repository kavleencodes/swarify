// routes/history.routes.js
import { Router } from "express";
import { addToHistory, getHistory } from "../controllers/watchHistory.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Watch History route is live ✅" });
  });

  
router.post("/add", verifyJWT, addToHistory);
router.get("/get", verifyJWT, getHistory);

export default router;
