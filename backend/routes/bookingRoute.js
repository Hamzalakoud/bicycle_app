const express = require('express');
const bicycleController = require('../controllers/bicycleController');

const bikerouter = express.Router();

// Route to add a new bicycle spot along with bikes (with image upload)
bikerouter.post('/bikes', bicycleController.upload.single('image'), bicycleController.addBicycleSpot); // Use `upload.single('image')` to handle the image

// Route to get bikes for a specific spot
bikerouter.get('/bike-spots/:id/bikes', bicycleController.getBikesForSpot);

module.exports = bikerouter;
