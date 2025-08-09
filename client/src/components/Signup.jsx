import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Signup.module.css";

export default function Signup({ onLoginClick }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverimage: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (formData.avatar) data.append("avatar", formData.avatar);
      if (formData.coverimage) data.append("coverimage", formData.coverimage);

      const res = await axios.post(
        "http://localhost:8000/api/users/register",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(res.data?.message || "Account created successfully!");

      // Store token if backend sends it
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Redirect to search page
      navigate("/search");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.logo}>
        Swar<span className={styles.mic}>🎤</span>
      </div>

      <div className={styles.card}>
        <h2 className={styles.title}>Get Started 🎧</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={styles.input}
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className={styles.fileLabel}>
            Avatar (required)
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </label>

          <label className={styles.fileLabel}>
            Cover Image (optional)
            <input
              type="file"
              name="coverimage"
              accept="image/*"
              onChange={handleChange}
            />
          </label>

          <button className={styles.signupButton} type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className={styles.subText}>
          Already have an account?{" "}
          <span className={styles.link} onClick={onLoginClick}>Login</span>
        </p>
      </div>
    </div>
  );
}
