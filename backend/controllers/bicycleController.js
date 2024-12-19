const Bicycle = require('../models/Bicycle');
const multer = require('multer');
const path = require('path');

// Setup multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Save to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set unique filename for each image
  },
});

// Initialize the multer upload middleware
const upload = multer({ storage: storage });

// Add a new bicycle spot along with bikes
const addBicycleSpot = async (req, res) => {
  const { name, bikes } = req.body; // Get the spot name and bikes from the request body
  const image = req.file ? '/uploads/' + req.file.filename : null; // Get the image path

  try {
    if (!name || !bikes || !Array.isArray(bikes)) {
      return res.status(400).json({ error: 'Name and bikes array are required.' });
    }

    const newSpot = new Bicycle({
      name,
      bikes, // The array of bikes for this spot
      image, // Save the image path in the database
    });

    await newSpot.save(); // Save the new spot to the database
    res.status(201).json(newSpot); // Send the created spot as a response
  } catch (err) {
    console.error("Error adding bike spot:", err); // Log the error to the console
    res.status(500).json({ error: 'Failed to add bike spot.', details: err.message });
  }
};

// Get bikes for a specific spot by ID
const getBikesForSpot = async (req, res) => {
  const spotId = req.params.id; // Get spot ID from URL parameter

  try {
    const spot = await Bicycle.findById(spotId); // Find the spot by ID
    if (!spot) {
      return res.status(404).json({ error: 'Spot not found.' });
    }
    res.status(200).json(spot.bikes); // Send the bikes array of the found spot
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bikes for this spot.' });
  }
};

// Export functions and upload middleware
module.exports = {
  addBicycleSpot,
  getBikesForSpot,
  upload, // Export the upload middleware to use in the router
};
