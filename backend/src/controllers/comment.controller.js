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

async function getComments(req, res) {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId }).populate({
      path: "author",
      select: "userName id",
    });

    if (!comments || comments.length === 0) {
      return res.status(404).json({
        message: "Inga kommentarer hittades för det angivna inlägget",
      });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.log("error getting comment", error);
    res.status(500).json({ message: "Serverfel vid hämtning av kommentarer" });
  }
}

module.exports = {
  createComment,
  getComments,
};
