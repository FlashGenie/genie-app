require('dotenv').config();
const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const cardModule = require('../models/Card')
const Card = cardModule.model
const Deck = require('../models/Deck')

// Create one user
const users = [];

const newUser = new User({
  username: 'demo-user',
  email: 'demo-user@appacademy.io',
  hashedPassword: bcrypt.hashSync('starwars', 10)
})

users.push(newUser);


const scienceUser = new User({
  username: 'science-guy',
  email: 'bill-nye@appacademy.io',
  hashedPassword: bcrypt.hashSync('password', 10)
})

users.push(scienceUser);


const languageUser = new User({
  username: 'world-traveller',
  email: 'traveller@appacademy.io',
  hashedPassword: bcrypt.hashSync('password', 10)
})

users.push(languageUser);

const decks = [];

const newDeck1 = new Deck({
  name: 'Micro Topics 1',
  category: 'Economics',
  cards: [],
  author: newUser.id
})

const newDeck2 = new Deck({
  name: 'Macro Topics 1',
  category: 'Economics',
  cards: [],
  author: newUser.id
})

const newDeck3 = new Deck({
  name: 'Physics',
  category: 'Science',
  cards: [],
  author: newUser.id
})

const cards = [];
const card1 = new Card({
  title: 'Demand',
  body: 'Quantity purchased in a market at different prices',
  author: newUser.id,
  category: 'Economics'
})

newDeck1.cards.push(card1);
cards.push(card1);

const card2 = new Card({
  title: 'PED',
  body: 'Percentage change in quantity demanded over percentage change in prices.',
  author: newUser.id,
  category: 'Economics'
})

newDeck1.cards.push(card2);
cards.push(card2);

const card3 = new Card({
  title: 'PPF',
  body: 'Production possibilities frontier - shows all combinations of two goods an economy is capable of producing, given scarce available resources.',
  author: newUser.id,
  category: 'Economics'
})

newDeck1.cards.push(card3)
cards.push(card3);

const card4 = new Card({
  title: 'MPC',
  body: 'Marginal propensity to consume - percentage change in quantity consumed over percentage change in income',
  author: newUser.id,
  category: 'Economics'
})

newDeck1.cards.push(card4);
cards.push(card4);

const card5 = new Card({
  title: 'Inflation',
  body: 'The sustained increase in price levels',
  author: newUser.id,
  category: 'Economics'
})

newDeck2.cards.push(card5);
cards.push(card5);

const card6 = new Card({
  title: 'CPI',
  body: 'Consumer Price Index - tracks a basket of goods and reflects a percentage change in a weighted average of the cost of goods in the basket',
  author: newUser.id,
  category: 'Economics'
})

newDeck2.cards.push(card6);
cards.push(card6);

const card7 = new Card({
  title: 'Aggregate Demand',
  body: 'Total output demanded in an economy at different price levels.  C + I + G + (Ex - Im)',
  author: newUser.id,
  category: 'Economics'
})

newDeck2.cards.push(card7);
cards.push(card7);

const card8 = new Card({
  title: 'Investment',
  body: 'Part of Aggregate Demand. Includes purchase of physical capital by business, purchase of new homes by households, and changes to inventory',
  author: newUser.id,
  category: 'Economics'
})

newDeck2.cards.push(card8);
cards.push(card8);

const card9 = new Card({
  title: 'Acceleration',
  body: 'The rate at which velocity changes',
  author: newUser.id,
  category: 'Science'
})

newDeck3.cards.push(card9);
cards.push(card9);

const card10 = new Card({
  title: 'Archimedes Principle',
  body: 'The rule that the buoyant force on an object is equal to the wieght of the fluid the object displaces',
  author: newUser.id,
  category: 'Science'
})

newDeck3.cards.push(card10);
cards.push(card10);

const card11 = new Card({
  title: 'Chemical Energy',
  body: 'The potential energy stored in chemical bonds',
  author: newUser.id,
  category: 'Science'
})

newDeck3.cards.push(card11);
cards.push(card11);

const card12 = new Card({
  title: 'Joule',
  body: 'Unit used to measuer electrical energy',
  author: newUser.id,
  category: 'Science'
})

newDeck3.cards.push(card12);
cards.push(card12);


