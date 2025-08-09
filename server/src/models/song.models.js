import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    previewUrl: { type: String },
    artworkUrl: { type: String },
    externalId: { type: String, required: true }, // Spotify or Deezer ID
    platform: { type: String, required: true },   // e.g., 'spotify', 'deezer'

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// ✅ Apply pagination plugin
songSchema.plugin(mongooseAggregatePaginate);

export default mongoose.model("Song", songSchema);
