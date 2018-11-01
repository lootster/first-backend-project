const mongoose = require('mongoose');
const express = require('express');
const Feedback = require('./models/feedback');
const feedbacks = require('./routes/feedbacks')
const User = require('./models/user');
const users = require('./routes/users')
const app = express();
app.use(express.json());

app.use("/feedbacks", feedbacks);
app.use("/users", users);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the blog-post api"
  })
})



module.exports = app;