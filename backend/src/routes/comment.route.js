const { Router } = require("express");
const {
  createComment,
  getComments,
} = require("../controllers/comment.controller");

const commentsRouter = Router();

commentsRouter.post("/blogposts/:postId/comments", createComment);
commentsRouter.get("/blogposts/:postId/comments", getComments);

module.exports = commentsRouter;
