<p align="center">
    <img width="900" src="https://github.com/FlashGenie/genie-app/blob/main/banner.png" alt="Genie logo">
</p>

# Genie: The Best AI-Powered Flashcard Generator
[Live Site!](https://genie-7kp5.onrender.com/)
## Background and overview
**Genie** is a study aid app that leverages AI to generate flashcards from user-uploaded notes. Users can create flashcard decks using AI, customize them to their liking, and search through existing decks created by other users.

## Functionality and MVP
- User Authentication: Secure sign-up and login
- User generated flashcards: Create, read, update, and delete flashcards
- AI generated flashcards (CRUD): Generate flashcards from user-uploaded notes using OpenAI API
- Explore page/Community Sharing: Users can browse and access decks created by others
- Search: Implement search capabilities to find flashcards and decks created by other users
- Favorites: Allow users to save their favorite flashcards for easy access
- Production README

## UI/UX
The goal is to make a sleek and intuitive interface for users to quickly engage with. Pages will be self-explanatory with a minimal feel to avoid overwhelming users.

## WireFrames
![Landing Page](https://github.com/FlashGenie/genie-app/blob/main/landing-page.png)

### Architecture
Genie is built with the MERN stack (MongoDB, Express, React, and Node)
![Architecture](https://github.com/FlashGenie/genie-app/blob/main/architecture.png)

## Technologies and Technical Challenges

### Database: MongoDB and Mongoose
MongoDB, a NoSQL database, will be used for its flexibility and scalability. Mongoose will be employed to define schemas and models, enabling efficient data validation and manipulation.

### Backend: Node.js, Express.js, and OpenAI
The backend's primary role is to handle user authentication, store flashcard data, and integrate with the OpenAI API to generate flashcards.

### Frontend: React, Redux, and TailwindCSS
React and Redux will handle the application state, ensuring a responsive and dynamic user experience. TailwindCSS will be utilized for styling, allowing for rapid and consistent UI development.

## Features

### User authentication
Securely log in to Genie to access your personalized dashboard. Ensure your data is protected with robust authentication methods.

![](./gifs/user-authentication.gif)

### User generated flash cards
Create custom flashcards manually to suit your study needs. Easily add questions and answers, and organize your cards into decks.

![](./gifs/user-generated-deck.gif)

Users can manually create flashcards and add them to their decks. Below is an example of how the backend handles the creation of a new deck along with user-generated flashcards.


```javascript
router.post('/new', requireUser, validateDeckInput, async (req, res, next) => {
    try {
        const newDeck = new Deck({
            name: req.body.name,
            category: req.body.category,
            author: req.user._id,
            cards: [],
            favoriteCount: 0,
            genieCreated: req.body.genieCreated
        });

        const cardsArray = Object.values(req.body.cards);

        const savedCards = await Promise.all(cardsArray.map(async (card) => {
            const newCard = new Card({
                title: card.title,
                body: card.body,
                category: req.body.category,
                author: req.user._id
            });

            return await newCard.save();
        }));

        newDeck.cards.push(...savedCards);

        let deck = await newDeck.save();

        return res.json(deck);
    } catch (err) {
        next(err);
    }
});
```

### Genie generated flash cards using openAI
Upload a PDF and let Genie automatically generate flashcards for you. Powered by the OpenAI API, Genie extracts key concepts and questions to help you study efficiently.

![](./gifs/genie-generated-deck.gif)

To generate flashcards automatically, Genie parses the uploaded PDF file and extracts text. This text is then processed by OpenAI's API to create flashcards. Below is a code snippet showing the core functionality

```javascript
const storage = multer.memoryStorage(); // Store file in memory for quick processing
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

        return res.json({ text: parsedText });
    } catch (err) {
        next(err);
    }
});
```

```javascript
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
        // console.log(completion.choices[0].message);

        // Extract text content from the completion and parse it as JSON
        const flashcardText = completion.choices[0].message.content;
        const flashcardObject = JSON.parse(flashcardText.replace(/```json/, '').replace(/```/, '').trim());

        console.log(flashcardObject);
        
        // Respond with the parsed flashcard object as JSON
        return res.json({ flashcardObject });
    } catch (error) {
        // Pass any errors to the next middleware (error handler)
        next(error);
    }
});
```

### Review Decks
Organize and review your flashcards in decks. 

![](./gifs/review-deck.gif)


## Future Implementatioms
- Quiz
- Trending/Rating

## Group Members and Work Breakdown
**Charlie, Rafael, Jaspreet, Dharani, Edison**

### Day 1 (June 10th)
- Build skeleton react site, landing page, login/signup modal - **Jaspreet, Dharani, Edison**
- Backend skeleton, User auth, Flashcard model/migration - **Charlie, Rafael**
- Openai api testing - **Edison, Dharani**

### Day 2 (June 11th)
- Navbar, dashboard for flashcard decks (index page), CRUD components for flashcards - **Jaspreet**
- CRUD Flashcard controller/routes, include boolean value for show (allow other users to see), seed file - **Charlie, Rafael**
- Upload PDF, parse it and send it to openAI API - **Edison, Dharani**


### Day 3 (June 12th)
- action/reducers for making flashcard api request, studying flashcard page - **Jaspreet, Edison**
- search functionaility - **Charlie, Rafa**
- Front end for PDF upload feature and generate flash cards modal - **Dharani**

### Day 4 (June 13th)
- Explore page for all users flashcard decks (initial seed data) - **Charlie**
- Add favorites to database schema - **Rafael**
- Fix bugs, Production Readme - **Dharani**
- Review decks feature - **Edison, Jaspreet**

### Day 5 (June 14th)
- Polish, host, debug, dont crash the site - **Everyone**
- TBD

## Group Members

- [Edison Li](https://www.linkedin.com/in/edison-l-832242167/)
- [Charles Racine](https://www.linkedin.com/in/charlee-racine-50241a7b/)
- [Jaspreet Singh]()
- [Rafael Campos](https://www.linkedin.com/in/rafael-campos-60471a2b2/)
- [Dharani Yedavelly](https://www.linkedin.com/in/dharaniy/)

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=60&section=footer"/>
</p>
