const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: String,
  comment: String,
});

const ImageSchema = new mongoose.Schema(
  {
    src: String,
    author: String,
    comments: [{ type: CommentSchema }],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("Image", ImageSchema);
