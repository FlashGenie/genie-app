const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateFavoriteInput = [
    check('deckId')
        .exists({checkFalsy:true}),

    handleValidationErrors
];

module.exports = validateFavoriteInput;