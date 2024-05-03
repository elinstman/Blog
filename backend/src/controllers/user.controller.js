const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  generateAccessAndRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/token");

async function createUser(req, res) {
  try {
    const { userName, passWord } = req.body;
    if (!userName || !passWord) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(passWord, 10);

    const newUser = new User({
      userName: userName,
      passWord: hashedPassword,
    });
    console.log("newUser: ", newUser);
    const savedUser = new User(newUser);

    await savedUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    console.log("Error creating User ", error);
    res.status(400).json({ message: "Error in createUser" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).send(users);
    console.log("Users: ", users);
  } catch (error) {
    console.log("Error fetching Users ", error);
    res.status(400).json({ message: "Error fetching Users" });
  }
}

async function getUser(req, res) {
  const userId = req.userId;
  console.log("user", userId);
  try {
    const user = await User.findById(userId);
    res.status(200).send(user);
  } catch (error) {
    console.log("Error fetching User ", error);
    res.status(400).json({ message: "Error fetching User" });
  }
}

async function loginUser(req, res) {
  const { userName, passWord } = req.body;
  try {
    const user = await User.findOne({ userName }).select("+passWord");

    if (!user) {
      return res.status(401).json({ message: "Wrong användarnamn" });
    }

    const passWordMatch = await bcrypt.compare(passWord, user.passWord);
    if (!passWordMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = generateAccessAndRefreshToken(user);
    res.json(token);
  } catch (error) {
    console.log("Error in loginUser ", error);
    res.status(404).json({ message: error.message });
  }
}

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUser,
};
