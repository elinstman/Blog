const User = require("../models/user.model");

async function createUser(req, res) {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = new User({
      userName: userName,
      passWord: password,
      isAdmin: isAdmin || false,
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

module.exports = {
  createUser,
};
