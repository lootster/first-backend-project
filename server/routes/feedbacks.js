const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

router.post("/", async (req, res, next) => {
  try {
    const newFeedback = new Feedback({
      session: req.body.session,
      feedbackPositive: req.body.feedbackPositive,
      feedbackNegative: req.body.feedbackNegative,
      trainee: req.body.trainee
    });
    await newFeedback.save();
    res.status(201).json({
      message: `Created new feedback for session, ${req.body.session}`
    });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res,next) => {
  try {
    const result = await Feedback.find().populate("trainee");
    res.status(200).json(result); 
  } catch (error) {
    next(error);
  }
})

module.exports = router;
