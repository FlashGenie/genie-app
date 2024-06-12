const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { requireUser } = require('../../config/passport');


const MAX_SIZE = 50 * 1024 * 1024; // Max file size 52 MB

const storage = multer.memoryStorage(); // Store file in memory as a buffer instead of on disk (better for quick processing)
const upload = multer({ 
    storage: storage,
    limits: { fileSize: MAX_SIZE }
});

router.post('/', requireUser, upload.single('pdfFile'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No files were uploaded.' });
        }

        const pdfBuffer = req.file.buffer;
        const pdfText = await pdfParse(pdfBuffer);
        const parsedText = pdfText.text.replace(/\n/g, ' ');

        return res.json({ text: parsedText })
    } catch (err) {
        next(err);
    }
});

module.exports = router;

