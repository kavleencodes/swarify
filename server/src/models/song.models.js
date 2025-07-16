

import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";



const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  previewUrl: String,
  artworkUrl: String,
  externalId: String,
  platform: String // 'deezer', 'itunes', etc.
}, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate)

export default mongoose.model("Song", songSchema);

// special package mongoose-aggregate-paginate-v2 to write the aggregation queries aggregation pipeline 
// npm install...this also allows us to add some plugins in the code. we can write regular queries , query pipeline 

