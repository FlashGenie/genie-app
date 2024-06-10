const express = require('express');
const router = express.Router();
const {requireUser} = require('../../config/passport')
const validateDeckInput = require('../../validations/decks');
const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');
const Card = mongoose.model('Card');


router.post('/new', requireUser, validateDeckInput, async (req, res, next) => {
    debugger;
    try {
        const newDeck = new Deck ({
            name: req.body.name,
            category: req.body.category,
            author: req.user._id,
            cards: []
        })

        debugger;
        const cardsArray = Object.values(req.body.cards)
        debugger;
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


router.get('/', async (req, res, next) => {

    try {

    }
    catch(err) {
        next(err)
    }

})



module.exports = router;