import styles from './Options.module.css';

// export default function Options() {
//   return (
//     <div className={styles.optionsWrapper}>
//       <h2 className={styles.heading}>What would you like to explore?</h2>

//       <div className={styles.cardContainer}>
//         <div className={styles.optionCard}>
//           <span role="img" aria-label="artist" className={styles.emoji}>🎤</span>
//           <p className={styles.cardText}>Search by Artist</p>
//         </div>

//         <div className={styles.optionCard}>
//           <span role="img" aria-label="song" className={styles.emoji}>🎵</span>
//           <p className={styles.cardText}>Search by Song</p>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Options({ onOptionClick }) {
  return (
    <div className={styles.optionsWrapper}>
      <h2 className={styles.heading}>What would you like to explore?</h2>

      <div className={styles.cardContainer}>
        <div className={styles.optionCard} onClick={onOptionClick}>
          <span className={styles.emoji}>🎤</span>
          <p className={styles.cardText}>Search by Artist</p>
        </div>

        <div className={styles.optionCard} onClick={onOptionClick}>
          <span className={styles.emoji}>🎵</span>
          <p className={styles.cardText}>Search by Song</p>
        </div>
      </div>
    </div>
  );
}

