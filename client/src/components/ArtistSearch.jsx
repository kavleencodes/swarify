import { useState, useEffect } from 'react';
import styles from './ArtistSearch.module.css';

export default function ArtistSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      const fetchArtists = async () => {
        setError(null);
        try {
          const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to fetch');

          setSuggestions(data.artists.items); // Adjust based on your backend's shape
        } catch (err) {
          setError(err.message);
          console.error('Error fetching artists:', err);
        }
      };

      fetchArtists();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
    setQuery(artist.name);
    setSuggestions([]);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>🎤 Search by Artist</h2>
      <input
        type="text"
        placeholder="Start typing an artist name..."
        className={styles.input}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedArtist(null);
        }}
      />
      {error && <p className={styles.errorText}>{error}</p>}
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((artist) => (
            <li
              key={artist.id}
              className={styles.suggestionItem}
              onClick={() => handleArtistClick(artist)}
            >
              {artist.images[2] && (
                <img
                  src={artist.images[2].url}
                  alt={artist.name}
                  className={styles.artistImage}
                />
              )}
              {artist.name}
            </li>
          ))}
        </ul>
      )}
      {selectedArtist && (
        <div className={styles.results}>
          <h3 className={styles.artistTitle}>
            Showing results for <span className={styles.highlight}>{selectedArtist.name}</span>
          </h3>
        </div>
      )}
    </div>
  );
}
