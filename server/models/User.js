const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    validate: /^[A-Za-z0-9]+$/
  },
  lat: {
    type: Number,
    require: true
  },
  lon: {
    type: Number,
    require: true
  },
  ip: {
    type: String
  },
  avatar: {
    type: String
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
