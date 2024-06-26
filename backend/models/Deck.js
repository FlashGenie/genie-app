const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {cardSchema} = require('./Card')

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
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    favoriteCount: {
        type: Number,
        default: 0
    },
    genieCreated: {
        type: Boolean
    },
    authorName: {
        type: String,
      
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Deck', deckSchema);