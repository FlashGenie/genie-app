const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');
require('dotenv').config();
const {requireUser} = require('../../config/passport');
const validateDeckInput = require('../../validations/decks');
const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');
const Card = mongoose.model('Card');

const MAX_SIZE = 50 * 1024 * 1024;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

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

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: `Generate flashcards from the following notes and format the output as a JSON object with 'term' as the key and 'definition' as the value: ${parsedText}` }]
        });

        const flashcardText = completion.choices[0].message.content;
        const flashcardObject = JSON.parse(flashcardText.replace(/```json/, '').replace(/```/, '').trim());

        const newDeck = new Deck ({
            name: req.body.name,
            category: req.body.category,
            author: req.user._id,
            cards: []
        })

        const cardsArray = Object.values(flashcardObject)

        const savedCards = await Promise.all(cardsArray.map(async (card) => {
            const newCard = new Card({
                title: card.term,
                body: card.definition,
                category: req.body.category,
                author: req.user._id
            });

            return await newCard.save()
        }));

        newDeck.cards.push(...savedCards)

        let deck = await newDeck.save()

        console.log(deck)
        return res.json(deck)

    } catch (error) {
        next(error)
    }
});


module.exports = router;

