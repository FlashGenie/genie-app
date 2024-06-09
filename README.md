# genie-app

## Background and overview
Genie is a study aid app that uses AI to generate flashcards from user uploaded notes. Users can generate flashcards decks using AI and customize it to their liking as well as search existing decks created by other users. 

We will need to:
- Figure out how craft fetchs to OpenAI api in order to generate desired flashcards response
- Build a database to store user and flashcard data
- Construct a Web application for visualization of and interaction with the flashcard data

## Functionality and MVP
- User AUTH
- User generated flashcards (CRUD)
- AI generated flashcards (CRUD)
- Search
- Favorites (saved)
- Production README

### Bonus Features
- Quiz
- Marketplace/trending/recents

## WireFrames

## Technologies and Technical Challenges
Database: MongoDB
Backend: OpenAi API, Express.js
Frontend: React/Redux/Node.js


## Group Members and Work Breakdown

### Day 1 (June 10th)
- Build skeleton react site, landing page, login/signup modal - **Jaspreet, Dharani**
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
- add favorites to database schema

### Day 5 (June 14th)
