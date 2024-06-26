const express = require('express');
const router = express.Router();
const {requireUser} = require('../../config/passport')
const mongoose = require('mongoose');
const Favorite = mongoose.model('Favorite');
const Deck = mongoose.model('Deck');
const User = mongoose.model('User');
const validateFavoriteInput = require('../../validations/favorites');


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
      const favorites = await Favorite.find({ owner: user._id })
                                .sort({ createdAt: -1 })
                                .populate();

      return res.json(favorites);
    }
    catch(err) {
      return res.json([]);
    }
})

router.post('/new', validateFavoriteInput, requireUser,  async (req, res, next) => {
    try {
        const newFavorite = new Favorite ({
            owner: req.user._id,
            deck: req.body.deckId
        })

        let favorite = await newFavorite.save()

        const deck = Deck.findById(req.body.deckId)
        return res.json(deck)

    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const favorite = await Favorite.findByIdAndDelete({_id: req.params.id})
        res.json('favorite: deleted')
    }
    catch(err){
        const error = new Error('Favorite not found');
        error.statusCode = 404;
        error.errors = { message: "No favorite found with that id" };
        return next(error);
    }
})

module.exports = router;