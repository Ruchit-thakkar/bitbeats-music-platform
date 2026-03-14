// Middlewares/upload.middleware.js
const multer = require("multer");
const imagekit = require("../config/imagekit");

const storage = multer.memoryStorage();

// This is the "upload" object your route is crying about!
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});

const uploadAudioToImageKit = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No audio file provided" });
    }

    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: `audioapp-${Date.now()}-${req.file.originalname}`,
      folder: "/audioapp-songs",
    });

    req.body.audioURL = result.url;
    req.body.audioFileId = result.fileId;
    next();
  } catch (error) {
    console.error("ImageKit Upload Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to upload audio" });
  }
};

// 🟢 Exporting both exactly as they are named
module.exports = { upload, uploadAudioToImageKit };
