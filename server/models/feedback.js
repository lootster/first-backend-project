const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const feedbackSchema = Schema({
  session: {
    type: String,
  },
  feedbackPositive: {
    type: String
  },
  feedbackNegative: {
    type: String
  },
  userName: {
    type: String
  }
});

feedbackSchema.plugin(uniqueValidator);
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
