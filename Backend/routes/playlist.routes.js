const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/auth.middleware");
const {
  createPlaylist,
  getUserPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
} = require("../controllers/playlist.controller");

// All playlist routes require the user to be logged in
router.use(authMiddleware);

router.post("/create", createPlaylist);
router.get("/my-playlists", getUserPlaylists);
router.post("/add-song", addSongToPlaylist);
router.post("/remove-song", removeSongFromPlaylist);
router.delete("/:playlistId", deletePlaylist);

module.exports = router;
