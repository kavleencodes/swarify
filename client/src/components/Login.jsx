// import { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from "react-router-dom";


export default function Login({ onSignupClick }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // ✅ Define it here

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error("❌ Login failed: Invalid credentials");
        alert("Wrong details. Please try again.");
        return;
      }

      const data = await response.json();
      console.log("✅ Login successful:", data);
      alert("Login successful!!!");

      // ✅ Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error("⚠️ Error during login:", err.message || err);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logo}>
        Swar<span className={styles.mic}>🎤</span>
      </div>

      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back 🎶</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* <input
            type="text"
            name="username"
            placeholder="Username"
            className={styles.input}
            value={formData.username}
            onChange={handleChange}
          /> */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
          />

          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>

        {/* <p className={styles.subText}>
          Don’t have an account?{' '}
          <span className={styles.link} onClick={onSignupClick}>Sign up</span>
        </p> */}
        <p className={styles.subText}>
          Don’t have an account?{' '}
          <Link to="/signup" className={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
