const express = require('express');
const router = express.Router();
const validateDeckInput = require('../../validations/decks');
const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');
const Card = mongoose.model('Card');


router.post('/new', validateDeckInput, async (req, res, next) => {

    try {
        const newDeck = new Deck ({
            name: req.body.name,
            category: req.body.category,
            author: req.body.user_id,
            cards: []
        })

        const cardsArray = Object.values(req.body.cards)

        cardsArray.forEach( async (card) => {
            const newCard = new Card({
                title: card.title,
                body: card.body,
                category: req.body.category,
                author: req.body.user_id
            })
            let savedCard = await newCard.save();

            newDeck.cards.push(savedCard)

        })

        let deck = await newDeck.save()

        return res.json(deck)
    }
    catch(err) {
        next(err)
    }

})


router.get('/', async (req, res, next) => {

    try {

    }
    catch(err) {
        next(err)
    }

})



module.exports = router;