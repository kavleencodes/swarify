// src/db/models/Artist.model.js

import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  externalId: String,         // From iTunes or Deezer
  name: String,
  genres: [String],
  imageUrl: String,
  platform: String            // 'deezer', 'itunes', etc.
}, { timestamps: true });

export default mongoose.model("Artist", artistSchema);
