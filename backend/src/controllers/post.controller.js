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

async function getPosts(req, res) {
  try {
    const posts = await BlogPost.find()
      .populate("author", ["userName"])
      .sort({ createdAt: -1 })
      .limit(20);
    console.log(posts);

    res.send(posts);
  } catch (error) {
    console.log("Error fetching Posts ", error);
    res.status(500).json({ message: "Error fetching Posts" });
  }
}

module.exports = {
  createPost,
  getPosts,
};
