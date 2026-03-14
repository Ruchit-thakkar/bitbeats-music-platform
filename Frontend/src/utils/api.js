import axios from "axios";

const api = axios.create({
  baseURL: "https://bitbeats-music-platform.onrender.com", // <-- This must match your backend port!
  withCredentials: true, // Required for cookies!
});

export default api;
