import { useEffect, useState } from 'react';
import styles from './ArtistSearch.module.css';

export default function ArtistSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);

  // Fetch artist suggestions on typing
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${query}`
        );
        const data = await res.json();
        setSuggestions(data.data);
      } catch (error) {
        console.error('Error fetching artist suggestions:', error);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timer);
  }, [query]);

  // On artist click → fetch top tracks
  const handleArtistClick = async (artist) => {
    setSelectedArtist(artist);
    setQuery(artist.name);
    setSuggestions([]);

    try {
      const res = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artist.id}/top?limit=10`
      );
      const data = await res.json();
      setTopTracks(data.data);
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  };

  return (
    <div className={styles.artistSearchWrapper}>
      <h2 className={styles.heading}>🎤 Search by Artist</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedArtist(null);
          setTopTracks([]);
        }}
        placeholder="Type artist name..."
        className={styles.input}
      />

      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((artist) => (
            <li
              key={artist.id}
              className={styles.suggestionItem}
              onClick={() => handleArtistClick(artist)}
            >
              {artist.name}
            </li>
          ))}
        </ul>
      )}

      {selectedArtist && (
        <div className={styles.resultsSection}>
          <h3 className={styles.artistTitle}>
            Top Tracks by <span className={styles.highlight}>{selectedArtist.name}</span>
          </h3>

          <ul className={styles.tracksList}>
            {topTracks.map((track) => (
              <li key={track.id} className={styles.trackCard}>
                <p className={styles.trackTitle}>{track.title}</p>
                <audio controls src={track.preview} className={styles.audio}></audio>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
