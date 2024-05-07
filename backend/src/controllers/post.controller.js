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

async function getPostById(req, res) {
  const postId = req.params.id;

  try {
    const post = await BlogPost.findById(postId).populate("author", [
      "userName",
    ]);

    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post by id:", error);
    res.status(500).json({ message: "Error fetching post by id" });
  }
}

async function editPost(req, res) {
  const editPostId = req.params.id;

  const { title, summary, content, author } = req.body;
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      editPostId,
      { title, summary, content, author, editPostId },
      { new: true }
    );
    console.log("updatedPost", updatedPost);

    if (!updatedPost) {
      // return res.status(404).json({ message: "Blog post not found" });
      console.log("kan ej uppdatera inlägget", message);
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log("error edit blogpost", error);
  }
}

module.exports = {
  createPost,
  getPosts,
  editPost,
  getPostById,
};
