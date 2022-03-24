const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   
    PhoneNumber: {
        type: Number,
        required: [true, "PhoneNumber required"]
    },
   
});



module.exports = UserSchema;