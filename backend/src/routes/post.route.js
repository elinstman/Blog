const { Router } = require("express");
const { checkUser } = require("../middleware/auth.middleware");
const { createPost, getPosts } = require("../controllers/post.controller");

const postsRouter = Router();

postsRouter.get("/blogposts", getPosts);
postsRouter.post("/createpost", checkUser, createPost);

module.exports = postsRouter;
