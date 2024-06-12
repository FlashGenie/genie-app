const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateFavoriteInput = [
    check('owner')
        .exists({checkFalsy:true}),
    check('deck')
        .exists({checkFalsy:true}),

    handleValidationErrors
];

module.exports = validateFavoriteInput;