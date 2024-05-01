const Posts = require("../models/post.model");

async function createPost(req, res) {
  try {
    const { title, summary, content } = req.body;
    const file = req.file;
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    if (!title || !summary || !content || !file) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let blurredTitle = title.replace(/\b(ugly|diet)\b/gi, "****");
    let blurredSummary = summary.replace(/\b(ugly|diet)\b/gi, "****");
    let blurredContent = content.replace(/\b(ugly|diet)\b/gi, "****");

    const authorId = res.locals.user.id;

    const newPost = new Posts({
      title: blurredTitle,
      summary: blurredSummary,
      content: blurredContent,
      cover: newPath,
      author: authorId,
    });
    console.log("newPost: ", newPost);
    const savedPost = new Post(newPost);

    await savedPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log("Error creating Post ", error);
    res.status(400).json({ message: "Error in createPost" });
  }
}
