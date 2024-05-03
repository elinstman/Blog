const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const secret = process.env.JWT_ACCESS_SECRET;

async function authenticateUser(req, res) {
  const { token } = req.body;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(500).json({ error: "Authentication failed" });
    } else {
      info.token = token;
      console.log(info);
      return res.json(info);
    }
  });
}

const checkUser = async (req, res, next) => {
  const authorization = req.header("Authorization");

  const token = authorization.split(" ")?.[1] || "";

  if (token) {
    jwt.verify(token, secret, {}, async (err, decodedToken) => {
      console.log(decodedToken, err);
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        console.log("Decoded token:", decodedToken);
        // const user = await User.findById(decodedToken.id);
        req.userId = decodedToken.userId;
        return next();
      }
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = {
  authenticateUser,
  checkUser,
};
