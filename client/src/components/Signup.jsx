import styles from './Signup.module.css';


export default function Signup({ onLoginClick }) {
    return (
      <div className={styles.signupWrapper}>
        <div className={styles.logo}>
          Swar<span className={styles.mic}>🎤</span>
        </div>
  
        <div className={styles.card}>
          <h2 className={styles.title}>Get Started 🎧</h2>
  
          <form className={styles.form}>
            <input type="text" placeholder="Username" className={styles.input} />
            <input type="email" placeholder="Email" className={styles.input} />
            <input type="password" placeholder="Password" className={styles.input} />
  
            <button className={styles.signupButton} type="submit">
              Sign Up
            </button>
          </form>
  
          <p className={styles.subText}>
            Already have an account?{' '}
            <span className={styles.link} onClick={onLoginClick}>Login</span>
          </p>
        </div>
      </div>
    );
  }