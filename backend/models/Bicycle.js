const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  name: String,
  type: String,
  available: Number, // Number of bikes available
  price: String,
  image: { type: String, default: null }
});

const spotSchema = new mongoose.Schema({

  name: { type: String, required: true },
  bikes: [bikeSchema], // Array of bikes for this spot
});

const Bicycle = mongoose.model('Bicycle', spotSchema);

module.exports = Bicycle;
