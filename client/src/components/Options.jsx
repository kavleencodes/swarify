import { useNavigate } from 'react-router-dom';
import styles from './Options.module.css';
import style from './Login.module.css';


export default function Options() {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.optionsWrapper}>
      <h2 className={styles.heading}></h2>
      <div className={style.logo}>
              Swar<span className={style.mic}>🎤</span>
            </div>

      <div className={styles.cardContainer}>
        <div className={styles.optionCard} onClick={handleOptionClick}>
          <span className={styles.emoji}>🎤</span>
          <p className={styles.cardText}>Search...</p>
        </div>

        {/* <div className={styles.optionCard} onClick={handleOptionClick}>
          <span className={styles.emoji}>🎵</span>
          <p className={styles.cardText}>Search by Song</p>
        </div> */}
      </div>
    </div>
  );
}
