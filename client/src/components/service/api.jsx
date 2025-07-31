// src/components/service/api.jsx
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const signupUser = async (formData) => {
  try {
    const res = await API.post('/users/register', formData);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Signup failed. Try again.'
    );
  }
};
