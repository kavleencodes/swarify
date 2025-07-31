import styles from './Options.module.css';
import style from './dashboard.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUsername(parsedUser.username || '');
    }
  }, []);

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div className={styles.optionsWrapper}>
      <div className={style.logo}>
        Swar<span className={style.mic}>🎤</span>
      </div>

      <h2 className={styles.heading}>Welcome {username}</h2>

      <div className={styles.cardContainer}>
        <div className={styles.optionCard} onClick={handleSearchClick}>
          <span className={styles.emoji}>🎤</span>
          <p className={styles.cardText}>Search...</p>
        </div>
      </div>
    </div>
  );
}
