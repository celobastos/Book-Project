import axios from 'axios';

// Create an Axios instance with base configurations
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
