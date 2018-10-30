const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const feedbackSchema = Schema({
  session: {
    type: String,
    unique: true
  },
  feedbackPositive: {
    type: String
  },
  feedbackNegative: {
    type: String
  },
  trainee: {
    type: Schema.Types.ObjectId,
    ref: "Trainee"
  }
});

feedbackSchema.plugin(uniqueValidator);
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
