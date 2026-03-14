const Song = require("../models/song.model");

async function uploadSongController(req, res) {
  try {
    // 1. Extract the text data and the new ImageKit URLs from req.body
    const { title, artist, description, audioURL, audioFileId } = req.body;

    // 2. Get the user ID from your authMiddleware
    // (Assuming authMiddleware attaches the verified user to req.user)
    const userId = req.user._id;

    // 3. Save the song to MongoDB
    const newSong = await Song.create({
      title,
      artist: artist || "Unknown Artist",
      description,
      audioURL,
      audioFileId,
      uploadedBy: userId,
    });

    // 4. Send success response
    return res.status(201).json({
      success: true,
      message: "Song uploaded successfully",
      data: newSong,
    });
  } catch (error) {
    console.error("Database Save Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving song data",
    });
  }
}
// Add this below uploadSongController
async function getMySongsController(req, res) {
  try {
    // authMiddleware provides this!
    const userId = req.user._id;

    // Fetch songs and sort by newest first by default
    const songs = await Song.find({ uploadedBy: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (error) {
    console.error("Fetch Songs Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching your songs",
    });
  }
}
// 🟢 NEW: Toggle Like Feature
async function toggleLikeController(req, res) {
  try {
    const { songId } = req.params;
    const userId = req.user._id;

    const song = await Song.findById(songId);
    if (!song) {
      return res
        .status(404)
        .json({ success: false, message: "Song not found" });
    }

    // Check if user already liked it
    const isLiked = song.likes.includes(userId);

    if (isLiked) {
      // Unlike: Remove userId from array
      song.likes = song.likes.filter(
        (id) => id.toString() !== userId.toString(),
      );
    } else {
      // Like: Add userId to array
      song.likes.push(userId);
    }

    await song.save();

    return res.status(200).json({
      success: true,
      message: isLiked ? "Unliked" : "Liked",
      likesCount: song.likes.length,
      isLiked: !isLiked,
    });
  } catch (error) {
    console.error("Like Toggle Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  uploadSongController,
  getMySongsController,
  toggleLikeController, // 🟢 Export the new controller
};
