// routes/spotify.routes.js
import { Router } from "express";
import { searchSpotify } from "../controllers/spotify.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/search", verifyJWT, searchSpotify);

export default router;
