const mongoose = require('mongoose');
const express = require('express');
const Feedback = require('./models/feedback');
const feedbacks = require('./routes/feedbacks')
// const Trainee = require('./models/trainee');
// const trainees = require('./routes/trainees')
const app = express();
app.use(express.json());

app.use("/feedbacks", feedbacks);
// app.use("/trainees", trainees);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the blog-post api"
  })
})



module.exports = app;