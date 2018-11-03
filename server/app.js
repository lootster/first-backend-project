const express = require('express');
const feedbacks = require('./routes/feedbacks')
const users = require('./routes/users')
const app = express();
const mongoose = require("mongoose");

const isMongooseConnectionProvided = process.env.NODE_ENV === "integration";

if (!isMongooseConnectionProvided) {
  mongoose.connect(process.env.MONGODB_URL);
}

app.use(express.json());

app.use("/feedbacks", feedbacks);
app.use("/users", users);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the blog-post api"
  })
})


module.exports = app;