const multer = require('multer');
const path = require('path');

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now(); // Get current timestamp( the milliseconds count since the Unix epoch (January 1, 1970, 00:00:00 UTC))
        const fileExtension = path.extname(file.originalname); // Get file extension
        const fileName = `${timestamp}_${file.originalname}`; // Concatenate timestamp and original file name
        cb(null, fileName); // Use the customized file name
    }
});

// Set up multer middleware to handle file uploads
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

module.exports = upload;
