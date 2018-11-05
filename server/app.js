const express = require('express');
const feedbacks = require('./routes/feedbacks')
const users = require('./routes/users')
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const isMongooseConnectionProvided = process.env.NODE_ENV === "integration";

if (!isMongooseConnectionProvided) {
  mongoose.connect(process.env.MONGODB_URI);
}

const staticFiles = express.static(path.join(__dirname, "../client/build"));
app.use(staticFiles);

app.use(express.json());

app.use("/feedbacks", feedbacks);
app.use("/users", users);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the blog-post api"
  })
})


module.exports = app;