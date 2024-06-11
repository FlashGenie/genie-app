const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');
require('dotenv').config();

const MAX_SIZE = 50 * 1024 * 1024;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../../user-uploads/')); 

//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

const storage = multer.memoryStorage(); // Store file in memory as a buffer instead of on disk (better for quick processing)

const upload = multer({ 
    storage: storage,
    limits: { fileSize: MAX_SIZE }
 });

router.post('/', upload.single('pdfFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const pdfBuffer = req.file.buffer;
        const pdfText = await pdfParse(pdfBuffer);
        const parsedText = pdfText.text.replace(/\n/g, ' ');
        
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: `Generate flashcards from the following notes and format the output as a JSON object with 'term' as the key and 'definition' as the value: ${parsedText}` }]
        });

        const flashcardText = completion.choices[0].message.content;

        const flashcardObject = JSON.parse(flashcardText.replace(/```json/, '').replace(/```/, '').trim());

        res.json({
            message: 'File uploaded successfully!',
            flashcard: flashcardObject,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
});


module.exports = router;