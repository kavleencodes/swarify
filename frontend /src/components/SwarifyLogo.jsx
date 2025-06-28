import styles from './SwarifyLogo.module.css';

export default function SwarifyLogo() {
  return (
    <div className={styles.logoWrapper}>
      <h1 className={`${styles.logoText} ${styles.fadeIn}`}>
        <span>Swar</span>
        <span className={styles.iWrapper}>
          i
          <span className={styles.musicNote}>🎵</span>
        </span>
        <span>fy</span>
      </h1>
    </div>
  );
}
