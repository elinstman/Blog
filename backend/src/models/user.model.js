const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    min: 4,
  },
  passWord: {
    type: String,
    required: true,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
