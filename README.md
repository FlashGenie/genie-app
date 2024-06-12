<p align="center">
    <img width="900" src="https://github.com/FlashGenie/genie-app/blob/main/banner.png" alt="Genie logo">
</p>

# Genie
[Live Site!](https://genie-7kp5.onrender.com/)
## Background and overview
**Genie** is a study aid app that leverages AI to generate flashcards from user-uploaded notes. Users can create flashcard decks using AI, customize them to their liking, and search through existing decks created by other users.

We will need to:
- Figure out how craft fetch requests to OpenAI api in order to generate desired flashcards response
- Build a database to store user and flashcard data
- Construct a Web application for visualization of and interaction with the flashcard data

## Functionality and MVP
- User Authentication: Secure sign-up and login
- User generated flashcards: Create, read, update, and delete flashcards
- AI generated flashcards (CRUD): Generate flashcards from user-uploaded notes using OpenAI API
- Explore page/Community Sharing: Users can browse and access decks created by others
- Search: Implement search capabilities to find flashcards and decks created by other users
- Favorites: Allow users to save their favorite flashcards for easy access
- Production README

### Bonus Features
- Quiz
- Trending/Rating

## UI/UX
The goal is to make a sleek and intuitive interface for users to quickly engage with. Pages will be self-explanatory with a minimal feel to avoid overwhelming users.

## WireFrames
Landing Page
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

## Group Members and Work Breakdown
**Charlie, Rafa, Jaspreet, Dharani, Edison**

### Day 1 (June 10th)
- Build skeleton react site, landing page, login/signup modal - **Jaspreet, Dharani, Edison**
- Backend skeleton, User auth, Flashcard model/migration - **Charlie, Rafa**
- Openai api testing - **Edison**

### Day 2 (June 11th)
- Navbar, dashboard for flashcard decks (index page), CRUD components for flashcards - **Jaspreet, Dharani**
- CRUD Flashcard controller/routes, include boolean value for show (allow other users to see), seed file - **Charlie, Rafa, Edison**

### Day 3 (June 12th)
- Search bar, action/reducers for making flashcard api request, studying flashcard page - **Jaspreet, Dharani, Edison**
- search functionaility, import pdf from frontend, pass it into openai api and return json object - **Charlie, Rafa**

### Day 4 (June 13th) 
- Upload pdf section for ai generated flashcards, explore page for all users flashcard decks (initial seed data) - **Jaspreet, Dharani**
- Add favorites to database schema, add algo for a smart studying feature (bonus) - **Charlie, Rafa**

### Day 5 (June 14th)
- Polish, host, debug, dont crash the site - **Everyone**
- TBD
