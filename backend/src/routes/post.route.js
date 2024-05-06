const { Router } = require("express");
const { checkUser } = require("../middleware/auth.middleware");
const {
  createPost,
  getPosts,
  editPost,
} = require("../controllers/post.controller");

const postsRouter = Router();

postsRouter.get("/blogposts", getPosts);
postsRouter.put("blogpost/:id", checkUser, editPost);
postsRouter.post("/createpost", checkUser, createPost);

module.exports = postsRouter;
