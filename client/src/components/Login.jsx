import styles from './Login.module.css'

export default function Login({ onSignupClick }) {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logo}>
        Swar<span className={styles.mic}>🎤</span>
      </div>

      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back 🎶</h2>

        <form className={styles.form}>
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />

          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>

        <p className={styles.subText}>
          Don’t have an account?{' '}
          <span className={styles.link} onClick={onSignupClick}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
