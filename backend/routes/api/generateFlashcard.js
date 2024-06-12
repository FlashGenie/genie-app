const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
require('dotenv').config(); // Load environment variables from .env file
const { requireUser } = require('../../config/passport');

// Initialize OpenAI instance with API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Define POST route for generating flashcards
router.post('/', requireUser, async (req, res, next) => {
    try {
        // Parse input text from request body
        const parsedText = req.body.parsedText.text;

        // Request completion from OpenAI's GPT-4o model
        const completion = await openai.chat.completions.create({
            model: "gpt-4o", // Specify model to use
            messages: [{ 
                role: "user", 
                content: `Generate flashcards from the following notes. Format the output as a JSON object where each flashcard has a 'title' key for the term and a 'body' key for the definition: ${parsedText}`
            }]
        });

        // Log the generated completion message for debugging
        console.log(completion.choices[0].message);

        // Extract text content from the completion and parse it as JSON
        const flashcardText = completion.choices[0].message.content;
        const flashcardObject = JSON.parse(flashcardText.replace(/```json/, '').replace(/```/, '').trim());

        // Respond with the parsed flashcard object as JSON
        return res.json({ flashcardObject });
    } catch (error) {
        // Pass any errors to the next middleware (error handler)
        next(error);
    }
});

module.exports = router;