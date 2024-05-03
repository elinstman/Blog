const BlogPost = require("../models/post.model");

async function createPost(req, res) {
  try {
    const { title, summary, content, author } = req.body;

    if (!title || !summary || !content || !author) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBlogPost = new BlogPost({
      title,
      summary,
      content,
      author,
    });

    console.log("new blogpost: ", newBlogPost);
    await newBlogPost.save();

    res.status(201).send(newBlogPost);
  } catch (error) {
    console.log("error in creating new blogpost", error);

    res.status(400).json({ message: "Error in creating blogpost" });
  }
}

module.exports = {
  createPost,
};
