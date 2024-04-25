const Express = require("express");
const {
  registerUser,
  loginUser,
  refreshAccessToken,
} = require("../controllers/auth.controller");

const authRouter = Express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshAccessToken);

module.exports = authRouter;
