const express = require('express');
const router = express.Router();
const validateCardInput = require('../../validations/cards');
const mongoose = require('mongoose');
// const Deck = require('../../models/Deck');
const Card = mongoose.model('Card');
const Deck = mongoose.model('Deck');


router.post('/new', validateCardInput, async (req, res, next) => {

    try {
        const newCard = new Card ({
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            author: req.body.user_id
        })

        let card = await newCard.save()
        // card = await newCard.populate()
        return res.json(card)
    }
    catch(err) {
        next(err)
    }

})


router.get('/:id', async (req, res, next) => {

    try {
        const card = await Card.findById(req.params.id)
        res.json(card)
    }
    catch(err) {
        next(err)
    }

})

router.patch('/:id', async (req, res, next) => {
    try {

        const cardDetails = {
            title: req.body.title,
            body: req.body.body,
            category: req.body.category
        }

        const card = await Card.findByIdAndUpdate(req.params.id, cardDetails, {new:true})
        res.json(card)
    }
    catch(err) {
        next(err)
    }
})

router.delete('/:id', async(req, res, next)=>{
    try{
      
        // db.decks.updateMany({ "cards.id": req.params.id },
        // { $pull: { "cards": { "id": req.params.id } } })

        const card = await Card.findByIdAndDelete(req.params.id)
        await Deck.updateMany({"cards._id":req.params.id},
        { $pull: { "cards": { "_id": req.params.id } } }
        )
       
        res.json('card:deleted')
        console.log(card)
    } 
    catch(err){
        const error = new Error('Card not found');
        error.statusCode = 404;
        error.errors = { message: "No card found with that id" };
        return next(error);
      }
   
})




module.exports = router;