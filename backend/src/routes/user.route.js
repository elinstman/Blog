const { Router } = require("express");
const {
  createUser,
  loginUser,
  getUsers,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getUsers);

module.exports = userRouter;
