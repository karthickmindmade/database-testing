const express = require("express");
const userModel = require("./models");
const app = express();
app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);

    user.save(function (err, result) {
        if (err) {
            response.send({ statusCode: 400, message: err.errors.message });

        }
        else {
            response.send({ statusCode: 200, message: "success" });
            // res.json(doc);
        }
    });

});
app.get("/users", async (req, res) => {
    userModel.find({}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There was a problem adding the information to the database." });
        }
        else {
            res.send(result);
            // res.json(doc);
        }
    })
});


app.post("/users/validate", (req, res) => {
    const user = new userModel(res.body);

    const Username = req.body.Username;
    const Password = req.body.Password;

    var query = { Username: Username, Password: Password }

    userModel.findOne(query, function (err, result) {
        if (result == null) {
            res.send({ statusCode: 400, message: "Login failed" });
        } else if (err) {
            res.send({ statusCode: 400, message: "error" });
        }
        else {
            res.send({ statusCode: 200, message: "Login Succeed" });
        }
        // if (err) {
        //     res.send({ statusCode: 400, message: "There was a problem adding the information to the database." });
        // }
        // else {
        //     res.send(result)
        //     // res.json(doc);
        // }
    })
    // if (output == Email) {
    //     res.send(output)
    // } else {
    //     res.send(output)

    // }
    // userModel.findOne({ Username: Email, Password: Password }, function (err, result) {

    //     if (err) {
    //         response.send({ statusCode: 400, message: "There was a problem adding the information to the database." });
    //     }
    //     else {
    //         res.send(result)
    //         // res.json(doc);
    //     }
    // })

});


module.exports = app;