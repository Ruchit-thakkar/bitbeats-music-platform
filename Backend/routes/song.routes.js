const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/auth.middleware");
const {
  upload,
  uploadAudioToImageKit,
} = require("../Middlewares/upload.middleware");
// 🟢 Import the new controller here
const {
  uploadSongController,
  getMySongsController,
  toggleLikeController,
} = require("../controllers/song.controller");

// POST /api/songs/upload
router.post(
  "/upload",
  authMiddleware,
  upload.single("audioFile"),
  uploadAudioToImageKit,
  uploadSongController,
);

// 🟢 GET /api/songs/my-songs (New Route!)
router.get("/my-songs", authMiddleware, getMySongsController);
router.post("/toggle-like/:songId", authMiddleware, toggleLikeController);
module.exports = router;