decks.push(newDeck1);
decks.push(newDeck2);
decks.push(newDeck3);

const newDeck4 = new Deck({
  name: 'Biology',
  category: 'Science',
  cards: [],
  author: scienceUser.id
})

const newDeck5 = new Deck({
  name: 'Chemistry',
  category: 'Science',
  cards: [],
  author: scienceUser.id
})

const newDeck6 = new Deck({
  name: 'Astrophysics',
  category: 'Science',
  cards: [],
  author: scienceUser.id
})

const card13 = new Card({
  title: 'Hymenoptera',
  body: 'An orer of insects including: beex',
  author: scienceUser.id,
  category: 'Science'
})

newDeck4.cards.push(card13);
cards.push(card13);

const card14 = new Card({
  title: 'Prokaryotic Cell',
  body: 'Primitve, lack membrane-bound internal organelles',
  author: scienceUser.id,
  category: 'Science'
})

newDeck4.cards.push(card14);
cards.push(card14);

const card15 = new Card({
  title: 'Autotrophic Nutrition',
  body: 'Source of carbon is simple, such as carbon dioxide',
  author: scienceUser.id,
  category: 'Science'
})

newDeck4.cards.push(card15);
cards.push(card15);

const card16 = new Card({
  title: 'Isotopes',
  body: 'Elements that have the same number of protons and behave the same in chemical reactions, but they have a different number of neutrons',
  author: scienceUser.id,
  category: 'Science'
})

newDeck4.cards.push(card16);
cards.push(card16);


const card17 = new Card({
  title: 'Specific Gravity',
  body: 'The ratio of the density of a given liquid to the density of water at 4 degrees celcius',
  author: scienceUser.id,
  category: 'Science'
})

newDeck5.cards.push(card17);
cards.push(card17);

const card18 = new Card({
  title: 'Elements',
  body: 'Substances that cannot be broken down into simpler substances by chemical reactions.',
  author: scienceUser.id,
  category: 'Science'
})

newDeck5.cards.push(card18);
cards.push(card18);

const card19 = new Card({
  title: 'Distillation',
  body: 'The method for separating the components of a liquid mixture that depends on differences in the ease of vaporization of the components',
  author: scienceUser.id,
  category: 'Science'
})

newDeck5.cards.push(card19);
cards.push(card19);

const card20 = new Card({
  title: 'Anion',
  body: 'Ions that have a negative charge.  Form when an atom gains electrons.',
  author: scienceUser.id,
  category: 'Science'
})

newDeck5.cards.push(card20);
cards.push(card20);


const card21 = new Card({
  title: 'Galactic Bulge',
  body: 'The spheroidal distribution of stars toward the center of the Milky Way that are intermediate in age between the disk stars and halo stars.',
  author: scienceUser.id,
  category: 'Science'
})

newDeck6.cards.push(card21);
cards.push(card21);


const card22 = new Card({
  title: 'Isotropic',
  body: 'The same in all directions',
  author: scienceUser.id,
  category: 'Science'
})

newDeck6.cards.push(card22);
cards.push(card22);

const card23 = new Card({
  title: 'Mass-luminosity relation',
  body: 'The mathematical relationship between the mass of main-sequence stars and their total emission. More massive stars have far higher values of luminosity.',
  author: scienceUser.id,
  category: 'Science'
})

newDeck6.cards.push(card23);
cards.push(card23);

const card24 = new Card({
  title: 'Oort cloud',
  body: 'The swarm of comets surrounding the solar system.',
  author: scienceUser.id,
  category: 'Science'
})

newDeck6.cards.push(card24);
cards.push(card24);

decks.push(newDeck4);
decks.push(newDeck5);
decks.push(newDeck6);

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Reset and seed db
const insertSeeds = () => {
  console.log("Resetting db and seeding users...");

  User.collection.drop()
    .then(()=>Card.collection.drop())
    .then(()=>Deck.collection.drop())
    .then(() => User.insertMany(users))
    .then(()=>Card.insertMany(cards))
    .then(()=>Deck.insertMany(decks))
    .then(() => {
      console.log("Done!");
      mongoose.disconnect();
    })
    .catch(err => {
      console.error(err.stack);
      process.exit(1);
    });
};
