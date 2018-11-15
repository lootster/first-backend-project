const express = require('express');
const feedbacks = require('./routes/feedbacks')
const users = require('./routes/users')
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const isMongooseConnectionProvided = process.env.NODE_ENV === "integration";

if (!isMongooseConnectionProvided) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
  mongoose.set('useCreateIndex', true);

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Database is connected");
  });

  db.on("error", error => {
    console.error("An error has occur", error);
  });

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

//To resolve React-Router client side routing. Put all API calls above this route!
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});


module.exports = app;