const { Router } = require("express");
const { checkUser } = require("../middleware/auth.middleware");
const { createPost, getPosts } = require("../controllers/post.controller");

const postsRouter = Router();

postsRouter.post("/createpost", checkUser, createPost);
postsRouter.get("/blogposts", getPosts);

module.exports = postsRouter;
