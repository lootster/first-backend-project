const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const feedbackSchema = Schema({
  userName: {
    type: String
  },
  session: {
    type: String,
  },
  feedbackPositive: {
    type: String
  },
  feedbackNegative: {
    type: String
  }
});

feedbackSchema.plugin(uniqueValidator);
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
