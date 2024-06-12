const express = require('express');
const router = express.Router();
const {requireUser} = require('../../config/passport')
const validateDeckInput = require('../../validations/decks');
const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');
const Card = mongoose.model('Card');
const User = mongoose.model('User');


router.post('/new', requireUser, validateDeckInput, async (req, res, next) => {
    try {
        const newDeck = new Deck ({
            name: req.body.name,
            category: req.body.category,
            author: req.user._id,
            cards: []
        })

        const cardsArray = Object.values(req.body.cards)

            const savedCards = await Promise.all(cardsArray.map(async(card)=>{
            const newCard = new Card({
                title: card.title,
                body: card.body,
                category: req.body.category,
                author: req.user._id
            })

            return await newCard.save()
            // console.log(card)
        }))

        newDeck.cards.push(...savedCards)

        let deck = await newDeck.save()

        return res.json(deck)
    }
    catch(err) {
        next(err)
    }

})

router.patch('/:id', async (req, res, next) => {
  try {

      const deckDetails = {
          name: req.body.name,
          category: req.body.category,
          cards: req.body.cards
      }

      const deck = await Deck.findByIdAndUpdate(req.params.id, deckDetails, {new:true})
      res.json(deck)
  }
  catch(err) {
      next(err)
  }
})


router.delete('/:id', async(req, res, next)=>{
    try{
        const deck = await Deck.findByIdAndDelete(req.params.id)
        res.json('deck:deleted')
    } 
    catch(err){
        const error = new Error('Deck not found');
        error.statusCode = 404;
        error.errors = { message: "No deck found with that id" };
        return next(error);
      }
   
})

router.get('/', async (req, res) => {
    try {
      const decks = await Deck.find()
                                .populate("author", "_id username")
                                .sort({ createdAt: -1 });
      return res.json(decks);
    }
    catch(err) {
      return res.json([]);
    }
})

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const decks = await Deck.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id username");
    return res.json(decks);
  }
  catch(err) {
    return res.json([]);
  }
})


  router.get('/:id', async (req, res, next) => {
    try {
      const deck = await Deck.findById(req.params.id)
                               .populate("author", "_id username");
      return res.json(deck);
    }
    catch(err) {
      const error = new Error('Deck not found');
      error.statusCode = 404;
      error.errors = { message: "No Deck found with that id" };
      return next(error);
    }
  })



module.exports = router;