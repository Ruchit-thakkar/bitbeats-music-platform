import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // <-- This must match your backend port!
  withCredentials: true, // Required for cookies!
});

export default api;
