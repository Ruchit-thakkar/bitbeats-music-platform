const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Playlist title is required"],
      trim: true,
    },
    coverImage: {
      type: String, // Optional: Users can upload a custom cover, or we default to the first song's cover later
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Links the playlist to the creator
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song", // Stores references to the Songs module
      },
    ],
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt'
  },
);

// Virtual field to get the total number of songs dynamically
playlistSchema.virtual("totalSongs").get(function () {
  return this.songs.length;
});

// Ensure virtuals are included when converting to JSON
playlistSchema.set("toJSON", { virtuals: true });
playlistSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Playlist", playlistSchema);
