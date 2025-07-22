// models/watchHistory.model.js
import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trackId: {
    type: String,
    required: true,
  },
  trackName: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  previewUrl: {
    type: String,
  },
  listenedAt: {
    type: Date,
    default: Date.now,
  },
});

const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);
export default WatchHistory;
