const express = require('express');
const router = express.Router();
const validateCardInput = require('../../validations/cards');
const mongoose = require('mongoose');
const Card = mongoose.model('Card');


router.post('/new', validateCardInput, async (req, res, next) => {

    try {
        const newCard = new Card ({
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            author: req.user._id
        })

        let card = await newCard.save()
        // card = await newCard.populate()
        return res.json(card)
    }
    catch(err) {
        next(err)
    }

})

module.exports = router;