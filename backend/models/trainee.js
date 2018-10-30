const mongoose = require('mongoose');
const { Schema } = mongoose;

const traineeSchema = Schema ({
  name: String
});

const Trainee = mongoose.model('Trainee', traineeSchema);

module.exports = Trainee;