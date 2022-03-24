const express = require("express");
const userModel = require("./models");
// const db =require("./index")
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
app.post("/users/addUser", async (request, response) => {
    const user = new userModel(request.body);
    user.save(function (err, result) {
        if (err) {
            response.send({ statusCode: 400, message: err.errors.PhoneNumber.message });
        }
        else {
            response.send(result)
            // res.json(doc);
        }
    });
});


app.put("/users/updateUser/:userId",  (request, response) => {
    // const user = new userModel(request.body);
    userModel.findOneAndUpdate({ _id: request.params.userId },{$set: request.body},function (err, result) {
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
    userModel.find({}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There was a problem adding the information to the database." });
        }
        else {
            res.send(result);
        }
    })
});
app.post("/users/validate", (req, res) => {
    const PhoneNumber = req.body.PhoneNumber;
    var query = { PhoneNumber: PhoneNumber }
    userModel.findOne(query, function (err, result) {
        if (result == null) {
            const uservalidate = new userModel(query);
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