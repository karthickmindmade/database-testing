const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   
    PhoneNumber: {
        type: Number,
        required: [true, "PhoneNumber required"]
    },
    UserName:{
        type:String,
        required: [true, "UserName required"]
    },
    Address:{
        type:String,
        required: [true, "Address required"]
    }
});



module.exports = UserSchema;