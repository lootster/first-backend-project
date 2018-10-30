const express = require("express");
const router = express.Router();
const Trainee = require("../models/trainee");

router.post("/", async(req, res, next) => {
  try{
    const newTrainee = new Trainee({
      name: req.body.name
    })
    
    await newTrainee.save();

    res.status(201).json({
      message: `${req.body.name} was successfully created`
    })
  } catch (error) {
    next(error);
  }
})

router.get("/", async (req, res,next) => {
  try {
    const result = await Trainee.find();
    res.status(200).json(result); 
  } catch (error) {
    next(error);
  }
})


module.exports = router;