const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(
  {
    author: String,
    images: [String],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("Album", AlbumSchema);
