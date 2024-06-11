const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const MAX_SIZE = 50 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../user-uploads/')); 

    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: MAX_SIZE }
 });

router.post('/', upload.single('pdfFile'), (req, res) => {
    if (req.file) {
        res.json({
            message: 'File uploaded successfully!',
            file: req.file
        });
    } else {
        res.status(400).json({
            message: 'No file uploaded.'
        });
    }
});


module.exports = router;

