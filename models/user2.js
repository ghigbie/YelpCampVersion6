const mongoose = require("mongoose");

var UserShcema = new mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.model("User", UserShcema);