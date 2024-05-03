const { Router } = require("express");
const { checkUser } = require("../middleware/auth.middleware");
const { createPost } = require("../controllers/post.controller");

const postsRouter = Router();

postsRouter.post("/createpost", checkUser, createPost);

module.exports = postsRouter;
