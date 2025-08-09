import { useState } from "react";
import styles from "./Search.module.css";
import style from "./Login.module.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await fetch(`http://localhost:8000/api/search?q=${query}`);
      const data = await response.json();
      setResults(data.tracks || []);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleLike = async (externalId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/songs/${externalId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}` if using JWT
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Song liked!");
      } else {
        alert(data.error || "❌ Failed to like song");
      }
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  const handleComment = async (externalId) => {
    const comment = prompt("💬 Enter your comment:");
    if (!comment) return;

    try {
      const response = await fetch(`http://localhost:8000/api/songs/${externalId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: comment }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Comment added!");
      } else {
        alert(data.error || "❌ Failed to add comment");
      }
    } catch (error) {
      console.error("Comment failed", error);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/api/users/logout", {
  //       method: "POST",
  //       credentials: "include", // allows cookies to be cleared
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       localStorage.removeItem("token");
  //       alert(data.message || "Logged out successfully!");
  //       navigate("/login");
  //     } else {
  //       alert(data.message || "Logout failed");
  //     }
  //   } catch (error) {
  //     console.error("Logout failed", error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); // token from login
  
      const response = await fetch("http://localhost:8000/api/users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send token
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.removeItem("token");
        alert(data.message || "Logged out successfully!");
        navigate("/login");
      } else {
        if (response.status === 401) {
          localStorage.removeItem("token");
          alert("Session expired. Please log in again.");
          navigate("/login");
        } else {
          alert(data.message || "Logout failed");
        }
      }
    } catch (error) {
      console.error("Logout failed", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={style.logo}>
        Swar<span className={style.mic}>🎤</span>
      </div>

      <h2 className={styles.title}>Search Songs</h2>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for a song or artist"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          Search
        </button>
        <button onClick={handleLogout} className={styles.button}>
          Logout
        </button>
      </div>

      <div className={styles.results}>
        {results.length > 0 ? (
          results.map((track, index) => (
            <div key={index} className={styles.track}>
              <img src={track.image} alt="Album Art" className={styles.albumArt} />
              <div>
                <strong>{track.trackName}</strong> by {track.artists}
                <div>
                  <em>{track.albumName}</em>
                </div>
                {track.previewUrl ? (
                  <audio controls src={track.previewUrl} className={styles.audio} />
                ) : (
                  <div className={styles.noPreview}>No preview available</div>
                )}
                {/* <div className={styles.actions}>
                  <button onClick={() => handleLike(track.externalId)}>❤️ Like</button>
                  <button onClick={() => handleComment(track.externalId)}>💬 Comment</button>
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No results found</p>
        )}
      </div>
    </div>
  );
}
