// controllers/history.controller.js
import WatchHistory from "../models/watchHistory.models.js";

// Add to watch history
export const addToHistory = async (req, res) => {
  try {
    const { trackId, trackName, artistName, previewUrl } = req.body;
    const userId = req.user._id; // Make sure verifyJWT middleware sets req.user

    const newEntry = await WatchHistory.create({
      user: userId,
      trackId,
      trackName,
      artistName,
      previewUrl,
    });

    res.status(201).json({ message: "Added to history", data: newEntry });
  } catch (error) {
    res.status(500).json({ error: "Failed to save to watch history" });
  }
};

// Get watch history for user
export const getHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const history = await WatchHistory.find({ user: userId }).sort({
      listenedAt: -1,
    });

    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch watch history" });
  }
};
