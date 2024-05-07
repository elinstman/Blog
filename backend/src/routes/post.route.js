const { Router } = require("express");
const { checkUser } = require("../middleware/auth.middleware");
const {
  createPost,
  getPosts,
  editPost,
  getPostById,
} = require("../controllers/post.controller");

const postsRouter = Router();

postsRouter.get("/blogposts", getPosts);
postsRouter.get("/blogposts/:id", checkUser, getPostById);
postsRouter.post("/createpost", checkUser, createPost);
postsRouter.put("/blogposts/:id", editPost);

module.exports = postsRouter;
