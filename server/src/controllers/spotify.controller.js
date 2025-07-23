// controllers/spotify.controller.js
import axios from "axios";
import { getSpotifyAccessToken } from "../utils/spotifyAuth.js";

export const searchSpotify = async (req, res) => {
  try {
    const { query, type } = req.query; // type: 'track' or 'artist'
    const token = await getSpotifyAccessToken();

    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: type || "track", // default to 'track'
        limit: 10,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Spotify Search Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch from Spotify API" });
  }
};
