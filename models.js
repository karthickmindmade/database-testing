const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: [true, "*required"],
       
    },
    Password: {
        type: Number,
        required: [true, "*required"],
     
    }
});

const User = mongoose.model("customers", UserSchema);

module.exports = User;