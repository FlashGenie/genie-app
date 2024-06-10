const fs = require('fs');
const pdf = require('pdf-parse');
const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize the OpenAI client with your API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

async function parsePdf() {
  try {
    // Read the PDF file into a buffer
    let dataBuffer = fs.readFileSync('./uploads/Tissues.pdf');

    // Parse the PDF file
    let data = await pdf(dataBuffer);

    // Replace newlines with spaces and return the parsed text
    let parsedText = data.text.replace(/\n/g, ' ');
    return parsedText;
  } catch (error) {
    console.error('Error parsing PDF:', error);
  }
}

async function generateFlashCards(parsedText) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: `Generate flashcards from the following notes and format the output as a JSON object with 'term' as the key and 'definition' as the value: ${parsedText}` }]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error creating completion:', error);
  }
}

// Main function to parse PDF and generate completion
async function main() {
  const parsedText = await parsePdf();
  if (parsedText) {
    const jsonCards = await generateFlashCards(parsedText);
    const flashcardObject = JSON.parse(jsonCards.replace(/```json/, '').replace(/```/, '').trim());
    console.log(flashcardObject);
  }
}

// Call the main function
main();