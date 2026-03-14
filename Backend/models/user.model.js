const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["U", "A"], // Just User and Admin now
      default: "U",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
