import { useState } from "react";
import styles from "./Search.module.css";
import style from "./Login.module.css"

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
        <button onClick={handleSearch} className={styles.button}>Search</button>
      </div>

      <div className={styles.results}>
        {results.length > 0 ? (
          results.map((track, index) => (
            <div key={index} className={styles.track}>
              <img src={track.image} alt="Album Art" className={styles.albumArt} />
              <div>
                <strong>{track.trackName}</strong> by {track.artists}
                <div><em>{track.albumName}</em></div>
                {track.previewUrl ? (
                  <audio controls src={track.previewUrl} className={styles.audio} />
                ) : (
                  <div className={styles.noPreview}>No preview available</div>
                )}
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
