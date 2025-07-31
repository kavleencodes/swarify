import axios from "axios";
import { getSpotifyAccessToken } from "../utils/spotifyAuth.js";

export const searchSpotify = async (req, res) => {
  try {
    // const { query, type } = req.query;
    const { q: query, type } = req.query;

    const token = await getSpotifyAccessToken();

    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: type || "track",
        limit: 8,
      },
    });

    // 👇 Simplify only for track search
    if (type === "track" || !type) {
      const simplifiedTracks = response.data.tracks.items.map((track) => ({
        trackName: track.name,
        artists: track.artists.map((artist) => artist.name).join(", "),
        albumName: track.album.name,
        image: track.album.images[0]?.url || "",
        previewUrl: track.preview_url, // 30-second preview URL
      }));

      return res.status(200).json({ tracks: simplifiedTracks });
    }

    // Default: return full raw data for non-track types
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Spotify Search Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch from Spotify API" });
  }
};
