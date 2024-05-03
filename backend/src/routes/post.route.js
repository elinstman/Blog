const { Router } = require("express");
const { checkUser } = require("../middleware/auth.middleware");
const { createPost } = require("../controllers/posts");

const postsRouter = Router();

postsRouter.post("/", checkUser, createPost);
postsRouter.get("/", checkUser, createPost);

module.exports = postsRouter;
