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
  const { token } = req.body;

  if (token) {
    jwt.verify(token, secret, {}, async (err, decodedToken) => {
      if (err) {
        console.error("Error verifying token:", err);
        res.locals.user = null;
        next();
      } else {
        console.log("Decoded token:", decodedToken);
        try {
          const user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        } catch (error) {
          console.error("Error fetching user:", error);
          res.locals.user = null;
          next();
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  authenticateUser,
  checkUser,
};
