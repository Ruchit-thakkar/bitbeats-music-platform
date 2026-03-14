import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // Make sure Tailwind is imported here
import App from "./App.jsx";

// PWA Service Worker Import
import { registerSW } from "virtual:pwa-register";

// આ લાઈનથી એપ સ્ટાર્ટ થતા જ બેકગ્રાઉન્ડમાં PWA ઇન્સ્ટોલ થવાનું સેટઅપ થઈ જશે
registerSW({ immediate: true });

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
