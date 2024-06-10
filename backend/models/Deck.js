const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cardSchema = require('cardSchema')


const deckSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    cards: {
        type: [cardSchema]
    }
})

module.exports = mongoose.model('Deck', deckSchema);