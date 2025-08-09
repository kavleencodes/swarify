import Song from "../models/song.models.js";

// Like a song
export const likeSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: "Song not found" });

    if (!song.likes.includes(req.user._id)) {
      song.likes.push(req.user._id);
      await song.save();
    }

    res.status(200).json({ message: "Song liked" });
  } catch (err) {
    res.status(500).json({ error: "Failed to like song" });
  }
};

// Comment on a song
export const commentOnSong = async (req, res) => {
  try {
    const { text } = req.body;
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: "Song not found" });

    song.comments.push({
      user: req.user._id,
      text,
    });

    await song.save();
    res.status(200).json({ message: "Comment added" });
  } catch (err) {
    res.status(500).json({ error: "Failed to comment on song" });
  }
};

// Get details of a song (with likes/comments)
export const getSongDetails = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate("likes", "username")
      .populate("comments.user", "username");

    if (!song) return res.status(404).json({ error: "Song not found" });

    res.status(200).json(song);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch song" });
  }
};
