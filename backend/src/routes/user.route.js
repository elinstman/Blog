const { Router } = require("express");
const {
  createUser,
  loginUser,
  getUsers,
} = require("../controllers/user.controller");
const { checkUser } = require("../middleware/auth.middleware");

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getUsers, checkUser);

module.exports = userRouter;
