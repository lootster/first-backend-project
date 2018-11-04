const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect("mongodb://localhost/first-backend-project", {
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

app.listen(3001, () => {
  console.log("Listening on port 3001 ...")
});