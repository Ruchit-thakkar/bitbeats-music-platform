const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Song title is required"],
      trim: true,
    },
    artist: {
      type: String,
      default: "Unknown Artist",
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    audioURL: {
      type: String,
      required: true,
    },
    audioFileId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // 🟢 ADD THIS: Stores IDs of users who liked the song
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Song", songSchema);
