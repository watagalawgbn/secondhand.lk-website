const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); // Import Multer middleware

// Import controller functions
const { createAdvertisement } = require('../controllers/advertisementController');
const { sendCategories } = require('../controllers/sendCategories');
const { sendSubcategories } = require('../controllers/sendSubcategories');
const { sendLocations } = require('../controllers/sendLocations');
const { sendSublocations } = require('../controllers/sendSublocations');

///////////////////// Defining Routes ////////////////////////

// POST route for creating a new advertisement generalDetails
router.post('/generalDetails', upload.array('images[]', 6), createAdvertisement);

// Define routes to fetch categories and subcategories
router.get('/categories', sendCategories);
router.get('/subcategories', sendSubcategories);

// Define routes to fetch locations and sublocations
router.get('/locations', sendLocations);
router.get('/sublocations', sendSublocations);

module.exports = router;
