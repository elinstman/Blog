const Comment = require("../models/comment.model");

async function createComment(req, res) {
  try {
    const { content, author, post } = req.body;

    if (!content || !author || !post) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newComment = new Comment({
      content,
      author,
      post,
    });

    await newComment.save();
    res.status(201).send(newComment);
  } catch (error) {
    console.log("error creating new comment", error);
    res.status(400).json({ message: "Error creating new comment" });
  }
}

module.exports = {
  createComment,
};
