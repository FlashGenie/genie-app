const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const cardSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = {
        model: mongoose.model('Card', cardSchema),
        cardSchema: cardSchema
}

// mongoose.model('Card', cardSchema);
// module.exports = cardSchema