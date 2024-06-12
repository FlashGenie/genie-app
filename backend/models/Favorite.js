const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
 
    },
    deck: {
        type: Schema.Types.ObjectId,
        ref: 'Deck'

    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Favorite', favoriteSchema);