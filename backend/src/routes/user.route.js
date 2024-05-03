const { Router } = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  getUser,
} = require("../controllers/user.controller");
const { checkUser } = require("../middleware/auth.middleware");

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/users", checkUser, getUsers);
userRouter.get("/user", checkUser, getUser);

module.exports = userRouter;
