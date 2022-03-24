const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")
const app = express();
mongoose.connect("mongodb+srv://karthickraja:Ben123456789@cluster0.h7hwq.mongodb.net/Restarents?retryWrites=true&w=majority");
app.use(express.json());
app.use(Router);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

