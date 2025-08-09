import express from "express";
import {
  likeSong,
  commentOnSong,
  getSongDetails,
} from "../controllers/song.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:id/like", verifyJWT, likeSong);
router.post("/:id/comment", verifyJWT, commentOnSong);
router.get("/:id", getSongDetails);

export default router;
