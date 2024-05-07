const { Router } = require("express");
const { createComment } = require("../controllers/comment.controller");

const commentsRouter = Router();

commentsRouter.post("/blogposts/:postId/comments", createComment);

module.exports = commentsRouter;
