const Playlist = require("../models/playlist.model");

// 🟢 1. Create a New Playlist
const createPlaylist = async (req, res) => {
  try {
    const { title, coverImage } = req.body;
    const userId = req.user._id; // From authMiddleware

    const newPlaylist = await Playlist.create({
      title,
      coverImage: coverImage || "",
      userId,
      songs: [],
    });

    return res.status(201).json({ success: true, data: newPlaylist });
  } catch (error) {
    console.error("Create Playlist Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟢 2. Get All Playlists for the Logged-in User
const getUserPlaylists = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch playlists and populate the songs so we can show covers/titles on the frontend
    const playlists = await Playlist.find({ userId })
      .populate("songs", "title artist coverImageURL audioURL") // Only fetching necessary song fields
      .sort({ createdAt: -1 }); // Newest first

    return res.status(200).json({ success: true, data: playlists });
  } catch (error) {
    console.error("Get Playlists Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟢 3. Add a Song to a Playlist
const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const userId = req.user._id;

    const playlist = await Playlist.findOne({ _id: playlistId, userId });
    if (!playlist) {
      return res
        .status(404)
        .json({ success: false, message: "Playlist not found" });
    }

    // Prevent adding duplicate songs to the same playlist
    if (playlist.songs.includes(songId)) {
      return res
        .status(400)
        .json({ success: false, message: "Song already in playlist" });
    }

    playlist.songs.push(songId);
    await playlist.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Song added to playlist",
        data: playlist,
      });
  } catch (error) {
    console.error("Add Song Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟢 4. Remove a Song from a Playlist
const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const userId = req.user._id;

    const playlist = await Playlist.findOne({ _id: playlistId, userId });
    if (!playlist) {
      return res
        .status(404)
        .json({ success: false, message: "Playlist not found" });
    }

    // Remove the specific songId from the array
    playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
    await playlist.save();

    return res
      .status(200)
      .json({ success: true, message: "Song removed", data: playlist });
  } catch (error) {
    console.error("Remove Song Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟢 5. Delete a Playlist Completely
const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const userId = req.user._id;

    const playlist = await Playlist.findOneAndDelete({
      _id: playlistId,
      userId,
    });

    if (!playlist) {
      return res
        .status(404)
        .json({ success: false, message: "Playlist not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Delete Playlist Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createPlaylist,
  getUserPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
};
