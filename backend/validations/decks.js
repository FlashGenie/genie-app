const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateDeckInput = [
    check('name')
        .exists({checkFalsy:true})
        .isLength({min: 1, max: 40})
        .withMessage('Deck must have a name'),

    check('category')
        .exists({checkFalsy:true})
        .withMessage('Category is required'),

    handleValidationErrors
];

module.exports = validateDeckInput;