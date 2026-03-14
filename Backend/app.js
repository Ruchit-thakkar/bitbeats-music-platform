const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

// Assuming you have your DB connection file here
const connectTodb = require("./db/db");
connectTodb();

const app = express();
// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Strict CORS setup for secure cookies between frontend/backend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

// Route Mounting
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/songs", require("./routes/song.routes"));
app.use("/api/playlists", require("./routes/playlist.routes"));
// Serve static React files in production
app.use(express.static(path.join(__dirname, "public")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
