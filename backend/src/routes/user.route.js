const { Router } = require("express");
const { createUser, loginUser } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
