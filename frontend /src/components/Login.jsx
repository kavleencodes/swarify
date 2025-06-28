import styles from './Login.module.css';

export default function Login() {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome to Swarify 🎵</h2>

        <form className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
          />

          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>

        <p className={styles.subText}>
          Don’t have an account? <span className={styles.link}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
