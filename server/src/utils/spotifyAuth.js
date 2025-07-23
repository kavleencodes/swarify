// utils/spotifyAuth.js
import axios from "axios";

let accessToken = null;
let tokenExpiry = null;

export const getSpotifyAccessToken = async () => {
  if (accessToken && tokenExpiry > Date.now()) {
    return accessToken; // Return cached token
  }

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const response = await axios.post("https://accounts.spotify.com/api/token", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64"),
    },
  });

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000; // expires_in is in seconds
  return accessToken;
};
