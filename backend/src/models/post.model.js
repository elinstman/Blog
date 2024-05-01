const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // summary: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    cover: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;
