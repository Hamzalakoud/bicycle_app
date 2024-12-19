const express = require('express');
const bikerouter = express.Router();
const { addBicycleSpot, getBikesForSpot, upload } = require('../controllers/bicycleController');

// Route to add a new bicycle spot along with bikes (with image upload)
bikerouter.post('/bikes', upload.single('image'), addBicycleSpot); // Use `upload.single('image')` to handle the image

// Route to get bikes for a specific spot
bikerouter.get('/bike-spots/:id/bikes', getBikesForSpot);

module.exports = bikerouter;
