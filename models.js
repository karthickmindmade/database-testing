const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   
    PhoneNumber: {
        type: Number,
        required: [true, "PhoneNumber required"]
    }
});

const User = mongoose.model("users", UserSchema);

module.exports = User;