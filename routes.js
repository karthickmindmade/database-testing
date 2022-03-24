const express = require("express");
const userModel = require("./models/addUserModels");
const valiRegUserModel=require("./models/validateRegUser")
// const db =require("./index")
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
app.post("/users/addUser", async (request, response) => {
    const Users = mongoose.model("users", userModel);
    const user = new Users(request.body);
    user.save(function (err, result) {
        if (err) {
            response.send({
                statusCode: 400,
                message: {
                    error1: err.errors.PhoneNumber.message == undefined ? "" : err.errors.PhoneNumber.message,
                    error2: err.errors.UserName.message == undefined ? "" : err.errors.UserName.message,
                    error3: err.errors.Address.message == undefined ? "" : err.errors.Address.message
                }
            });
        }
        else {
            response.send(result)
            // res.json(doc);
        }
    });
});


app.put("/users/updateUser/:userId", (request, response) => {
    // const user = new userModel(request.body);
    const Users = mongoose.model("users", userModel);
    Users.findOneAndUpdate({ _id: request.params.userId }, { $set: request.body }, function (err, result) {
        if (err) {
            response.send({ statusCode: 400, message: err.errors.PhoneNumber.message });
        }
        else {
            response.send(result)
            // res.json(doc);
        }
    });
});

app.get("/users/list", async (req, res) => {
    const Users = mongoose.model("users", userModel);
    Users.find({}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There was a problem adding the information to the database." });
        }
        else {
            res.send(result);
        }
    })
});
app.post("/users/validate", (req, res) => {
    const Users = mongoose.model("users", valiRegUserModel);
    const PhoneNumber = req.body.PhoneNumber;
    var query = { PhoneNumber: PhoneNumber }
    Users.findOne(query, function (err, result) {
        if (result == null) {
            const uservalidate = new Users(query);
            uservalidate.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: err.errors.PhoneNumber.message });
                }
                else {
                    res.send({ statusCode: 200, message: "registered" })
                    // res.json(doc);
                }
            });
            // db.collection('users').insertOne(query,
            //     function (err, result) {
            //         if (err) {
            //             res.send({ statusCode: 400, message: "Failed To Register" });
            //         }
            //         else {
            //             res.send({ statusCode: 200, message: "Registered" });
            //         }
            //     }
            // );
        } else if (err) {
            res.send({ statusCode: 400, message: "error" });
        }
        else {
            res.send({ statusCode: 200, message: "Login Succeed" });
        }
    })
});
module.exports = app;